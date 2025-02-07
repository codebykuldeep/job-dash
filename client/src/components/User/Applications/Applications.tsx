import React, { Suspense, useState } from 'react';
import classes from './applications.module.css'
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import Loading from '../../Common/Loading';

import { ColumnType } from '../../../types/tableTypes';
import { IApplications } from '../../../types/dataTypes';
import DetailModal from './DetailModal';
import { Box, useColorScheme } from '@mui/material';
import { dateFormatter } from '../../../helper/helperFunctions';
import DataShowTable from '../../Common/DataShowTable';
import ErrorPage from '../../Common/ErrorPage';

function Applications() {
  const {mode} =useColorScheme()
  const [data,loading,error] = useFetch<IApplications[]>('users/applications');
  const [selectedRow, setSelectedRow] = useState<IApplications | null>(null);
  const [open, setOpen] = useState(false);
  
  
    const handleOpen = (row: IApplications) => {
      setSelectedRow(row);
      setOpen(true);
    };
    const handleClose = () => setOpen(false);

  if(loading && !data){
    return <Loading bgColor={mode === 'dark' ? '#202020': 'var(--dull-bg)'}/>
  }
  if(error && !data){
    return <ErrorPage/>
  }
  
  
  return (
    <Suspense fallback={<Loading/>}>
      <Box className={classes.container} sx={{bgcolor: mode === 'dark' ? '#202020': 'var(--dull-bg)',color:'text.primary'}}>
        <div className={classes.header}>Applications</div>
        <div className={classes.table}>
          <DataShowTable<IApplications> columns={ApplicationsColumn} rows={data!} openModal={handleOpen}/>
        </div>
        {
          selectedRow && (
          <div>
            <DetailModal data={selectedRow!} open={open} handleClose={handleClose}/>
          </div>
          )
        }
      </Box>
    </Suspense>
  )
}

export default Applications



export const ApplicationsColumn:ColumnType[] = [
  {
    id:'title',
    label:'Job Title',
    
  },
  {
    id:'company_name',
    label:'Company',
    align:'center',
  },
  {
    id:'experience',
    label:'Required Exp.',
    align:'center',
  },
  {
    id:'app_status',
    label:'Status',
    format:(value)=>{
      let output = "selected"
      if(value === null){
        output = 'pending'
      }
      else if(Boolean(value) === false){
        output = 'rejected'
      }
      return <span className={classes[output]}>{output}</span>;
    },
  },
  {
    id:'applied_date',
    label:'Applied Date',
    format:(value)=>{
      return dateFormatter(value);
    },
  },
]