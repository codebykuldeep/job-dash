import React, { useState } from 'react'
import EditForm from './EditForm'
import classes from './edit-page.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import SnackBar from '../../../Common/AuthPage/SnackBar';


function EditPage() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [snackState,setSnackState] = useState({open:false,status:false,message:''})

  function snackClose() {
    setSnackState((prev) => ({ ...prev, open: false }));
  }
  function snackOpen(status:boolean,message:string){
    setSnackState({ open: true , status,message });
  }

  return (
    <div>
        <div className={classes.section}>
          <div className={classes.header}>Personal Detail</div>
          <div className={classes.form_box}>
              <EditForm user={user!} snackOpen={snackOpen}/>
          </div>
        </div>
        <SnackBar state={snackState} handleClose={snackClose}/>
    </div>
  )
}

export default EditPage