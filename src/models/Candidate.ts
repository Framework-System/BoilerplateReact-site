export interface Candidate {
  id: string;
  jobSkillsId: string;
  title: string;
  text: string;
  creationDate: string;
  modificationDate: string;
  interviewEvaluation: Evaluation;
  curriculumFile: Array<string>;
  curriculumEvaluation: Array<CurriculumEvaluation>;
  mediaInterview: MediaInterview;
  softSkills: string;
  timeline: Array<Timeline>;
  status: string;
  classify?: string;
  grade: number;
  level: string;
  weightedGrade?: object;
  formatHtml?: string;
}

export interface Criteria {
  name: string;
  weight: number;
  score: number;
}

export interface Question {
  title: string;
}

export interface Evaluation {
  criteria: Array<Criteria>;
  questions: Array<Question>;
  summary: string;
}

export interface CurriculumEvaluation {
  name: string;
  score: string;
  itemGenerated: boolean;
}

export interface MediaInterview {
  bucketName: string;
  key: string;
}

export interface Timeline {
  topic: string;
  start: string;
  end: string;
}
