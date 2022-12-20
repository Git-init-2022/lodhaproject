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
import { useGlobalContext } from "./context/StateContext";
import PrivateRoute from '/src/pages/PrivateRoute/PrivateRoute'
import GeneralNotifications from './pages/GeneralNotifications/GeneralNotifications';
import AllComplaints from './pages/AllComplaints/AllComplaints';
import CreateForm from './pages/CreateForms/CreateForm';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import axios from "axios";
import StaffManagement from './pages/StaffManagement/StaffManagement';
import UserNotification from './pages/UserNotification/UserNotification';
import SocietyDues from './pages/SocietyDues/SocietyDues';
import NoAccessPage from './pages/NoAccessPage/NoAccessPage';

export default function App() {

    //const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
    const { User, setUser } = useGlobalContext();

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={JSON.parse(localStorage.getItem("isAuthenticated")) ? <LoggedHome /> : <Home />} />
                    <Route path='/login' element={<LoginSignUp />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/updatepassword/:token' element={<UpdatePassword />} />
                    <Route path='/NoAccess' element={<NoAccessPage Type="Forbidden" ErrorTitle="Access Forbidden" Status="403"/>} />
                    <Route path="/Home"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<LoggedHome />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/StaffManagement"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<StaffManagement />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/UserProfile"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Profile />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}  />} />

                    <Route path="/AllComplaints"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<AllComplaints />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />

                    {/* <Route path="/Complaints"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Complaints />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />

                    <Route path="/Meeting"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Meeting />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} /> */}
                    <Route path="/Emergency"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Emergency />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    {/* <Route path="/Forms"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<GoogleForms />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/Notifications"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Notifications />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} /> */}
                    <Route path="/KeyContacts"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<KeyContactsAndMails />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/Finance"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<FinanceAndAccount />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/FM"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<FacilityManagement />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>} />
                    <Route path="/HelpDesk"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<HelpDesk />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/Cultural"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<CulturalSection />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/LegalUpdate"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<LegalUpdate />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/UserDashboard"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Dashboard />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    {/* <Route path="/GeneralNotifications"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<Dashboard />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/userNotifications"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<UserNotification />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}  />} /> */}
                    <Route path="/CreateForm"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<CreateForm />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))} />} />
                    <Route path="/SocietyDues"
                        element={<PrivateRoute redirectTo="/NoAccess" component={<SocietyDues />}
                            isAuth={JSON.parse(localStorage.getItem("isAuthenticated"))}/>} />
                    <Route path = "*" element={<NoAccessPage Status="404" ErrorTitle="Page Not Found" Type="Not found"/>} />

                </Routes>
            </Router>
        </>
    )
}

