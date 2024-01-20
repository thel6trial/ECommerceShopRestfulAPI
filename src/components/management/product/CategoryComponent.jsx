import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductApi, updateProductApi } from "../api/ProductApiService";
import {Formik, Form, Field} from 'formik'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'
import { createCategoryApi, retrieveCategoryByIdApi, updateCategoryApi } from "../api/CategoryApiService";

export default function CategoryComponent(){

    const {id} = useParams()

    const [categoryName, setCategoryName] = useState('')
    const [categoryCount, setCategoryCount] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retrieveCategories(),
        [id]
    )

    function retrieveCategories(){
        if(id != -1){
            retrieveCategoryByIdApi(id)
              .then(response =>{
                setCategoryName(response.data.categoryName)
                setCategoryCount(response.data.categoryCount)
              })
              .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        const categoryFormDTO = {
            categoryName: values.categoryName,
            categoryCount: values.categoryCount
        }

        if(id == -1){
            createCategoryApi(categoryFormDTO)
            .then(response => {
                navigate('/categories')
            })
        }else{
            updateCategoryApi(id, categoryFormDTO)
            .then(response => {
                navigate('/categories')
            })
        }
    }

    function validate(values) { 
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.categoryName.length < 3){
            errors.description = 'Enter at least 3 characters'
        }

        return errors
    }

    function moveUsers(){
        navigate('/users')
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
					<li><a>Product</a></li>
					<li><a class="active">Add New Product</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
					<li><a onClick={moveUsers}>Users</a></li>
				</ul>				
			</div>
            <div class="content">
            <h3>Add new Category</h3>
				<div class="content-data">
					<div class="content-form">
                <Formik initialValues = {{categoryName, categoryCount}}
                     enableReinitialize = {true}
                     onSubmit={onSubmit}
                     validate = {validate}
                     validateOnChange={false}
                     validateOnBlur={false}  
                >
                    {
                        (pros) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label> Category Name </label>
                                    <Field type="text" className="form-control" name="categoryName" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Category Count </label>
                                    <Field type="text" className="form-control" name="categoryCount" />
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