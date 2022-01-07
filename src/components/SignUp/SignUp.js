import React, { useState } from 'react';
import validator from 'validator';

const SignUp = () => {
  const [error, setError] = useState(false)
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target 
    setSignUpInput({
      ...signUpInput,
      [name]: value,
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(!validator.isEmail(signUpInput.email)){
      return setError("The email you input is invalid")
    } else if(signUpInput.password.length < 5){
      return setError("The password you entered should contain 5 or more characters")
    } else if(signUpInput.password !== signUpInput.confirmPassword){
      return setError("The passwords don't match. Try again")
    }
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input 
          type="email" 
          id="email" 
          name="email" 
          className="form-control" 
          value={signUpInput.email}
          onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input 
          type="password" 
          id="password" 
          name="password" 
          className="form-control" 
          value={signUpInput.password}
          onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input 
          type="password" confrim
          id="confirmPassword" 
          name="confirmPassword" 
          className="form-control" 
          value={signUpInput.confirmPassword}
          onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button 
        type="submit" 
        className="btn btn-primary"
        onClick={handleClick}
        >Submit</button>
      </form>
    </div>
  );
};

export default SignUp;