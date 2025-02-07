import React from 'react'
import { IUser } from '../../../types/dataTypes'
import classes from './profile.module.css';
import { nameFormatter } from '../../../helper/helperFunctions';
import { Button } from '@mui/material';

interface ProfileProps{
  user:IUser;
}


function Profile({user}:ProfileProps) {
  const views = ['name','email','education','summary','skill']
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div> Personal Information</div>
      </div>
      <div className={classes.detail}>
        {views.map((view) => (
          <p key={view} className={classes.line}>
            <span>{nameFormatter(view)}</span> :{" "}
            <span>{user[view] || "Not Available"}</span>
          </p>
        ))}
        <p className={classes.line}>
          <span>{nameFormatter("experience")}</span> :{" "}
          <span>{user["experience"]} years</span>
        </p>
      </div>
      <div>
        <p className={classes.line}>
          <span>Resume</span> :{" "}
          <span>
            {
              user?.resume ? (
                <a href={user.resume} target="_blank" rel="noreferrer">
                  <Button variant="outlined">Open</Button>
                </a>
              ):'Not Available'
            }
          </span>
        </p>
      </div>
      <div>
        <p className={classes.line}>
          <span>Email Verified</span> :{" "}
          <span>
            {
              Boolean(user?.status) ? 'Verifed': 'Not Verified'
            }
          </span>
        </p>
      </div>
    </div>
  );
}

export default Profile