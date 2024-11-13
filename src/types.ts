export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  company: string;
  status: string;
  postedDate: string;
  skills: Array<string>;
  candidates: number;
}
