import React, { useState } from 'react'
import classes from './employers.module.css'
import Loading from '../../Common/Loading';
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import { EmployerColumn } from './Employers';
import { IEmployer } from '../../../types/dataTypes';
import EmpModal from './EmpModal';
import { Box } from '@mui/material';
import DataShowTable from '../../Common/DataShowTable';

function PendingEmps() {
  const [data,loading,error,update] = useFetch<IEmployer[]>('employers',{
    type:'pending'
  });
  const [selectedRow,setSelectedRow] = useState<IEmployer | null>(null)
  const [open, setOpen] = useState(false);


  const handleOpen = (row:IEmployer) => {
    setSelectedRow(row);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  if(loading){
    return <Loading/>
  }

  if(error){
    return <p>Failed to load...</p>
  }
  
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}}>
      <div className={classes.heading}><h1>Pending Employers</h1></div>
      {selectedRow && <EmpModal data={selectedRow} open={open} handleClose={handleClose} update={update}/>}
      {!!data && <DataShowTable<IEmployer> columns={EmployerColumn} rows={data} openModal={handleOpen}/>}
    </Box>
  )
}

export default PendingEmps;