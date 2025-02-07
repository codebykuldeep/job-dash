import React, { useState } from 'react';
import classes from './find.module.css';
import { Box, Button } from '@mui/material';
import FilterBox from './FilterBox';
import { IUser } from '../../../types/dataTypes';
import { userServerConnect } from '../../../utils/http-methods/userMethods';
import { ColumnType } from '../../../types/tableTypes';
import DataShowTable from '../../Common/DataShowTable';

function Find() {
    const [skill,setSkill] = useState('');
    const [experience,setExperience] = useState(0);
    const [data,setData]= useState<IUser[] | null>(null)
    const [loading,setLoading]= useState(false)

    function handleSkill(value:string){
        setSkill(value);
    }
    function handleExp(value:number){
        setExperience(value);
    }
    async function handleSearch() {
      setLoading(true)
      const response = await userServerConnect('GET','employers/search',{skill,experience:String(experience)})
      if(Boolean(response.success)){
        setData(response.data)
        
      }
      else{
        setData([]);
      }
      setLoading(false);
    }
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}}>
        <Box className={classes.header}>Find jobseekers</Box>
        <Box className={classes.filter_box} sx={{bgcolor:"action.selected"}}>
          <FilterBox skill={skill} experience={experience} updateSkill={handleSkill} updateExp={handleExp}/>
        <Box className={classes.search_btn}>
          <Button variant='contained' loading={loading}  loadingPosition='end' onClick={handleSearch}>Search</Button>
        </Box>
        </Box>
        <Box>
          {<Box className={classes.result_head}>JobSeekers List</Box>}
          
          {!loading && data && data.length!==0 && (
            <Box className={classes.result}>
            <Box className={classes.count}>
              {data.length} matching jobseekers found
            </Box>
            <Box className={classes.table}>
              <DataShowTable<IUser> columns={UserColumn} rows={data}/>
            </Box>
            </Box>
          )}
          {
            !loading && data && data.length === 0 &&(<Box  className={classes.no_result}>No result founds</Box>)
          }
        </Box>
    </Box>
  )
}

export default Find



export const UserColumn:ColumnType[] = [
  {
    id:'name',
    label:'Name'
  },
  {
    id:'email',
    label:'Email',

  },
  {
    id:'phone',
    label:'Phone Number',
    
  },
  {
    id:'skill',
    label:'Skills',
    
  },
  {
    id:'experience',
    label:'Experience',
    format:(value)=>{
      return `${value} years`
    }
  },
  {
    id:'resume',
    label:'Resume',
    format:(value)=>{
      if(value === null){
        return 'Not Available'
      }
      return <a href={value} target='_blank' rel='noreferrer'><Button>Open</Button></a>
    }
  }
]