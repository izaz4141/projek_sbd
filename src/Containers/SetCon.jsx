import React from 'react'
import { FiSettings } from 'react-icons/fi'
import Tooltip from '@mui/material/Tooltip';
import { useStateContext } from '../Contexts/ContextProvider';

const SetCon = () => {
  const {setThemeSettings, currentColor} = useStateContext();
  return (
    <div className='fixed right-4 bottom-4' style={{ zindex: '1000'}}>
        <Tooltip title='Settings' placement= 'top'>
          <button type='button'
          onClick={() => setThemeSettings(true)}
          className='text-3x1 p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
          style={{ backgroundColor: currentColor, borderRadius: '50%' }}>
            <FiSettings/>
          </button>
        </Tooltip>
    </div>
  )
}

export default SetCon;