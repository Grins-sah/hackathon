import React, { useRef } from 'react'
import z from 'zod'
import axios from 'axios'
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
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const userObj = z.object({
    username:z.string().min(3).max(10),
    email: z.string().includes('@'),
    password:z.string().min(5).max(20)

  })



  const img = "https://cdn1.vectorstock.com/i/1000x1000/90/75/african-american-female-teacher-at-classroom-near-vector-46149075.jpg"
  return(
    <>
    <div className='h-screen w-screen bg-[#2B2738] p-10 flex'>
      <div className='h-full w-[46%] rounded'>
        <img src="/teacher.jpg" alt="" className='h-full w-full overflow:hidden contain rounded'/>
      </div>
      <div className='h-full w-1/2 py-10 border-l-2 px-32 border-[#b99dfb]'>
      <h1 className='text-5xl text-slate-100 font-bold'>Create  an  account</h1>
      <h1 className='mt-6 text-slate-400'>Already have an account??? <a href="/login" className='text-[#b99dfb] ml-5'>login</a></h1>
      <form action="" method="post" className='mt-16'>
        <input ref={nameRef} type="text" name="name" className='w-[40%] h-14 bg-[#3B364C] pl-5 text-slate-100 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='name' />
        <input ref={lastNameRef} type="text" name="lastName" className='w-[40%] h-14 ml-4 bg-[#3B364C] pl-5 text-slate-100 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='last name'/>
        <input ref={emailRef} type="email" name="email" className='w-[84%] h-14 bg-[#3B364C] mt-5 pl-5 text-slate-100 border-2 runded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='email'/>
        <input ref={passRef} type="password" name="password" className='w-[84%] h-14 bg-[#3B364C] mt-5 pl-5 text-slate-100 border-2 rounded border-[#3B364C] focus:border-[#9482BF] hover:border-[#9482BF]' placeholder='password'/>
        <button className='h-14 w-[84%] bg-[#b99dfb] mt-16 rounded hover:bg-[#b08eff]' onClick={async ()=>{
            const userData ={
              username:nameRef.current.value+" "+lastNameRef.current.value,
              email:emailRef.current.value,
              password:passRef.current.value
            }
          const result = await userObj.safeParseAsync();
          console.log(result);
          if(result.success){
            axios.post("http://localhost:3000/signup",userData)
          }
        
        }}>Create account</button>
      </form>
      </div>
    </div>
    </>
  )
}

const Login = ()=>{
  return(
    <>
    Login page
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
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

