import fs from 'node:fs';
import path from 'node:path';

const publicFolder = path.resolve('public');
const dataFolder = path.resolve('public','data');

export function createDirForData(){
  try {
    if (!fs.existsSync(publicFolder)) {
      console.log("creating storage dir");
      fs.mkdirSync(publicFolder);
      fs.mkdirSync(dataFolder);
    }
  } catch (err) {
    console.error(err);
  }
}


export function extractDataForMessageSaving(sender,reciever){
  let user_id;
  let role;
  let emp_id;
  if(sender.role === 'user'){
    user_id = sender.user_id;
    role = 'user';
    emp_id = reciever.emp_id
  }
  else{
    user_id = reciever.user_id;
    role = 'employer';
    emp_id = sender.emp_id
  }

  return {user_id,role,emp_id};
}

