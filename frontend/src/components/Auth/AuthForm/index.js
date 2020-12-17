import React from 'react'
import { useForm } from 'react-hook-form'
import { Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import './AuthForm.css'
import * as actionCreators from '../../../store/actions'
import { useDispatch } from 'react-redux'
import isEmail from 'validator/lib/isEmail';
import axios from 'axios'
import { closeModal } from '../../../store/actions'

// const mapDispatchToProps = dispatch => {
//     return {
//         onSignup: ()
//     }
// }

/*
 * WARNING: the order of declarations of React hooks in CreateSignupForm and CreateLoginForm should be consistent
 * For example, if useDispatch() is declared at the top CreateSignupForm, the same must be true in CreateLoginForm
 * Remember that orders matter in React Hooks
 */ 


export const CreateAuthForm = authMode => {
    const dispatch = useDispatch()

    const { register, handleSubmit, watch, errors, reset } = useForm()
    
    const onSubmit = (data, e) => { // e: event
        e.preventDefault()
        let dataToForm = new FormData()
        if (authMode == 'signup') {
            dataToForm.append("username", data.username)
            dataToForm.append("password", data.password)
            dataToForm.append("email", data.email)
            dispatch(actionCreators.signupUser(dataToForm))
        }
        else {
            dataToForm.append("username", data.username)
            dataToForm.append("password", data.password)
            dispatch(actionCreators.loginUser(dataToForm))

        }
        reset()
        dispatch(closeModal())
    }

    const validateEmail = async input => {
        if (isEmail(input)) {
            let formData = new FormData()
            formData.append('email', input)
            const res = await axios.post('/api/v1/users/check_email/', formData, {
                headers: { "Content-Type": "multipart/form-data" } 
            })
    
            if (res.data === true) {
                return true
            } else {
                // email already exists
                return "Email already exists"
            }
        } else {
            return "Not valid email pattern"
        }
    }

    const validateUsername = async input => {
        // check that username already exists
        // return true if already exists, false otherwise
        let formData = new FormData()
        formData.append('username', input)
        const res = await axios.post('/api/v1/users/check_username/', formData, {
            headers: { "Content-Type": "multipart/form-data" } 
        })
        if (res.data === true) {
            // username already exists
            return authMode == 'signup' ? "Username already exists" : true
        } else {
            return authMode == 'signup' ? true : "Username does not exist"
        }
    }

    const validatePassword = async input => {
        if (authMode == 'signup') return true

        let formData = new FormData()
        formData.append('username', username_current)
        formData.append('password', input)

        const res = await axios.post('/api/v1/users/check_password/', formData, {
            headers: { "Content-Type": "multipart/form-data" } 
        })

        return res.data === true ? true : "Incorrect password"
    }

    const username_current = watch("username", "")
    const password_current = watch("password", "")

    const required = "This field is required"

    const errorMessage = error => <div className="invalid-feedback">{error}</div>

    return (
        <Form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
        <Segment className="signupSegment">
            {authMode == 'signup' &&
            <>
            <label htmlFor="email">Email</label>
            <input 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                ref={register({
                    required: required, 
                    validate: validateEmail
                    }
                )}
                style={{ borderColor: errors.email && "red" }} 
            />
            {errors.email && errorMessage(errors.email.message)}
            </>
            }
            
            <label htmlFor="username">Username</label>
            <input 
                id="username" 
                name="username" 
                placeholder="Enter username" 
                ref={register({
                    required: required,
                    minLength: {
                        value: 5,
                        message: "min length is 5"
                    },
                    validate: validateUsername
                })}
                style={{ borderColor: errors.username && "red" }}  
            />
            {errors.username && errorMessage(errors.username.message)}
            
            <label htmlFor="password">Password</label>
            <input 
                id="password" 
                name="password"
                type="password" 
                placeholder="Enter password" 
                ref={register({ 
                        required: required,
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters"
                        },
                        validate: validatePassword
                    })
                } 
                style={{ borderColor: errors.password && "red" }}
            />
            {errors.password && errorMessage(errors.password.message)}
            
            {authMode == 'signup' &&
            <>
            <label htmlFor="password_confirm">Confirm password</label>
            <input 
                id="password_confirm" 
                name="password_confirm"
                type="password" 
                placeholder="Confirm password" 
                ref={register({ 
                        required: required,
                        validate: value => value === password_current || "The passwords do not match"
                    })
                } 
                style={{ borderColor: errors.password_confirm && "red" }}
            />
            {errors.password_confirm && errorMessage(errors.password_confirm.message)}
            
            </>}
            </Segment>
            <Button type="submit" className="submitButton">
                {authMode == 'signup' ? 'Sign Up' : 'Log In'}
            </Button>
        </Form> 
    )
    
}