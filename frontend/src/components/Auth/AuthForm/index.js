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
    
    const onSubmit = (data) => { // e: event
        console.log("[DEBUG] signup form data: ", data)
        if (data.password1 !== data.password2) {
            // error
        }
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
 


    const onError = (errors, e) => console.log("ERROR", errors);

    watch() // watchAllFields

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
>>>>>>> eda8acaeb3c13aee8a1f559444f71fa5a1b57a54

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
        <Form className="signupForm" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
        <Segment className="signupSegment">
<<<<<<< HEAD
            <label htmlFor="email">email</label>
=======
            {authMode == 'signup' &&
            <>
            <label htmlFor="email">Email</label>
>>>>>>> d924c238ea2e13e29c2e57e6f571d8ee64e49b2d
            <input 
                id="email" 
                name="email" 
                placeholder="Enter email" 
<<<<<<< HEAD
                ref={register({ 
                    required: true,
                    // pattern: {
                    //     value: /S+@S+.S+/,
                    //     message: "Entered value does not match email format"
                    // }
                })} 
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
=======
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
>>>>>>> d924c238ea2e13e29c2e57e6f571d8ee64e49b2d
            
            <label htmlFor="username">username</label>
            <input 
                id="username" 
                name="username" 
                placeholder="Enter username" 
                ref={register({
                    required: true,
                    minLength: {
                        value: 5,
                        message: "min length is 5"
                    }
                })} 
            />
            {errors.username && <span>This field is required</span>}
            
<<<<<<< HEAD
            <label htmlFor="password1">password</label>
            <input id="password1" name="password1" placeholder="Enter password" ref={register({ required: true })} />
            {errors.password1 && <span role="alert">{errors.password1.message}</span>}
            
            <label htmlFor="password2"> Confirm password</label>
            <input id="password2" name="password2" placeholder="Confirm password" ref={register({ required: true })} />
            {errors.password2 && <span>This field is required</span>}
            </Segment>
            <Button type="submit" className="submitButton">Sign Up</Button>
        {/* </form> */}
        </Form>
    )
    
}


export const CreateLoginForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, errors } = useForm()
    // const onSubmit = data => console.log(data)
    
    const onSubmit =(data, e) => { // e: event
        // console.log("[DEBUG] createLoginForm onSubmit data: ", data)
        // dispatch(actionCreators.loginUser(data))
        let dataToForm = new FormData()
        dataToForm.append("username", data.username)
        dataToForm.append("password", data.password)
        dispatch(actionCreators.loginUser(dataToForm))
        // console.log("[DEBUG] createLoginForm onSubmit data: ", data)
        // console.log("[DEBUG] createLoginForm onSubmit dataToForm: ", dataToForm)
    }

    const onError = (errors, e) => console.log(errors, e);
    watch() // watchAllFields

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
         <Segment className="LoginSegment">
            <label htmlFor="username">username</label>
            <input 
                id="username" 
                name="username" 
                placeholder="Enter username" 
                ref={register({
                    required: true,
                    minLength: {
                        value: 5,
                        message: "min length is 5"
                    }
                })} 
            />
            {errors.username && <span>This field is required</span>}

                <label htmlFor="password">password</label>
                <input id="password" name="password" type="password" placeholder="Enter password" ref={register({ required: true })} />
                {errors.password && <span role="alert">{errors.password.message}</span>}
            </Segment>
            <Button type="submit" className="submitButtonLogin">Login</Button>
        </Form>
    )
}
=======
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
>>>>>>> d924c238ea2e13e29c2e57e6f571d8ee64e49b2d
