import { TextField,FormLabel, Box } from '@mui/material'
import React from 'react'
import classes from './input.module.css'
import { FormStateType } from '../../../types/formTypes';

interface InputFieldProps{
    name:string;
    label:string;
    type:string;
    children?:string;
    formState:FormStateType,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function InputField({label,type,name,children,formState,onChange}:InputFieldProps) {
  return (
    <Box className={classes.input}>
      <FormLabel htmlFor={name} error={false}>{label}</FormLabel>
      <TextField
            fullWidth
          placeholder={children}
          id={name}
          name={name}
          type={type}
          sx={{width:'100%'}}
          defaultValue={formState[name].value}
          error={formState[name].status}
          helperText={formState[name].message}
          onChange={onChange}
        />
    </Box>
  )
}

export default InputField