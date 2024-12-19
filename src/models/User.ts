export interface User {
    id: string;
    name: string;
    email: string;
    role: Array<string>;
    company?: string;
  }