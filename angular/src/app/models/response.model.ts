export interface ResponseData {
  auth: boolean;
  message: string;
  status: number;
  error: string;
  userName: string;
  userType: string;
  token: string;
  expiresIn:number;
}
