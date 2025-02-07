import React, { useEffect, useState } from 'react';
import classes from './user-home.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Analytics from './Analytics';
import Chart from './Chart';
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import Loading from '../../Common/Loading';
import { AppStatusCount, UserCountData } from '../../../types/dataTypes';
import { Box, useColorScheme } from '@mui/material';
import ErrorPage from '../../Common/ErrorPage';

type ApiRespone ={appStatusData:UserCountData[],companyData:UserCountData[]}

function UserHome() {
    const {mode} = useColorScheme();
    const user = useSelector((state:RootState)=>state.userSlice.user)
    const [data,loading,error] = useFetch<ApiRespone>('users/detail');
    const [applicationData,setApplicationData] = useState<AppStatusCount | null>(null)
    const [compData,setCompData ] = useState<number>(0);
    
   useEffect(()=>{
    if(data){
        const {appStatusData,companyData} = data;
        const appData = getApplicationStatusData(appStatusData);
        setApplicationData(appData);
        setCompData(companyData.length);
    }
   },[data])
   

   if(error){
    return <ErrorPage/>
   }
   
    
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor: mode === 'dark' ? '#202020': 'var(--dull-bg)'}} >
        <Box className={classes.greeting}>
            Hello, <span>{user!.name}</span>
        </Box>
        {
            !data || loading ? <Loading bgColor={mode === 'dark' ? '#202020': 'var(--dull-bg)'}/> : (
                <>
                {applicationData && <Analytics dataArr={[applicationData.total,compData,applicationData.accepted]}/>}
                <div className={classes.chart}>
                    <Box className={classes.header}>Chart</Box>
                    <div className={classes.pie_chart}>
                        {applicationData && applicationData.total > 0 && <Chart data={applicationData}/>}
                    </div>
                </div>
                </>
            )
        }
    </Box>
  )
}

export default UserHome


function getApplicationStatusData(data:UserCountData[]):AppStatusCount{
    let pending = 0;
    let rejected = 0;
    let accepted = 0;
    let total = 0;
    data.forEach((entry)=>{
        if(entry.app_status=== true){
            accepted = Number(entry.count);
        }
        else if(entry.app_status === null){
            pending = Number(entry.count);
        }
        else{
            rejected = Number(entry.count);
        }
    })
    
    total = pending + accepted + rejected;
    return {pending,accepted,rejected,total}
}