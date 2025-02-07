
export interface IUser {
    user_id:string;
    email:string;
    phone:string;
    resume:string;
    summary:string;
    status:string;
    role:string;
    [index:string]:string;
}

export interface IEmployer {
    emp_id:string;
    email:string;
    phone:string;
    summary:string;
    status:string;
    [index:string]:string;
}


export interface IPost {
  created_at: string;
  date: string;
  description: string;
  education: string;
  emp_id: string;
  experience: string;
  job_type: string;
  location: string;
  post_id: string;
  status: string;
  title: string;
  company_name:string;
  applied:string;
}

export interface IApplicant {
  created_at: string;
  user_data: string;
  post_id: string;
  user_id: string;
  app_id: string;
  status: string;
  [index:string]:string;
}


export interface  IApplications extends IPost{
  app_id:string;
  app_status:string;
  applied_date:string;
  user_data:string;
}

export interface ICHATROOM{
  room_id:string;
  user_id:string;
  emp_id:string;
}

export interface IMessage {
  content: string;
  created_at: string;
  emp_id?: string;
  message_id?: string;
  room_id?: string;
  seen?: string;
  sender: string;
  user_id?: string;
}

export interface IUserWithRoom extends IUser,ICHATROOM{}


export type UserCountData = {count:string,app_status:null|boolean,company_name:string};

export type AppStatusCount = {pending:number,rejected:number,accepted:number,total:number};


export interface DetailsData{
  [index:string]:string;
}
export interface AnalyticCardLabel{
  id:string;
  title:string;
}

export type AnalyticLabelList = AnalyticCardLabel[];

