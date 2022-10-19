import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const ChildBar = ({links}) => {
    return (
        <div className='mt-10'>
            {links?.map((item) => (
                <div key={item.title}>
                    <TreeNode node={item}/>
                </div>
            ))}
        </div>
    )
}

const TreeNode = ({node}) => {
    const {currentColor} = useStateContext();
    const activeLink = 'text-white flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md';
    const normalLink = 'dark:text-gray-200 dark:hover:text-black hover:bg-light-gray flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md';
    const [childVisible, setChildVisible] = useState(false);
    const hasChild = node.children ? true : false;

    return (
        <>  
            <div className='bg-slate-800 pb-4 rounded-xl items-center' >
                <div className='flex  text-gray-400 uppercase mt-4 items-center justify-between bg-slate-900 hover:outline-1 hover:outline-white hover:outline hover:text-white pl-5 py-3 pr-2 rounded-xl'
                onClick={() => setChildVisible(!childVisible)} >
                    <p>{node.title}  </p>
                    {childVisible ? (<BsChevronUp />) : (<BsChevronDown />)}
                </div>
                <div className='ml-2'>
                    {hasChild && childVisible && (node.children.map((link) => (
                    <NavLink to={`/${link.url}`} key={`${link.name}`} onClick={{HandleCloseSideBar}}
                    style={({ isActive }) => ({backgroundColor: isActive ? currentColor : '', color: isActive ? '' : currentColor, })}
                    className={({ isActive }) => isActive ? activeLink : normalLink}>
                        {link.icon}
                        <span className='capitalize'>
                            {link.name}
                        </span>
                    </NavLink>
                    )))}
                </div>
            </div>
            
        </>
    )
}

const HandleCloseSideBar = () => {
    const {activeMenu, screenSize, setActiveMenu} = useStateContext();
    if (activeMenu !== undefined && screenSize <= 900) {
        setActiveMenu(false);
    }
};

export default ChildBar;