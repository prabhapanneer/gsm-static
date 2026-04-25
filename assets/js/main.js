// Contact form first — if code below throws, submit must still be intercepted (avoid full page POST).
function gsmContactApiUrl() {
  if (typeof window.GSM_CONTACT_API === 'string' && window.GSM_CONTACT_API.trim()) {
    return window.GSM_CONTACT_API.trim();
  }
  return 'http://127.0.0.1:9006/contact';
}

function showContactFlash(kind, message) {
  const el = document.getElementById('contact-form-flash');
  const section = document.getElementById('contact');
  if (!el) return;
  el.hidden = false;
  el.className = 'contact-form-flash ' + (kind === 'ok' ? 'contact-form-flash--ok' : 'contact-form-flash--err');
  el.textContent = message;
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function phoneDigitsOnly(raw) {
  return String(raw ?? '').replace(/\D/g, '');
}

/** Same as contact-server: 10-digit Indian mobile (first digit 6–9). */
function isValidContactPhone(raw) {
  const d = phoneDigitsOnly(raw);
  return d.length === 10 && /^[6-9]\d{9}$/.test(d);
}

var CONTACT_API_ERROR_MESSAGES = {
  invalid_phone: 'Enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).',
  missing_fields: 'Please fill in all required fields.',
  too_long: 'One or more fields are too long. Please shorten and try again.',
};

(function initContactPhoneDigitsOnly() {
  var el = document.getElementById('contact-phone');
  if (!el) return;
  function clampDigits(val) {
    return String(val).replace(/\D/g, '').slice(0, 10);
  }
  el.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    if (/\d/.test(e.key)) return;
    e.preventDefault();
  });
  el.addEventListener('input', function () {
    var d = clampDigits(el.value);
    if (el.value !== d) el.value = d;
  });
  el.addEventListener('paste', function (e) {
    e.preventDefault();
    var paste = (e.clipboardData || window.clipboardData).getData('text') || '';
    var start = el.selectionStart != null ? el.selectionStart : 0;
    var end = el.selectionEnd != null ? el.selectionEnd : 0;
    var merged = el.value.slice(0, start) + paste + el.value.slice(end);
    el.value = clampDigits(merged);
    try {
      el.setSelectionRange(el.value.length, el.value.length);
    } catch (err) {
      /* ignore */
    }
  });
})();

(function initContactFormFetch() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener(
    'submit',
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const btn = form.querySelector('.fsub');
      const api = gsmContactApiUrl();
      const payload = Object.fromEntries(new FormData(form).entries());

      var phoneEl = document.getElementById('contact-phone');
      if (payload.phone != null && !isValidContactPhone(payload.phone)) {
        showContactFlash('err', CONTACT_API_ERROR_MESSAGES.invalid_phone);
        phoneEl?.focus();
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
      }
      try {
        const res = await fetch(api, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        let data = {};
        try {
          data = await res.json();
        } catch {
          /* non-JSON body */
        }
        if (res.ok && data.ok !== false) {
          showContactFlash('ok', 'Thank you — we received your request and will contact you soon.');
          form.reset();
        } else {
          var code = data && data.error;
          var msg =
            (code && CONTACT_API_ERROR_MESSAGES[code]) ||
            code ||
            (res.status === 0 ? 'Network error.' : 'Something went wrong. Please call us or try again.');
          showContactFlash('err', msg);
          if (code === 'invalid_phone') phoneEl?.focus();
        }
      } catch {
        showContactFlash(
          'err',
          'Could not reach the email service. If you are testing locally, run: cd contact-server && npm run dev',
        );
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.removeAttribute('aria-busy');
        }
      }
    },
    { capture: true },
  );
})();

(function contactFormFlashFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const st = params.get('contact');
  if (!st) return;
  if (st === 'sent') {
    showContactFlash('ok', 'Thank you — we received your request and will contact you soon.');
  } else if (st === 'error') {
    showContactFlash('err', 'Something went wrong. Please call us or try again in a moment.');
  }
  const path = window.location.pathname || '';
  window.history.replaceState({}, '', path + '#contact');
})();

(function() {
  var track = document.getElementById('tstiTrack');
  var dotsEl = document.getElementById('tstiDots');
  var counter = document.getElementById('tstiCounter');
  var btnPrev = document.getElementById('tstiPrev');
  var btnNext = document.getElementById('tstiNext');
  var slides = track ? track.querySelectorAll('.tst-slide') : [];
  var TOTAL = slides.length;
  var cur = 0, spv = 2, diff = 0, dragging = false, startX = 0;

  function spvNow() {
    return track && track.parentElement.offsetWidth < 700 ? 1 : 2;
  }
  function slideW() {
    return slides[0] ? slides[0].offsetWidth + 24 : 0;
  }
  function maxCur() { return Math.max(0, TOTAL - spv); }
  function buildDots() {
    spv = spvNow();
    dotsEl.innerHTML = '';
    for (var i = 0; i <= maxCur(); i++) {
      var d = document.createElement('button');
      d.className = 'tst-dot' + (i === cur ? ' on' : '');
      d.setAttribute('aria-label', 'Testimonial ' + (i+1));
      (function(idx) { d.addEventListener('click', function() { goTo(idx); }); })(i);
      dotsEl.appendChild(d);
    }
  }
  function updateDots() {
    dotsEl.querySelectorAll('.tst-dot').forEach(function(d,i) { d.classList.toggle('on', i===cur); });
    counter.textContent = (cur + 1) + ' / ' + (maxCur() + 1);
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur >= maxCur();
  }
  function goTo(n) {
    spv = spvNow();
    cur = Math.max(0, Math.min(n, maxCur()));
    track.style.transform = 'translateX(' + (-cur * slideW()) + 'px)';
    updateDots();
  }
  window.tstiGo = function(dir) { goTo(cur + dir); };
  // Touch/drag
  track.addEventListener('mousedown', function(e) { dragging=true; startX=e.clientX; track.style.transition='none'; });
  document.addEventListener('mousemove', function(e) { if(!dragging) return; diff=e.clientX-startX; track.style.transform='translateX('+(-cur*slideW()+diff)+'px)'; });
  document.addEventListener('mouseup', function() { if(!dragging) return; dragging=false; track.style.transition=''; if(diff<-60)goTo(cur+1); else if(diff>60)goTo(cur-1); else goTo(cur); diff=0; });
  track.addEventListener('touchstart', function(e) { startX=e.touches[0].clientX; track.style.transition='none'; }, {passive:true});
  track.addEventListener('touchmove', function(e) { diff=e.touches[0].clientX-startX; track.style.transform='translateX('+(-cur*slideW()+diff)+'px)'; }, {passive:true});
  track.addEventListener('touchend', function() { track.style.transition=''; if(diff<-60)goTo(cur+1); else if(diff>60)goTo(cur-1); else goTo(cur); diff=0; });
  // Auto-play
  var autoTimer = setInterval(function() { if(cur < maxCur()) goTo(cur+1); else goTo(0); }, 5000);
  track.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
  track.addEventListener('mouseleave', function() { autoTimer = setInterval(function() { if(cur < maxCur()) goTo(cur+1); else goTo(0); }, 5000); });
  buildDots(); goTo(0);
  window.addEventListener('resize', function() { buildDots(); goTo(Math.min(cur, maxCur())); });
})();

// ── Intersection Observer for reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Counter animation
function animateCount(el, target, suffix) {
  let start = 0, duration = 1800;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    let progress = Math.min((ts - startTime) / duration, 1);
    let ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (suffix || '');
  }
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || (target >= 100 ? '+' : '+');
      animateCount(el, target, suffix);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-anim').forEach(el => countObs.observe(el));

// ── Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '';
  hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  hamburger.setAttribute('aria-expanded', false);
  ['span:nth-child(1)','span:nth-child(2)','span:nth-child(3)'].forEach((s,i) => {
    const span = hamburger.querySelectorAll('span')[i];
    if(span) { span.style.transform=''; span.style.opacity=''; }
  });
}));

// ── Team Carousel (skip entirely if markup is missing — must not throw before other handlers run)
const carousel = document.getElementById('teamCarousel');
const wrap = document.getElementById('carouselWrap');
const dotsContainer = document.getElementById('cDots');
const cPrev = document.getElementById('cPrev');
const cNext = document.getElementById('cNext');
if (carousel && wrap && dotsContainer && cPrev && cNext) {
let currentSlide = 0;
let slidesPerView = 4;
let isDragging = false, startX = 0, currentX = 0, diffX = 0;
const TOTAL = 8;

function getSlidesPerView() {
  const w = wrap.offsetWidth;
  if (w < 500) return 1;
  if (w < 700) return 2;
  if (w < 980) return 3;
  return 4;
}

function buildDots() {
  dotsContainer.innerHTML = '';
  slidesPerView = getSlidesPerView();
  const maxSlide = Math.max(0, TOTAL - slidesPerView);
  for (let i = 0; i <= maxSlide; i++) {
    const d = document.createElement('div');
    d.className = 'c-dot' + (i === currentSlide ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  }
}

function updateDots() {
  dotsContainer.querySelectorAll('.c-dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
}

function getSlideWidth() {
  const slides = carousel.querySelectorAll('.tc-slide');
  return slides[0] ? slides[0].offsetWidth + 22 : 0;
}

function goTo(n) {
  slidesPerView = getSlidesPerView();
  const maxSlide = Math.max(0, TOTAL - slidesPerView);
  currentSlide = Math.max(0, Math.min(n, maxSlide));
  carousel.style.transform = `translateX(${-currentSlide * getSlideWidth()}px)`;
  cPrev.disabled = currentSlide === 0;
  cNext.disabled = currentSlide >= maxSlide;
  updateDots();
}

cPrev.addEventListener('click', () => goTo(currentSlide - 1));
cNext.addEventListener('click', () => goTo(currentSlide + 1));

// Touch / drag
carousel.addEventListener('mousedown', e => { isDragging=true; startX=e.clientX; carousel.style.transition='none'; });
document.addEventListener('mousemove', e => { if(!isDragging) return; diffX = e.clientX - startX; carousel.style.transform = `translateX(${-currentSlide * getSlideWidth() + diffX}px)`; });
document.addEventListener('mouseup', () => { if(!isDragging) return; isDragging=false; carousel.style.transition=''; if(diffX < -60) goTo(currentSlide+1); else if(diffX > 60) goTo(currentSlide-1); else goTo(currentSlide); diffX=0; });
carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; carousel.style.transition='none'; }, {passive:true});
carousel.addEventListener('touchmove', e => { diffX = e.touches[0].clientX - startX; carousel.style.transform = `translateX(${-currentSlide * getSlideWidth() + diffX}px)`; }, {passive:true});
carousel.addEventListener('touchend', () => { carousel.style.transition=''; if(diffX < -60) goTo(currentSlide+1); else if(diffX > 60) goTo(currentSlide-1); else goTo(currentSlide); diffX=0; });

// Init
buildDots();
goTo(0);
window.addEventListener('resize', () => { buildDots(); goTo(Math.min(currentSlide, Math.max(0, TOTAL - getSlidesPerView()))); });

}

// Close overlay on backdrop click
document.getElementById('ft-overlay')?.addEventListener('click', function(e) {
  if (e.target === this) { this.classList.remove('active'); document.body.style.overflow=''; }
});

// ESC key closes overlay
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { document.getElementById('ft-overlay')?.classList.remove('active'); document.body.style.overflow=''; }
});