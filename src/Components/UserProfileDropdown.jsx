import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import httpClient from '../httpClient'

import FuncButton from './FuncButton';
import Button from './Button';
import { userProfileData } from '../Data/dummy';
import { useStateContext } from '../Contexts/ContextProvider';
import avatar from '../Data/avatar_g1.jpg';

const UserProfileDropdown = () => {
  const { currentColor, user } = useStateContext();
  const userButton = `w-2/5 text-white rounded-lg bg-[${currentColor}]`
  console.log(userButton);
  const logoutUser = async () => {
    try {
        await httpClient.post("/logout");
        window.location.href = '/';
    } catch (error) {
        console.log("Not Authorized")
    }
  }
  return (
    <div className="nav-item absolute right-1 top-16 bg-neutral-200 border-2 border-[#42464D] dark:bg-[#42464D] dark:border-zinc-900 pt-4 pb-4 pr-8 pl-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-lg dark:text-gray-200"> {user ? (user.name) : (<>Guest</>) } </p>
          <p className="text-gray-500 text-sm dark:text-gray-400" style={{ color: currentColor }} >  {user ? (user.author_level) : (2) }   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> Campers.co </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        { user ? (
          <FuncButton
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
            customFunc={logoutUser}
          />
        ) : (
          <div className='flex justify-around'>
            <FuncButton
              color="white"
              bgColor={currentColor}
              text="Login"
              borderRadius="10px"
              width="2/5"
              customFunc={() => window.location.href = '/login'}
            />
            <FuncButton
              color="white"
              bgColor={currentColor}
              text="Register"
              borderRadius="10px"
              width="2/5"
              customFunc={() => window.location.href = '/register'}
            />
          </div>
          
        ) }
      </div>
    </div>

  );
};

export default UserProfileDropdown;