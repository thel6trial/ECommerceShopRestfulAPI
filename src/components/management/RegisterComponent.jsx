import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { createUserApi, registerUserApi } from "./api/UserApiService";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/styles.css'
import imglogin from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/img-login.svg'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/scss/styles.scss'

export default function RegisterComponent(){

    const [username, setUsername] = useState('')
    const [user_password, setUser_Password] = useState('')
    const [user_birthday, setUser_Birthday] = useState('')
    const [user_phone, setUser_Phone] = useState('')

    const navigate = useNavigate()

    function onSubmit(values){
        const registerFormDTO ={
            username: values.username,
            user_password: values.user_password,
            user_birthday: values.user_birthday,
            user_phone: values.user_phone
        }

        registerUserApi(registerFormDTO)
            .then(response => {
                navigate('/login')
        })
    }

    function validate(values) { 
        let errors = {
         
        }

        if(values.username.length < 3){
            errors.username = 'Enter at least 3 characters'
        }

        if(values.user_password.length < 5 ){
            errors.user_password = 'Enter at least 5 characters'
        }

        return errors
    }

    return (
        <div class="login">
            <div class="login__content">
                <div class="login__img">
                    <img src={imglogin} alt=""/>
                </div>
        <div className="container">
            <h1>Enter User Details</h1>
            <div>
                <Formik initialValues = {{username, user_password, user_birthday, user_phone}}
                     enableReinitialize = {true}
                     onSubmit={onSubmit}
                     validate={validate}
                     validateOnChange={false}
                     validateOnBlur={false}  
                >
                    {
                        (pros) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>  Username </label>
                                    <Field type="text" className="form-control" name="username" />
                                    <ErrorMessage name="username" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Password </label>
                                    <Field type="text" className="form-control" name="user_password" />
                                    <ErrorMessage name="user_password" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Birthday </label>
                                    <Field type="text" className="form-control" name="user_birthday" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Phone Number </label>
                                    <Field type="text" className="form-control" name="user_phone" />
                                </fieldset>

                                <div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>

                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
        </div>
        </div>
    )
}