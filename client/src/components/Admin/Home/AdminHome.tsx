import React from 'react'
import classes from './admin-home.module.css'
import { Box } from '@mui/material'
import AnalyticsCard from './AnalyticsCard'
import { useFetch } from '../../../utils/custom-hooks/useFetch'
import { AnalyticLabelList, DetailsData } from '../../../types/dataTypes'
import Loading from '../../Common/Loading'

function AdminHome() {
  const [data,loading,error] = useFetch<DetailsData>('admin/detail');
  if(error){
    return <p>Failed to load page.Try later </p>
  }
  
  
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}}>
      <Box className={classes.welcome}>
        Hello, Admin
      </Box>
      {!data || loading ? <Loading/> : (
        <Box>
          <AnalyticsCard data={data} labelList={CardArr}/>
        </Box>
      )}
    </Box>
  )
}

export default AdminHome


const CardArr:AnalyticLabelList =[
  {
      id:'employers',
      title:'Employers'
  },
  {
      id:'users',
      title:'Job Seekers'
  },
  {
      id:'applications',
      title:'Applications sent'
  },
  {
      id:'posts',
      title:'Job Posted'
  },
  {
      id:'accepted',
      title:'Application Accepted'
  },
  {
      id:'rejected',
      title:'Application Rejected'
  }
]