import React from 'react'
import AnalyticsCard from '../../Admin/Home/AnalyticsCard'
import { AnalyticLabelList, DetailsData } from '../../../types/dataTypes';
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import { Box } from '@mui/material';
import Loading from '../../Common/Loading';
import ErrorPage from '../../Common/ErrorPage';

function EmployerHome() {
  const [data,loading,error] = useFetch<DetailsData>('employers/detail');
    if(error){
      return <ErrorPage/>
    }
    
  return (
    <div>
      {!data || loading ? <Loading/> : (
        <Box>
          <AnalyticsCard data={data} labelList={CardArr}/>
        </Box>
      )}
    </div>
  )
}

export default EmployerHome;


const CardArr:AnalyticLabelList =[
  {
      id:'job_posted',
      title:'Job Posted'
  },
  {
    id:'job_active',
    title:'Job Active'
  },
  {
    id:'job_expired',
    title:'Job Expired'
  },
  {
      id:'app_recieved',
      title:'Application Recieved'
  },
  {
      id:'app_accepted',
      title:'Applications Accepted'
  },
  {
      id:'app_rejected',
      title:'Application Rejected'
  },
  {
      id:'app_pending',
      title:'Application Pending'
  },
]