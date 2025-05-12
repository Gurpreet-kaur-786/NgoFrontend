
// import './App.css'

import Login from "./pages/login/login.jsx"
import { Routes, Route } from 'react-router-dom'
import Sign from "./pages/signup/signup.jsx"
import Donation from "./pages/Donation/donation.jsx"
import Hero from "./pages/Hero/hero.jsx"

import StudentTable from "./pages/TableDetail/studentTable.jsx"
import TransactionTable from "./pages/TableDetail/transaction.jsx"
import LandingPage from "./pages/userPanel/userHero/LandingPage.jsx"

import Navbar from "./components/Navbar/NavBar.jsx"

import UserNav from "./pages/userPanel/userNav/userNav.jsx"
import AuthContext, { AuthProvider } from "./context/authContext.jsx"
import Donerform from "./pages/DonerForm/Donerform.jsx"
import EditStudentTable from "./pages/TableDetail/editStudentTable.jsx"
import StudentCard from "./components/studentCard/studentCard.jsx"
import DonateCards from "./pages/DonateHereCards/DonateHereCard.jsx"
import Payment from "./pages/userPanel/payment/payment.jsx"
import About from "./pages/AboutPage/About.jsx"
import StudentDescription from "./pages/TableDetail/studentDescriptionTable.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Validation from "./pages/TableDetail/validationTable.jsx"
import Contact from "./pages/contact/contact.jsx"
import Counter from "./pages/userPanel/counter/counter.jsx"
import UpdateStudent from "./pages/UpdatePage/updateStudent.jsx"
import UpdateDonerform from "./pages/UpdatePage/updateDoner.jsx"
import HistoryCard from "./pages/historyCard/historyCard.jsx"
import CardTransaction from "./components/cardTransaction.jsx"
import { useContext } from "react"
import TransactionDetail from "./pages/TableDetail/transactionTable.jsx"
import StudentProfileDetails from "./pages/studentDetail/studentDetail.jsx"

// import AdminMenu from "./menu.jsx"

function App() {

  // const [auth, setAuth] = useState('student')
  const {auth} = useContext(AuthContext)
  

  // useEffect(()=> {
  //   const userDetail = localStorage.getItem("userInfo")
  //   if(userDetail){
  //     const authentication = JSON.parse(userDetail)
  //     // console.log(authentication.authType)
  //     setAuth(authentication.authType)
  //   }
  // }, [auth])

  return (
    <>
      
          {
            auth === "ngoOwner" ? <Navbar /> : <UserNav />
          }
        

        {/* conditional rendering of navigate bar */}
        {/* {auth ==='ngoOwner' ? <Navbar/> : <UserNav/>} */}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/donor" element={<Donation />}></Route>
          <Route path="/admin" element={<Hero />}></Route>
          <Route path="/table" element={<StudentTable />}></Route>
          <Route path="/transaction" element={<TransactionTable />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/donerregister" element={<Donerform/>}></Route>
          <Route path="/editStudent" element={<EditStudentTable/>}></Route>
          <Route path="/studentcard" element={<StudentCard/>}></Route>
          <Route path="/donatecard" element={<DonateCards/>}></Route>
          <Route path="/payment/:id" element={<Payment/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/studentDescription" element={<StudentDescription/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/validate" element={<Validation/>}></Route>
          <Route path="/counter" element={<Counter/>}></Route>
          <Route path="/UpdateStudent/:id" element={<UpdateStudent/>}></Route>
          <Route path="/UpdateDoner/:id" element={<UpdateDonerform/>}></Route>
          <Route path="/historyCard" element={<HistoryCard/>}></Route>
          <Route path="/cardTransaction" element={<CardTransaction/>}></Route>
          <Route path="/transactionTable" element={<TransactionDetail/>}></Route>
          <Route path="/StudentProfileDetails/:id" element={<StudentProfileDetails/>}></Route>
        </Routes>

        </>   
    
  )
}

export default App
