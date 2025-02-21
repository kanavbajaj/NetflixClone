import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'

const Login = () => {   

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const user_auth=async(event)=>{
    event.preventDefault();
    if(signState==="Sign In"){
       await login(email,password)
    }
    else{
      await signup(name,email,password)
      }
  }
  const[signState,setSignState]=useState("Sign In")
  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?<input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" placeholder='Your name'/>:<></>}
          <input  value={email} onChange={(event)=>{setEmail(event.target.value)}}type="email" placeholder='Your email'/>
          <input  value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder='password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"?
<p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:
<p>A1ready have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
</div>
      </div>
    </div>
  )
}

export default Login
