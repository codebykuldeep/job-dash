import { Box } from '@mui/material'
import React, { useRef, useState } from 'react';
import classes from './jobs-main.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { searchPost } from '../../../store/searchSlice';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [value,setValue] = useState('');
  const debounceTimer= useRef<ReturnType<typeof setTimeout> | null>(null);


  function handleSearch(event:React.ChangeEvent<HTMLInputElement>){
    const value  = event.target.value
    setValue(value);
    if(debounceTimer.current){
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(()=>{dispatch(searchPost(value));},500);
  }


  return (
    <Box className={classes.search_form} >
        <div className={classes.search_box}>
          <input type="text"  placeholder='Enter keywords' defaultValue={value} onChange={handleSearch}/>
          <SearchIcon/>
        </div>
    </Box>
  )
}

export default SearchBar