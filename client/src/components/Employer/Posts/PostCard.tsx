import React from 'react'
import classes from './postcard.module.css'
import { IPost } from '../../../types/dataTypes'
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../../helper/helperFunctions';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import { dateValidation } from '../../../utils/validation';
import { Card } from '@mui/material';


interface PostCardPros{
    data:IPost;
    deletePost:(id:string)=>void;
}

function PostCard({data,deletePost}:PostCardPros) {
  const jobStatus = dateValidation(data.date)[1];
  const statusLabel = jobStatus ? 'expired' : 'active';
  return (
    <Card className={classes.card} >
        <div>
            <div className={classes.date}>{dateFormatter(data.created_at)}</div>
            <div className={classes.heading}><h3>{data.title}</h3>
            {/* <div><Menu/></div> */}
            </div>
            {/* <div>{data.description}</div> */}
            <div className={classes.status}>
              <p>Post Status :</p>
              <p className={classes[statusLabel]}>{statusLabel}</p>
            </div>
        </div>
        <div className={classes.action}>
          <Link to={`${data.post_id}`} className={classes.view} ><ViewIcon/></Link>
          <Link to={`edit/${data.post_id}`} className={classes.edit} ><EditIcon/></Link>
          <div className={classes.del_btn} onClick={()=>deletePost(data.post_id)}><DeleteIcon/></div>
        </div>
    </Card>
  )
}

export default PostCard