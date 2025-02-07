import { Box, Button } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import LeftForm from './LeftForm'
import RightForm from './RightForm';
import classes from './add-post.module.css'
import { checkValidFormState, populateFormState, validation } from '../../../utils/validation';
import { FormStateType, ReqBody } from '../../../types/formTypes';
import { postsMethod } from '../../../utils/http-methods/employersMethods';

import SnackBar from '../../Common/AuthPage/SnackBar';
import { initialformState } from './AddPost';
import { IPost } from '../../../types/dataTypes';

interface EditingFormProps{
    formStateFromData:FormStateType,
    post:IPost,
}

function EditingForm({post,formStateFromData}:EditingFormProps) {
  const [snackState,setSnackState] = useState({open:false,status:false,message:''})
  const [submit,setSubmit] = useState(false);
  const [formState,setFormState] = useState<FormStateType>(formStateFromData);


  function snackClose(){
    setSnackState(prev=>({...prev,open:false}));
  }
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    
    const name = event.target.name;
    const value = event.target.value;
    const [message, status] = validation(name, value);

    setFormState((prev) => ({
      ...prev,
      [name]: {
        message: message,
        status: status,
        value: value,
      },
    }));
  }

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    setSubmit(true);
    if (checkValidFormState(formState)) {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());
      const result = await postsMethod('update',{...body,post_id:post.post_id} as ReqBody);
      if(result){
        setSnackState(({open:true,status:true,message:'Job post updated successful'}));
      }
      else{
        setSnackState(({open:true,status:false,message:'Failed to update Job post'}));
      }
      
      
    } else {
      setFormState(populateFormState(formState));
    }
    setSubmit(false);
  }
  function handleReset(event:FormEvent<HTMLFormElement>){
    (event.target as HTMLFormElement).reset();
    setFormState(initialformState)
    
  }
  
  
  return (
    <>
    <Box component={'h1'} className={classes.heading}>Update job Details</Box>
        <form className={classes.form_container} onSubmit={handleSubmit} onReset={handleReset}>
            <div className={classes.form}>
                <LeftForm formState={formState} onChange={handleChange}/>
                <RightForm formState={formState} onChange={handleChange}/>
            </div>
            <div className={classes.btn}>
                <Button type='submit' variant='contained' loading={submit} loadingPosition='end'>Update</Button>
                <Button type='reset' variant='contained' disabled={submit}>Reset</Button>
            </div>
        </form>
        <SnackBar state={snackState} handleClose={snackClose}/>
    </>
  )
}

export default EditingForm;
