import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import { IApplicant } from '../../../types/dataTypes';
import Loading from '../../Common/Loading';
import { ColumnType } from '../../../types/tableTypes';
import classes from './applicants.module.css'
import { Button } from '@mui/material';
import AppModal from './AppModal';
import ApplicantOption from './ApplicantOption';
import DataShowTable from '../../Common/DataShowTable';

function Applicants({ id }: { id: string }) {
  const [data, loading, error,update] = useFetch<IApplicant[]>(`posts/data/${id}`);
  const [selectedRow, setSelectedRow] = useState<IApplicant | null>(null);
  const [open, setOpen] = useState(false);
  const [rows,setRows] = useState<IApplicant[]>([]);


  useEffect(()=>{
    if(data){
      
      setRows(data);
    }
  },[data])

  const handleOpen = (row: IApplicant) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  if (loading && !data) {
    return <Loading/>;
  }
  if (error && !data) {
    return <p>Error while loading page.Please try later</p>;
  }
  function handleFilter(option:string){
    if(!data) return;
    let newRows = data ;
    if (option === "pending") {
      newRows = newRows.filter((entry) => entry.status === null);
    } 
    else if (option === "rejected") {
      newRows = newRows.filter(
      (entry) => !Boolean(entry.status)
      );
    }
    else if (option === "selected") {
      newRows = newRows.filter(
      (entry) => Boolean(entry.status)
      );
    }
      setRows(newRows);
    
  }
  
  
  return (
    <div className={classes.container}>
        <div className={classes.filter}>
        <ApplicantOption handleFilter={handleFilter}/>
        </div>
        <div className={classes.table}>
            <DataShowTable<IApplicant> columns={EmployerColumn} rows={rows!}  openModal={handleOpen}/>
        </div>
        {selectedRow && <AppModal data={selectedRow} open={open} handleClose={handleClose} update={update}/>}
    </div>
  )
}

export default Applicants



export const EmployerColumn:ColumnType[] = [
  {
    id:'app_id',
    label:'App ID'
  },
  {
    id:'user_id',
    label:'User ID',

  },
  {
    id:'name',
    label:'name',
    
  },
  {
    id:'user_data',
    label:'Profile',
    align:'center',
    format:(value)=>{
      if(value){
        return <Button>View</Button>
      }
      return <Button>View</Button>;
    }
  },
  {
    id:'status',
    label:'Status',
    format:(value)=>{
      if(value === null){
        return 'pending'
      }
      if(Boolean(value) === false){
        return 'Rejected'
      }
      return "selected";
    }
  }
]