import React from 'react'
import { IPost } from '../../../types/dataTypes'
import classes from './post-detail.module.css'
import { dateFormatter, nameFormatter } from '../../../helper/helperFunctions';
import { dateValidation } from '../../../utils/validation';
import { Box } from '@mui/material';



function DetailCard({data}:{data:IPost}) {
    const postData = Object.entries(data);
    const [,valid] = dateValidation(data.date);
  return (
    <Box className={classes.detail} sx={{bgcolor:'action.selected'}}>
        <div>
            {
                postData.map(([key,val],index)=>{
                    if(key === 'created_at'){
                        
                        return <p key={index}><span>{nameFormatter(key)}</span> : <span>{dateFormatter(val)}</span></p>
                    }
                    if(key === 'date') return null;
                    return <p key={index}><span>{nameFormatter(key)}</span> : <span>{val.toString()}</span></p>
                })
            }
            <p><span>Last Date</span> : <span>{dateFormatter(data['date'])}</span></p>
            <p><span>Validity</span> : <span>{valid ? 'Expired' : 'Active'}</span></p>

        </div>
    </Box>
  )
}

export default DetailCard