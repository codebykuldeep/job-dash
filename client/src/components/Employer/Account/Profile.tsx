import React from 'react'
import { IUser } from '../../../types/dataTypes'
import classes from './profile.module.css';
import { nameFormatter } from '../../../helper/helperFunctions';


interface ProfileProps{
  user:IUser;
}


function Profile({user}:ProfileProps) {
  const views = ['name','email','company_name','summary',]
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div> Personal Information</div>
      </div>
      <div className={classes.detail}>
        {views.map((view) => (
          <p key={view} className={classes.line}>
            <span>{nameFormatter(view)}</span> :{" "}
            <span>{user[view] ? nameFormatter(user[view]) : "Not Available"}</span>
          </p>
        ))}
        <p className={classes.line}>
            <span>{'Phone number'}</span> :{" "}
            <span>{user['phone']}</span>
          </p>

          <p className={classes.line}>
            <span>{'Email verified'}</span> :{" "}
            <span>{Boolean(user?.verified) ? 'Verified' : "Not Verified"}</span>
          </p>
      </div>
      
    </div>
  );
}

export default Profile