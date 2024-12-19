export interface Job {
  id?: string;
  company?: string;
  department?: string;
  title: string;
  level: string;
  location?: string;
  employmentRegime?: string;
  workModel?: string;
  jobContact?: string;
  notes?: string;
  skills: Array<HardSkill>;
  authorizedIndividuals?: Array<string>;
  userCreator: string;
  userModifier?: string;
  dateCreation: string;
  dateModification?: string;
  status: string;
  candidates?: number;
}

interface HardSkill {
  name: string;
  weight: number;
}
