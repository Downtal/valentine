
export enum View {
  LOCK = 'lock',
  DASHBOARD = 'dashboard',
  STATS = 'stats',
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  icon: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  icon: string;
  color: string;
}
