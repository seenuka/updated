import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../Config/Firebase'
import { UserState } from '../Context/Context'

function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAlert} =UserState()
  const navigate=useNavigate()
  const handleLogin=async () =>{
   try{
     const result = await signInWithEmailAndPassword(auth,email,password)
     console.log(result)
     setAlert({
       open:true,
       message:`Logged in ,Welcome to GCM ${result.user.email}`,
       type:'success'
     })
     navigate('/home')
   }catch(error){
     setAlert
     ({
       open:true,
       message:error.message,
       type:'error'
     })
    
   }
  }
  function handleSignup(){
    navigate('/signup')
  }
  return (
    <div className='login-fp'>
    <div className="container-s">
    <div className="screen">
      <div className="screen__content">
        <form className="login">
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="text" className="login__input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" className="login__input" value={password} placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button onclick={handleLogin} className="button login__submit">
            <span className="button__text">Log In Now</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>				
        </form>
        <div className="social-login">
          <h3 onClick={handleSignup}>Sign up?</h3>
        </div>
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>		
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
  </div>
  </div>
  )
}

export default Login