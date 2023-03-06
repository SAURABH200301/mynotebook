import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
  const navigate = useNavigate();
  const [credientials, setCredientials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent the page to reload
    const { name, email, password } = credientials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log("signed up",json.authToken)
    if (json.success) {
      props.showAlert("Account created", "success")
      localStorage.setItem('token', json.authToken)
      navigate("/")
    } else {
      props.showAlert("User With this Credientials already exists", "danger")
    }

  }

  const onChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container' onSubmit={handleSubmit}>
      <h1>SignUp</h1>
      <form >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}
