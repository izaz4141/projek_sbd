import React, { useState, useEffect } from 'react';
import Chat from '../Components/Chat';
import Notification from '../Components/Notification';
import UserProfileDropdown from '../Components/UserProfileDropdown';
import { useStateContext } from '../Contexts/ContextProvider';
import SearchBar from '../Components/SearchBar';
import Tooltip from '@mui/material/Tooltip';
import httpClient from '../httpClient'

import {AiOutlineMenu} from 'react-icons/ai';
import {BsChatLeft} from 'react-icons/bs';
import {RiNotification3Line} from 'react-icons/ri';
import {MdKeyboardArrowDown} from 'react-icons/md';
import avatar_g1 from '../Data/avatar_g1.jpg';



const NavBar = () => {
    const {activeMenu, setActiveMenu, handleClick, isClicked, currentColor, user } = useStateContext();
    const [userlist, setUserlist] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                if (user?.author_level === 0 ) {
                    const ulis = await httpClient.post("/dev/user_list", {
                        author_level: user.author_level
                    });
                    setUserlist(ulis.data);
                };
            } catch (error) {
                console.log(error)
            }
        })();
    }, [user]);

    return (
        <div className='fixed md:static 
        bg-slate-200 dark:bg-main-dark-bg 
        navbar w-full'>
            <div className='grid grid-cols-3 relative md:mx-6 top-0'>
                <div className='flex justify-start relative'>
                    <NavButton title='Menu' 
                    customFunc={() => setActiveMenu(!activeMenu)} 
                    color={currentColor} 
                    icon={<AiOutlineMenu/>} />
                </div>
                <div className='flex justify-center items-center'>
                    <SearchBar placeHolder='Search...' searchClass='w-72 h-6 pl-8 pr-2' inputClass='text-lg' data={userlist} />
                </div>
                <div className='flex justify-end'>

                    <NavButton title='Chat' 
                    dotColor= '#03C9D7'
                    customFunc={() => handleClick('chat')} 
                    color={currentColor} 
                    icon={<BsChatLeft/>} />

                    <NavButton title='Notifications' 
                    dotColor= '#03C9D7'
                    customFunc={() => handleClick('notification')} 
                    color={currentColor}  
                    icon={<RiNotification3Line/>} />

                    <Tooltip title='Profile' placement='bottom'>
                        <div
                        className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' 
                        onClick={() => handleClick('userProfile')}>
                            <img src={avatar_g1} alt='user-profile'
                            className='rounded-full w-8 h-8' />
                            <p>
                                <span className='text-gray-400 text-14'>Hi, </span> {' '}
                                {user ? (<span className='text-gray-400 font-bold ml-1 text-14'>{user.name}!</span>
                                ) : (<span className='text-gray-400 font-bold ml-1 text-14'>Guest!</span>)}
                            </p>
                            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
                        </div>
                    </Tooltip>

                    {isClicked.chat && <Chat/>}
                    {isClicked.notification && <Notification/>}
                    {isClicked.userProfile && <UserProfileDropdown/>}

                </div>
            </div>
            
        </div>
    )
}

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <Tooltip title={title} placement='bottom'>
        <button type='button' onClick={customFunc} style={{ color }}
        className='relative text-xl rounded-full p-3 hover:bg-light-gray' >
            <span style={{ background: dotColor }}
            className='absolute inline-flex rounded-full h-2 w-2 top-2 right-2' />
            {icon}
        </button>
    </Tooltip>
)

export default NavBar;