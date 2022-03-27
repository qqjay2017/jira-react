export interface ProjectModel {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export interface UserModel {
  id: number;
  name: string;
  token: string;
}
