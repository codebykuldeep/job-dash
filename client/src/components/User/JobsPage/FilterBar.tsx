import React, { useState } from 'react';
import classes from './jobs-main.module.css'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Slider } from '@mui/material';
import FilterIcon from '@mui/icons-material/FilterAlt';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { searchActions } from '../../../store/searchSlice';

interface FilterBarProps{
    mode: "light" | "dark" | "system" | undefined
}

function FilterBar({mode}:FilterBarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [locationArr,setLocationArr] = useState<string[]>([])
    const [experience,setExperience] = useState<number>(0)


    function handleLocation(event:React.ChangeEvent<HTMLInputElement>){
        const value = (event.target.value).toLowerCase();
        if(locationArr.includes(value)){
            setLocationArr(prev=>prev.filter((val)=>val!==value));
        }
        else{
            setLocationArr((prev)=>([...prev,value]));
        }
    }
    function handleExp(event: Event, value: number | number[], activeThumb: number){
        if(Array.isArray(value)){
            setExperience(value[0]);
        }
        else{
            setExperience(value);
        }
    }

    function handleFilter(){
        dispatch(searchActions.applyFilter({location:locationArr,experience}));
    }
    function handleReset(){
        setExperience(0);
        setLocationArr([]);
        dispatch(searchActions.applyFilter({location:[],experience:-1}));
    }
    
  return (
    <Box className={classes.filter} sx={{color:'text.primary',bgcolor:mode === 'dark'? 'action.hover' : 'var(--grey)'}}>
        <div className={classes.filter_head}>
           <span> <FilterIcon/></span><span>Filters</span>
        </div>
        <div>
            <div>Locations</div>
            <FormGroup onChange={handleLocation} className={classes.location}>
                <div>
                    {
                        checkboxList.map((value)=>(
                            <FormControlLabel key={value} control={<Checkbox value={value}  />} label={value} checked={locationArr.includes(value.toLowerCase())}/>
                        ))
                    }
                </div>
            </FormGroup>
        </div>
        <div>
            <div>Experience</div>
            <div>
            <Slider defaultValue={0}   max={10} aria-label="Default" valueLabelDisplay="auto" value={experience} onChange={handleExp}/>
            </div>
        </div>
        <div className={classes.filter_apply}>
            <Button variant='contained' onClick={handleFilter}>Apply</Button>
            <Button variant='contained' onClick={handleReset}>Reset</Button>
        </div>
    </Box>
  )
}

export default FilterBar


const checkboxList = ['Noida','Gurugram','Banglore','Delhi','Pune','Kolkata']