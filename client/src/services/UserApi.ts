import ApiClient from "./ApiClient";

const api = new ApiClient(process.env.API_URL); // what is API_URL stands for

export interface IUser {
  userId: string;
  user_name: string;
  user_email: string;
  user_password: string;
}

// Request intterface here is used for defining the request body type
export interface ILoginRequest {
  userEmail: string;
  userPassword: string;
}

// Response interface here is to specifcy the response type needed from POST and GET
interface ILoginResponse {
  token: string;
}

interface IGetUsersResponse {
  users: IUser[];
}

export default class UserApi {
  public static async createUser(
    userEmail: Partial<IUser>,
  ): Promise<IUser> {
    try{
      await api.POST<IUser>('/users/register', userEmail)
    }catch(err) {
      throw (err)
    }
    return
  }

  public static async login(
    creds: Partial <ILoginRequest>
  ): Promise<ILoginResponse> {
    return (await api.POST<ILoginResponse>("/users/login", creds)).data;
  }
}
