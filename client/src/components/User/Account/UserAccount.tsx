import React, { useState } from 'react'
import classes from './user-account.module.css';
import defaultUser from '../../../assets/dummy-user.jpg'
import { Box, Container, useColorScheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Profile from './Profile';
import EditPage from './EditPage/EditPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Settings from './Settings';

function UserAccount() {
    const {mode} =useColorScheme()
    const user = useSelector((state:RootState)=>state.userSlice.user);
    const [ query,setQuery] = useSearchParams();
    const [selected,setSelected] = useState(query.get('view') || 'profile')
    const view = query.get('view');
    function handleView(event:React.MouseEvent<HTMLInputElement>){
        let value = (event.target as HTMLInputElement).value ;
        if(value){
            setQuery({view:value})
            setSelected(value);
        }
    }
  return (
    <Box className={classes.container} sx={{bgcolor: mode==='dark' ? '#202020' : 'var(--dull-bg)'}}>
        <Container maxWidth={'md'}  className={classes.profile} sx={{color:'text.primary'}}>
            <div className={classes.image}><img src={user!.image || defaultUser} alt="default user" /></div>
            <div className={classes.detail}>
                <h2>{user!.name}</h2>
                <p>{user!.email}</p>
            </div>
        </Container>
        <Container maxWidth={'md'} className={classes.content} sx={{color:'text.primary',bgcolor:mode === 'dark' ? '#202020': 'white'}}>
            <div className={classes.btn} onClick={handleView}>
                
                {
                    button.map(({value,label})=>(
                        <button key={value} value={value} className={selected === value ? classes.op : undefined}>{label}</button>
                    ))
                }
            </div>
            <Box className={classes.view}>
                {view  !== 'update' && view  !== 'setting' && <Profile user={user!}/>}
                {view  === 'setting' && <Settings/>}
                {view  === 'update' && <EditPage/>}
            </Box>
        </Container>
    </Box>
  )
}

export default UserAccount

const button =[
    {
        value:'profile',
        label:'Profile'
    },
    {
        value:'update',
        label:'Update Details'
    },
    {
        value:'setting',
        label:'Settings'
    },
]



/*

<div className={classes.container}>
        <div className={classes.section}>
            <div className={classes.header}>
                <h3>Account</h3>
            </div>
            <div className={classes.account}>
                <div className={classes.action}>Options</div>
                <div className={classes.content}>Content</div>
            </div>
        </div>
    </div>

*/