import { Autocomplete, FormControl, FormHelperText, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import classes from './input.module.css'
import InputField from './InputField'
import { FormStateType } from '../../../types/formTypes';

interface RightFormProps{
    formState:FormStateType;
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

function RightForm({formState,onChange}:RightFormProps) {
    function handleDropdown(value:string| null,name:string){
        const obj ={
            target:{name:name,value:value ? value : ''}
        }
        onChange(obj as React.ChangeEvent<HTMLInputElement>)
    }
    function handleSelect(event: SelectChangeEvent){
        onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  return (
    <div className={classes.right}>
      <div className={classes.input}>
        <FormLabel htmlFor={"location"} error={false}>
          Location
        </FormLabel>
        <Autocomplete
          id="location"
          freeSolo
          options={location.map((option) => option.title)}
          value={formState["location"].value}
          inputValue={formState["location"].value}
          onInputChange={(event, value) => handleDropdown(value, "location")}
          onChange={(event, value) => handleDropdown(value, "location")}
          renderInput={(params) => (
            <TextField
              name="location"
              placeholder='Enter company location'
              error={formState["location"].status}
              helperText={formState["location"].message}
              {...params}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div >
        <FormControl fullWidth className={classes.input}>
          <FormLabel htmlFor={"job_type"} error={false}>
            Job Type
          </FormLabel>

          
          <Select
            labelId="job_type"
            id="job_type"
            value={formState["job_type"].value}
            label=""
            name="job_type"
            onChange={handleSelect}
            error={formState["job_type"].status}
          >
            {jobType.map(({ id, label, title }) => (
              <MenuItem key={id} value={title}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formState['job_type'].status && <FormHelperText error >{formState['job_type'].message}</FormHelperText>}
      </div>
      <div>
        <FormControl fullWidth className={classes.input}>
          <FormLabel htmlFor={"education"} error={false}>
            Education
          </FormLabel>

          <Select
            labelId="education"
            id="education"
            value={formState["education"].value}
            label=""
            name="education"
            onChange={handleSelect}
            error={formState["education"].status}
          >
            {educationType.map(({ id, title }) => (
              <MenuItem key={id} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formState['education'].status && <FormHelperText error >{formState['job_type'].message}</FormHelperText>}
      </div>
      <InputField
        name="date"
        type="date"
        label="Last Date"
        formState={formState}
        onChange={onChange}
      >
        Last date for apply
      </InputField>
    </div>
  );
}

export default RightForm


const location = [
    { title: 'Noida'},
    { title: 'Gurugram' },
    { title: 'Delhi' },
    { title: 'Banglore' },
    { title: 'Pune' },
    { title: "Mumbai" },
    { title: 'Kolkata' },
]

const jobType = [
    {id:1, title: 'internship',label:'Internship' },
    {id:2, title: 'fulltime',label:'Full-Time' },
    {id:3, title: 'temporary',label:'Temporary' },
]
const educationType = [
    {id:1, title: '10th'},
    {id:2, title: '12th'},
    {id:3, title: 'Graduate' },
]

