export class LoginModel {
  Email : string = '';
  Password : string = '';
}

export interface LoginResponse {
  token: string;
  userId : number;
  role : string;
}
