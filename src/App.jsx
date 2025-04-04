import { useContext, useState } from 'react'
import './App.css'
import Dashboard from './Pages/DashBoard'

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import LoggIn from './Pages/LoggIn'
import SignUp from './Pages/SignUp'
// import ProtectedRoute from './Components/ProtectedRoute'
import { DashBoardContext } from './DashBoardContext/DashBoardContext'
// import CombinationGrid from "./Application/Diamond/Pages/CombinationGrid"
import Error from './Pages/Error'
// import {BusinessInformation} from "./Components/ComponentRoutes"
import { KycDataProvider } from './Application/KYC/KycContext/KycContex'
function App() {
 
const {user, setUser}=useContext(DashBoardContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
       
          <Route path="/" element={user?<Dashboard />:<KycDataProvider><LoggIn /></KycDataProvider>} />
          <Route path="/signup" element={user?<Dashboard />:<SignUp />} />
          <Route path="*" element={<Error />} />
          <Route path='/Dashboard' element={user?<Dashboard />:<KycDataProvider><LoggIn /></KycDataProvider>} />
        
          
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
