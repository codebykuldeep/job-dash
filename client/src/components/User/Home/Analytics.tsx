import React from 'react'
import classes from './user-home.module.css';
import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface analyticsProps{
    dataArr:number[];
}

function Analytics({dataArr}:analyticsProps) {
  return (
    <div className={classes.analytics}>
        <div className={classes.summary_head}>Profile Summary</div>
        <Grid container spacing={2}>
            {
                (CardArr.map(({title,id},ind)=>(
                    <Grid  key={id} size={12/3}>
                        <Card className={classes.card} sx={{bgcolor:'action.hover'}}>
                            <CardHeader title={title}/>
                            <CardContent className={classes.count}>
                                {dataArr[id]}
                            </CardContent>
                        </Card>
                    </Grid>
                )))
            }
        </Grid>
    </div>
  )
}

export default Analytics


const CardArr =[
    {
        id:0,
        title:'Total Applications'
    },
    {
        id:1,
        title:'Companies Explored'
    },
    {
        id:2,
        title:'Selected Applications'
    }
]