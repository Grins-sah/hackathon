import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

const Home = ()=>{
  return(
    <>
    Home Page
    </>
  )
}

const Account = ()=>{
  return(
    <>
    <div className='h-screen w-screen bg-[#2B2738] p-10 flex'>
      <div className='h-full w-[46%] rounded'>
        <img src="https://thumbs.dreamstime.com/z/female-teacher-standing-front-chalkboard-female-teacher-standing-front-chalkboard-141127451.jpg" alt="" className='h-full w-full cover rounded'/>
      </div>
      <div className='h-full w-1/2 py-10 border-l-2 px-32'>
      <h1 className='text-5xl text-slate-100'>Create  an  account</h1>
      <h1 className='mt-6 text-slate-400'>Already have an account???</h1>
      <form action="" method="post" className='mt-16'>
        <input type="text" name="name" className='w-[40%] h-14 bg-[#3B364C] pl-5 text-slate-100 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='name' />
        <input type="text" name="lastName" className='w-[40%] h-14 ml-4 bg-[#3B364C] pl-5 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='last name'/>
        <input type="email" name="email" className='w-[84%] h-14 bg-[#3B364C] mt-5 pl-5 border-2 runded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='email'/>
        <input type="password" name="password" className='w-[84%] h-14 bg-[#3B364C] mt-5 pl-5 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='password'/>
        <button className='h-14 w-[84%] bg-[#b99dfb] mt-16 rounded'>Create account</button>
      </form>
      </div>
    </div>
    </>
  )
}

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path='/create' element={<Account />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

