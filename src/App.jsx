import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import Complaints from './pages/Complaints/Complaints'
import Notifications from './pages/Notifications/Notifications'
import Home from './pages/Home/Home'
import Meeting from './pages/Meeting/Meeting'
import GoogleForms from './pages/GoogleForms/GoogleForms'
import Emergency from './pages/Emergency/Emergency'
import NavBar from '/src/components/NavBar/NavBar'
import KeyContactsAndMails from './pages/KeyContactsAndMails/KeyContactsAndMails'
import LoginSignUp from './pages/User/LoginSignUp'
import FacilityManagement from './pages/FacilityManagement/FacilityManagement'
import FinanceAndAccount from './pages/FinanceAndAccount/FinanceAndAccount'
import HelpDesk from './pages/HelpDesk/HelpDesk'
import CulturalSection from './pages/CulturalSection/CulturalSection'
import LegalUpdate from './pages/LegalUpdate/LegalUpdate'
import LoginNavBar from './components/LoginNavBar/LoginNavBar';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import LoggedHome from './pages/LoggedHome/LoggedHome'
import {useGlobalContext} from "./context/StateContext";
import PrivateRoute from '/src/pages/PrivateRoute/PrivateRoute'
import GeneralNotifications from './pages/GeneralNotifications/GeneralNotifications';

export default function App() {

  const {isAuthenticated, setIsAuthenticated} = useGlobalContext();
  useEffect(()=>{
    setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")));

  },[isAuthenticated,JSON.parse(localStorage.getItem("isAuthenticated"))])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login'element={<LoginSignUp/>}/>
          <Route path="/Home"
              element = {<PrivateRoute redirectTo="/login" component={<LoggedHome/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          
          <Route path="/UserProfile"
              element = {<PrivateRoute redirectTo="/login" component={<Profile/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />

          <Route path="/Complaints"
              element = {<PrivateRoute redirectTo="/login" component={<Complaints/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />

          <Route path="/Meeting"
              element = {<PrivateRoute redirectTo="/login" component={<Meeting/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/Emergency"
              element = {<PrivateRoute redirectTo="/login" component={<Emergency/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/Forms"
              element = {<PrivateRoute redirectTo="/login" component={<GoogleForms/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/Notifications"
              element = {<PrivateRoute redirectTo="/login" component={<Notifications/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/KeyContacts"
              element = {<PrivateRoute redirectTo="/login" component={<KeyContactsAndMails/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/Finance"
              element = {<PrivateRoute redirectTo="/login" component={<FinanceAndAccount/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/FM"
              element = {<PrivateRoute redirectTo="/login" component={<FacilityManagement/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/HelpDesk"
              element = {<PrivateRoute redirectTo="/login" component={<HelpDesk/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/Cultural"
              element = {<PrivateRoute redirectTo="/login" component={<CulturalSection/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/LegalUpdate"
              element = {<PrivateRoute redirectTo="/login" component={<LegalUpdate/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
          <Route path="/UserDashboard"
              element = {<PrivateRoute redirectTo="/login" component={<Dashboard/>} 
              isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>  } />
        </Routes>
      </Router>
    </>
  )
}

