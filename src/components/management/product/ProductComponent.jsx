import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductApi, retrieveProductByIdApi, updateProductApi } from "../api/ProductApiService";
import {Formik, Form, Field} from 'formik'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'

export default function ProductComponent(){

    const {id} = useParams()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productStock, setProductStock] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [promotionName, setPromotionName] = useState('')
    const [productImage, setProductImage] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retrieveProducts(),
        [id]
    )

    function retrieveProducts(){
        if(id != -1){
            retrieveProductByIdApi(id)
              .then(response =>{
                setProductName(response.data.productName)
                setProductPrice(response.data.productPrice)
                setProductStock(response.data.productStock)
                setCategoryName(response.data?.category?.categoryName)
                setPromotionName(response.data?.promotion?.promotionName)
                setProductImage(response.data.productImage)
              })
              .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        const productFormDTO = {
            productName: values.productName,
            productPrice: values.productPrice,
            productStock: values.productStock,
            categoryName: values.categoryName,
            promotionName: values.promotionName,
            productImage: values.productImage
        }

        if(id == -1){
            createProductApi(productFormDTO)
            .then(response => {
                navigate('/products')
            })
        }else{
            updateProductApi(id, productFormDTO)
            .then(response => {
                navigate('/products')
            })
        }
    }

    function validate(values) { 
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.productName.length < 3){
            errors.description = 'Enter at least 3 characters'
        }

        if(values.productPrice <= 50000 ){
            errors.targetDate = 'Enter the right price of this product'
        }

        if(values.productStock <= 0){
            errors.targetDate = 'Enter the right stock of this product'
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
            <h3>Add new Product</h3>
				<div class="content-data">
					<div class="content-form">
                <Formik initialValues = {{productName, productPrice, productStock, productImage, categoryName, promotionName}}
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
                                    <label> Product Name </label>
                                    <Field type="text" className="form-control" name="productName" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Product Price </label>
                                    <Field type="text" className="form-control" name="productPrice" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Product Stock </label>
                                    <Field type="number" className="form-control" name="productStock" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Product Image </label>
                                    <Field type="text" className="form-control" name="productImage" />
                                </fieldset>


                                <fieldset className="form-group">
                                    <label> Category Name </label>
                                    <Field type="text" className="form-control" name="categoryName" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Promotion Name </label>
                                    <Field type="text" className="form-control" name="promotionName" />
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