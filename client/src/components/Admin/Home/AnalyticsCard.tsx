import React from 'react'
import classes from './analytic-card.module.css';
import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AnalyticLabelList, DetailsData } from '../../../types/dataTypes';

interface AnalyticsProps{
    data:DetailsData;
    labelList:AnalyticLabelList;
}

function AnalyticsCard({data,labelList}:AnalyticsProps) {
  return (
    <div className={classes.analytics}>
        <div className={classes.summary_head}>Summary</div>
        <Grid container spacing={2}>
            {
                (labelList.map(({title,id},ind)=>(
                    <Grid  key={id} size={12/3}>
                        <Card className={classes.card}>
                            <CardHeader title={title}/>
                            <CardContent className={classes.count}>
                                {data[id]}
                            </CardContent>
                        </Card>
                    </Grid>
                )))
            }
        </Grid>
    </div>
  )
}

export default AnalyticsCard;


