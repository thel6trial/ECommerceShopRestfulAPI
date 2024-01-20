import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { createUserApi, retrieveUserByIdApi, updateUserApi } from "../api/UserApiService.js";


export default function UserComponent(){

    const {id} = useParams()

    const [username, setUsername] = useState('')
    const [user_password, setUser_Password] = useState('')
    const [user_birthday, setUser_Birthday] = useState('')
    const [user_phone, setUser_Phone] = useState('')
    const [user_total_payment, setUser_Total_Payment] = useState('')
    const [user_role_name, setUser_Role_Name] = useState('')
    const [user_loyalty_name, setUser_Loyalty_Name] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retrieveUsers(),
        [id]
    )

    function retrieveUsers(){
        if(id != -1){
            retrieveUserByIdApi(id) 
            .then(response => {
                setUsername(response.data.username)
                setUser_Password(response.data.user_password)
                setUser_Birthday(response.data.user_birthday)
                setUser_Phone(response.data.user_phone)
                setUser_Total_Payment(response.data.user_total_payment)
                setUser_Role_Name(response.data?.user_role?.roleName)
                setUser_Loyalty_Name(response.data?.user_loyalty?.loyaltyName)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        const userFormDTO ={
            username: values.username,
            user_password: values.user_password,
            user_birthday: values.user_birthday,
            user_phone: values.user_phone,
            user_total_payment: values.user_total_payment,
            user_role_name: values.user_role_name,
            user_loyalty_name: values.user_loyalty_name
        }

        if(id == -1){
            createUserApi(userFormDTO)
            .then(response => {
                navigate('/users')
            })
        }else{
            updateUserApi(id, userFormDTO)
            .then(response => {
                navigate('/users')
            })
        }
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

        if(values.user_role_name != 'Admin' && values.user_role_name != 'Guest' ){
             errors.user_role_name = 'Role name is not valid'
        }

        if(values.user_loyalty_name != 'Khach hang' && values.user_loyalty_name != 'Admin'){
             errors.user_loyalty_name = 'Loyalty name must be "Khach hang" or "Admin"'
        }

        return errors
    }

    function moveProducts(){
        navigate('/products')
    }

    function movePromotions(){
        navigate('/promotions')
    }

    return (
        <main>
        <div className="main-content">
        <div class="sidebar">
				<h3>Menu</h3>
				<ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html">Home</a></li>
					<li><a  >Users</a></li>
					<li><a class="active">Add new user</a></li>
					<li><a onClick={moveProducts}>Products</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
				</ul>				
			</div>
            <div class="content">
            <h3>Add new User</h3>
				<div class="content-data">
					<div class="content-form">
                <Formik initialValues = {{username, user_password, user_birthday, user_phone, user_total_payment, user_role_name, user_loyalty_name}}
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

                                <fieldset className="form-group">
                                    <label> Total Payment </label>
                                    <Field type="number" className="form-control" name="user_total_payment" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Role Name </label>
                                    <Field type="text" className="form-control" name="user_role_name" />
                                    <ErrorMessage name="user_role_name" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Loyalty Level </label>
                                    <Field type="text" className="form-control" name="user_loyalty_name" />
                                    <ErrorMessage name="user_loyalty_name" component="div" className="error" />
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
            </main>
    )
}