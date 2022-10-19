import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md'
import { FaCampground } from 'react-icons/fa'
import { useStateContext } from '../Contexts/ContextProvider';
import ChildBar from '../Components/ChildBar';
import Tooltip from '@mui/material/Tooltip';

import { links } from '../Data/dummy';

const SideBar = () => {
    const { activeMenu, setActiveMenu, user, screenSize, setScreenSize, currentColor } = useStateContext();
    const [datatree, setDataTree] = useState(null);
    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
          setActiveMenu(false);
        }
    };

    useEffect(() => {
        
        if (!user) {
            setDataTree(links.filter(el => el.title !== 'DevTools'));
            console.log('no_user');
        } else if (user.author_level !== 0) {
            setDataTree(links.filter(el => el.title !== 'DevTools'));
            console.log('no_authorization');
        };
        
    }, []);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
      if (screenSize <= 900) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      };
    }, [screenSize])
    
    

    return (
        <>
            { activeMenu ? (
                <div className='w-72 fixed sidebar
                    dark:bg-secondary-dark-bg
                    bg-slate-200 border-r-2 border-zinc-900'>
                    <div className='h-screen 
                        md:overflow-hidden overflow-auto
                        md:hover:overflow-auto pb-10'>
                        {activeMenu && (
                        <>
                            <div className='ml-3 flex justify-between items-center'>
                                <Link to='/' onClick={handleCloseSideBar} 
                                className='items-center gap-3 ml-3 mt-4 flex text-xl 
                                font-extrabold tracking-tight dark:text-white text-slate-900' >
                                    <FaCampground/>
                                    <span>Campers</span>
                                </Link>
                                <Tooltip title='Menu' placement='bottom'>
                                    <button type='button' onClick={() => setActiveMenu(!activeMenu)}
                                    className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
                                    style={{color: currentColor}}>
                                        <MdOutlineCancel/>
                                    </button>
                                </Tooltip>
                            </div>
                            <ChildBar links={datatree}/>
                        </>)}
                    </div>
                </div>
            ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'></div>
            )}
        </>
    )
}

export default SideBar;