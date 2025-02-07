import React from 'react'
import InputField from './InputField'
import classes from './input.module.css'
import { Box, FormLabel, TextField } from '@mui/material'
import { FormStateType } from '../../../types/formTypes'

interface LeftFormProps{
    formState:FormStateType;
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function LeftForm({formState,onChange}:LeftFormProps) {
  return (
    <div className={classes.left}>
        <InputField name='title' type='text' label='Title' formState={formState} onChange={onChange}>Enter Job title</InputField>
        <InputField name='experience' type='number' label='Experience' formState={formState} onChange={onChange}>Enter your Experience</InputField>
        <Box className={classes.input}>
            <FormLabel htmlFor={'description'} error={false}>Description</FormLabel>
            <TextField
                fullWidth
                placeholder='Enter Job description'
                id={'description'}
                name={'description'}
                type={'text'}
                className={classes.textarea}
                multiline
                rows={5}
                onChange={onChange}
                defaultValue={formState['description'].value}
                error={formState['description'].status}
                helperText={formState['description'].message}
                />
        </Box>
    </div>
  )
}

export default LeftForm