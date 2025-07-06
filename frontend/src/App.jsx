
import './App.css'
import { Routes,Route} from 'react-router-dom'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import OrgSignup from './pages/OrgSignup'
import OrgLogin from './pages/OrgLogin'
import HomePage from './pages/HomePage'
function App() {
  

  return (
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/orgsignup' element={<OrgSignup/>}></Route>
    <Route path='/orglogin' element={<OrgLogin/>}></Route>
   </Routes>
  )
}

export default App
