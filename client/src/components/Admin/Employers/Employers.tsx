import React, { useEffect, useState } from 'react'
import classes from './employers.module.css'
import { useFetch } from '../../../utils/custom-hooks/useFetch'
import { ColumnType } from '../../../types/tableTypes'
import { IEmployer } from '../../../types/dataTypes'
import Loading from '../../Common/Loading'
import OptionButton from './OptionButton'
import { Box, useColorScheme } from '@mui/material'
import DataShowTable from '../../Common/DataShowTable'



function Employers() {
  const {mode} = useColorScheme();
  const [data,loading,error] = useFetch('employers');
  const [rows,setRows] = useState<IEmployer[] | null>(null);
  useEffect(()=>{
    setRows(data as IEmployer[]);
  },[data])

  if(loading){
    return <Loading/>
  }

  if(error){
    return <p>Failed to load...</p>
  }

  function handleFilter(option:string){
    let newRows = data as IEmployer[];
    if(option === 'approved'){
      newRows = newRows.filter((entry)=>Boolean(entry.status));
    }
    else if(option === 'rejected'){
      newRows = newRows.filter((entry)=>entry.status !== null &&!Boolean(entry.status));
    }
    setRows(newRows);
  }
  
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor: mode === 'dark' ?"background.default" : 'var(--dull-bg)'}}>
      <div className={classes.heading}><h1>Employers</h1></div>
      <OptionButton handleFilter={handleFilter} />
      {!!data && rows && <DataShowTable<IEmployer> columns={EmployerColumn} rows={rows}/>}
    </Box>
  )
}

export default Employers



export const EmployerColumn:ColumnType[] = [
  {
    id:'emp_id',
    label:'Emp ID'
  },
  {
    id:'name',
    label:'Name',

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
    id:'company_name',
    label:'Company Name',
    format:(value)=>{
      if(value === null){
        return 'Not available'
      }
      return value;
    }
  },
  {
    id:'status',
    label:'Current Status',
    minWidth:200,
    align:'center',
    format:(value)=>{
      let name = 'approved'
      let output = "Approved"
      if(value === null){
        name = 'pending';
        output='Not approved';
      }
      else if(Boolean(value) === false){
        name = 'rejected';
        output='Rejected';
      }
      return <span className={classes[name]}>{output}</span>;
    }
  },
  {
    id:'verified',
    label:'Email Verified',
    format:(value)=>{
      if(Boolean(value)){
        return 'Verified'
      }
      return "Not Verified";
    }
  },
  {
    id:'summary',
    label:'Summary',
    format:(value)=>{
      if(value === null || value === ''){
        return 'Not available'
      }
      return value;
    }
  }
]