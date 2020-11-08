import React from 'react'
import { useForm } from 'react-hook-form'
import { Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import './AuthForm.css'
import * as actionCreators from '../../../store/actions/index'
import { useDispatch } from 'react-redux'
// const mapDispatchToProps = dispatch => {
//     return {
//         onSignup: ()
//     }
// }

export const CreateSignupForm = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, watch, errors, reset } = useForm()
    
    const onSubmit =(data, e) => { // e: event
        let dataToForm = new FormData()
        dataToForm.append("username", data.username)
        dataToForm.append("password", data.password1)
        dispatch(actionCreators.loginUser(dataToForm))
        reset()
    }


    const onError = (errors, e) => console.log(errors, e);

    watch() // watchAllFields

    return (
        <Form className="signupForm" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
        <Segment className="signupSegment">
            <label htmlFor="email">email</label>
            <input 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                // ref={register({ 
                //     required: true,
                //     pattern: {
                //         value: /S+@S+.S+/,
                //         message: "Entered value does not match email format"
                //     }
                // })} 
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
            
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
            
            <label htmlFor="password1">password</label>
            <input id="password1" name="password1" placeholder="Enter password" ref={register({ required: true })} />
            {errors.password1 && <span role="alert">{errors.password1.message}</span>}
            
            <label htmlFor="password2"> Confirm password</label>
            <input id="password2" name="password2" placeholder="Confirm password" ref={register({ required: true })} />
            {errors.password2 && <span>This field is required</span>}
            </Segment>
            <Button type="submit" className="submitButton" fluid>Go Submit</Button>
        {/* </form> */}
        </Form>
    )
    
}


export const CreateLoginForm = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    // const onSubmit = data => console.log(data)
    const dispatch = useDispatch()
    const onSubmit =(data, e) => { // e: event
        // console.log(data)
        let dataToForm = new FormData()
        dataToForm.append("username", data.username)
        dataToForm.append("password", data.password)
        dispatch(actionCreators.loginUser(dataToForm))
    }

    const onError = (errors, e) => console.log(errors, e);
    watch() // watchAllFields

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <label htmlFor="email">username</label>
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
            {/* //     id="email" 
            //     name="email" 
            //     placeholder="Enter email" 
            //     ref={register({  */}
            {/* //         required: true,
            //         pattern: { */}
            {/* //             value: /S+@S+.S+/,
            //             message: "Entered value does not match email format"
            //         }
            //     })} 
            // />
            // {errors.email && <span role="alert">{errors.email.message}</span>} */}

            <label htmlFor="password">password</label>
            <input id="password" name="password" placeholder="Enter password" ref={register({ required: true })} />
            {errors.password && <span role="alert">{errors.password.message}</span>}

            <Button type="submit">Go Submit</Button>
        </Form>
    )
}


