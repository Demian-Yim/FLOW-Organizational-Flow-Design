export interface TabItem {
  id: string;
  label: string;
  icon: string;
}

export interface Module {
  title: string;
  desc: string;
  time: string;
}

export interface Activity {
  title: string;
  desc: string;
}

export interface ProgramDetail {
  purpose: string;
  target: string;
  time: string;
  keywords: string[];
  modules: Module[];
  activities: Activity[];
  effects: string[]; // KPIs
  application: string; // Field application & Transfer
}

export interface ProgramItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  detail?: ProgramDetail;
}