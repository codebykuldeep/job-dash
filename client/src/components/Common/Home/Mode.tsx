import React from 'react'
import { createPortal } from 'react-dom'
import ModeButton from './ModeButton'

function Mode() {
  return (
    <>
    {createPortal(<ModeButton/>,document.getElementById('mode')!)}
    </>
  )
}

export default Mode