import React, { FormEvent, useState } from 'react'
import InputField from './InputField';
import classes from './edit-page.module.css'
import { Button } from '@mui/material';
import { checkValidFormState, populateFormState, validation } from '../../../../utils/validation';
import { FormStateType, ReqBody } from '../../../../types/formTypes';
import { IUser } from '../../../../types/dataTypes';
import { userServerConnect } from '../../../../utils/http-methods/userMethods';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { updateUser } from '../../../../store/userSlice';
import SkillField from './SkillField';

interface EditFormProps{
  user:IUser;
  snackOpen:(status:boolean,message:string)=>void;
}

function EditForm({user,snackOpen}:EditFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formState,setFormState] = useState<FormStateType>(dataToFormState(user,initialformState));
    const [submit,setsubmit] = useState(false);
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
        setsubmit(true);
        
        
        if (checkValidFormState(formState)) {
          const formData = new FormData(event.target as HTMLFormElement);
          const body = Object.fromEntries(formData.entries());
          body.skill = formState.skill.value;
          const result  = await userServerConnect('POST','users/update',undefined,body as ReqBody);
          if(Boolean(result.success)){
            dispatch(updateUser());
            snackOpen(true,'Details updated')
          }
          else{
            snackOpen(false,'Details update failed')
          }
           
        } else {
          setFormState(populateFormState(formState));
        }
        setsubmit(false);
      }
      
  return (
    <>
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputField label='Name' name='name' type='text' formState={formState} onChange={handleChange}>Enter your name</InputField>
      <InputField label='Email' name='email' type='text' formState={formState} onChange={handleChange}>Enter email</InputField>
      <InputField label='Education' name='education' type='text' formState={formState} onChange={handleChange}>Enter education detail</InputField>
      <InputField label='About Yourself' name='summary' type='text' formState={formState} onChange={handleChange}>Enter about yourself</InputField>
      <InputField label='Experience' name='experience' type='number' formState={formState} onChange={handleChange}>Enter experience</InputField>
      <SkillField label='Skills' name='skill' formState={formState} onChange={handleChange}/>
      <div>
        <Button variant='contained' type='submit' loading={submit} loadingPosition='end'>{submit ? 'Updating' : 'Update'}</Button>
      </div>
    </form>
    
    
    </>
  )
}

export default EditForm

function dataToFormState(data:IUser,formState:FormStateType){
    for(let key in formState){
        formState[key]={
            value:data[key as keyof IUser],
            status:false,
            message:'',
        }
    }
    return formState;
}




export const initialformState={
  name:{
      value:'',
      status:false,
      message:''
  },
  email:{
    value:'',
    status:false,
    message:''
  },
  summary:{
      value:'',
      status:false,
      message:''
  },
  education:{
      value:'',
      status:false,
      message:''
  },
  skill:{
    value:'',
    status:false,
    message:''
  },
  experience:{
    value:'',
    status:false,
    message:''
  }
}