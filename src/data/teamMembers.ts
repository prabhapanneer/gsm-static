export type TeamMember = {
  img?: string;
  initials?: string;
  name: string;
  role: string;
  /** Omit for members whose experience should not be shown yet */
  experience?: string;
};

/** Paths are relative to assets/images/ */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    img: 'team/ganesan.jpg',
    name: 'Ganesan Muralidharan',
    role: 'Founder & CEO',
    experience: '25 Years',
  },
  {
    img: 'team/vishal.jpg',
    name: 'Vishal Muralidharan',
    role: 'Chief Business Officer',
    experience: '7 Years',
  },
  {
    img: 'team/sethuraman.jpg',
    name: 'Sethuraman D.',
    role: 'Chief Relationship Officer',
    experience: '16 Years',
  },
  {
    img: 'team/rajendran.jpg',
    name: 'Rajendran S S',
    role: 'Head of Operations & Client Support',
    experience: '10 Years',
  },
  {
    img: 'team/kalaimani.jpg',
    initials: 'KS',
    name: 'Kalaimani S',
    role: 'Operations & Client Support Executive',
    experience: '2 Years',
  },
  {
    img: 'team/chitra.jpg',
    name: 'Chitra S',
    role: 'Data Management Executive',
    experience: '4 Years',
  },
  {
    img: 'team/magesh.jpg',
    initials: 'MS',
    name: 'Magesh S S',
    role: 'Back Office Support Executive',
  },
  {
    img: 'team/sivaram.jpg',
    initials: 'SM',
    name: 'Sivaram Muralidharan',
    role: 'Marketing Executive',
  },
  {
    img: 'team/joni.jpg',
    name: 'Joni Janarthanan',
    role: 'Marketing Executive',
  },
];
