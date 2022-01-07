import React from 'react'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';
import SignUp from '../SignUp';

const typeInputForm = ({ email, password, confirmPassword }) => {
  const emailInputEl = screen.getByRole("textbox", {
    name: /email/i
  })
  const passwordInputEl = screen.getByLabelText("Password")
  const confirmPasswordInputEl = screen.getByLabelText("Confirm Password")
  if(email){
    userEvent.type(emailInputEl, email)
  }
  if(password){
    userEvent.type(passwordInputEl, password)
  }
  if(confirmPassword){
    userEvent.type(confirmPasswordInputEl, confirmPassword)
  }
  return {
    emailInputEl,
    passwordInputEl,
    confirmPasswordInputEl
  }
}

const clickSubmitBtn = () => {
  const submitBtnEl = screen.getByRole("button", {
    name: /submit/i
  })
  userEvent.click(submitBtnEl)
}

describe("SignUp", () => {
  beforeEach(() => {
    render(<SignUp />)
  })
  
  test("inputs should be initially empty", () => {
    expect(screen.getByRole("textbox").value).toBe("")
    expect(screen.getByLabelText("Password").value).toBe("")
    expect(screen.getByLabelText("Confirm Password").value).toBe("")
  })
  
  test("should be able to type an email", () => {
    const { emailInputEl } = typeInputForm({ email:"juhee@naver.com" })
    expect(emailInputEl.value).toBe("juhee@naver.com")
  })
  
  test("should be able to type a password", () => {
    const { passwordInputEl } = typeInputForm({ password:"password" })
    expect(passwordInputEl.value).toBe("password")
  })
  
  test("should be able to type a confirm password", () => {
    const { confirmPasswordInputEl } = typeInputForm({ confirmPassword:"password" })
    expect(confirmPasswordInputEl.value).toBe("password")
  })

  describe("Error Handling", () => {
    test("should show email error message on invalid email", () => {
      //return null -->queryByText
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument()
    
      typeInputForm({ email: "juhee.com" })
      clickSubmitBtn()
    
      expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument()
    })
    
    test("should show password error if password is less than 5 characters", () => {
      typeInputForm({ email: "jhuee@naver.com" })
      expect(screen.queryByText(
        /the password you entered should contain 5 or more characters/i
      )).not.toBeInTheDocument()
    
      typeInputForm({ password: "123"})
      clickSubmitBtn()
    
      expect(screen.queryByText(
        /the password you entered should contain 5 or more characters/i
      )).toBeInTheDocument()
    })
    
    test("should show confirm password error if password is don't match", () => {
      typeInputForm({ email: "jhuee@naver.com", password: "123456"})
      expect(screen.queryByText(
        /the passwords don't match. try again/i
      )).not.toBeInTheDocument()
    
      typeInputForm({ confirmPassword: "123"})
      clickSubmitBtn()
      
      expect(screen.queryByText(
        /the passwords don't match. try again/i
      )).toBeInTheDocument()
    })
    
    test("should show no error message if every is valid", () => {
      typeInputForm({
        email: "jhuee@naver.com",
        password: "123456",
        confirmPassword: "123456"
      })
      clickSubmitBtn()
    
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument()
      expect(screen.queryByText(
        /the password you entered should contain 5 or more characters/i
      )).not.toBeInTheDocument()
      expect(screen.queryByText(
        /the passwords don't match. try again/i
      )).not.toBeInTheDocument()
    })  
  })
})

