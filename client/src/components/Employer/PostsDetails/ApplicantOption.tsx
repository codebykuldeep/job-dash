import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface OptionButtonProps{
    handleFilter:(q:string)=>void;
}

export default function ApplicantOption({handleFilter}:OptionButtonProps) {
    const [value,setValue]= useState('all')
    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const selected = event.target.value
        handleFilter(selected);
        setValue(selected);
    }
  return (
    <FormControl>
      <FormLabel id="option">Filter By</FormLabel>
      <RadioGroup
        row
        name="option"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="all" control={<Radio />} label="All"/>
        <FormControlLabel value="selected" control={<Radio />} label="Selected" />
        <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
      </RadioGroup>
    </FormControl>
  );
}
