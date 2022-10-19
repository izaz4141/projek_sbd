import React, { useEffect } from 'react'
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage'
import LandingPage from './Pages/LandingPage'
import Table from './Components/Table'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import DevUserList from './Pages/Devs/DevUserList';
import { NavBar, Footer, SideBar, SetCon, ThemePopup } from './Containers'
import { useStateContext } from './Contexts/ContextProvider';
import './App.css';

const App = () => {
    const { setCurrentColor, setCurrentMode, currentMode, themeSettings, activeMenu } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }
    }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''} >
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <SetCon/>
                <SideBar/>
                <div className={
                    `dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                    activeMenu ? 'md:ml-72' : 'flex-2'}`}>
                    <NavBar/>
                    <div>
                        {themeSettings && (<ThemePopup />)}
                        <Routes>
                            <Route path='/' element={<LandingPage/>}/>
                            <Route path='/home' element={<LandingPage/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/register' element={<RegistrationPage/>}/>
                            <Route path='/dev/user_list' element={<DevUserList/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App;