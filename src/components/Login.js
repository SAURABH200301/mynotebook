import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LOGIN from '../images/login.jpg'

export const Login = (props) => {
  const [credientials, setCredientials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent the page to reload
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credientials.email, password: credientials.password })
    });
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/")
      props.showAlert("Login Successfully", "success");
    } else {
      props.showAlert("Invalid Credientials", "danger");
    }
  }

  const onChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value })
  }
  return (
    <div className='conatiner'>
      <h2>Login to Note</h2>
      <div className='conatiner d-flex'>
        <div className='w-50'>
          <img src={LOGIN} alt='login profile' />
        </div>
        <form onSubmit={handleSubmit} className='w-50'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control " id="email" value={credientials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credientials.password} onChange={onChange} name="password" />
          </div>

          <button type="submit" className="btn btn-outline-primary" >Login</button>
        </form>
      </div>
    </div>
  )
}
