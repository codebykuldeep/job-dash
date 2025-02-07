import { Stack, Switch, useColorScheme } from '@mui/material';
import React, { useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';

function ModeButton() {
    const {mode,setMode} = useColorScheme();
    const [open,setOpen] = useState(false);
    const [checked,setChecked] = useState(mode === 'dark' ? true : false);
    if(!mode)
        return null;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
        
        if(checked){
            setMode('dark');
        }
        else{
            setMode('light')
        }
        setChecked(checked);
        handleOpen();
    }

    function handleOpen(){
        setOpen(prev=>!prev);
    }
  return (
    <>
            <div className='mode-button'>
                <Stack direction={'row'} alignItems={'center'} className='change-mode'>
                    <button onClick={handleOpen} className='arrow_mode_button' data-testid='mode-button'>
                        {open ? (<ArrowForwardIcon />) : (<ArrowBackIcon/>)}
                    </button>
                    {
                        open && (
                            <>
                                <WbSunnyIcon sx={{color:'#f39c12'}}/>
                                <Switch onChange={handleChange}  checked={checked}/>
                                <DarkModeIcon sx={{color:'#848888'}}/>
                            </>
                        )
                    }
                </Stack>
            </div>
    </>
  );
}

export default ModeButton