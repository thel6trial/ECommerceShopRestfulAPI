import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { createPromotionApi, retrievePromotionByIDApi, updatePromotionApi } from "../api/PromotionApiService";


export default function PromotionComponent(){

    const {promotionID} = useParams()
    const promotionIDint = parseInt(promotionID)

    const [promotionName, setPromotionName] = useState('')
    const [promotionCode, setPromotionCode] = useState('')
    const [promotionType, setPromotionType] = useState('')
    const [promotionNumber, setPromotionNumber] = useState(0)
    const [promotionCount, setPromotionCount] = useState(0)
    const [loyaltyName, setLoyaltyName] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retrievePromotion(),
        [promotionIDint]
    )

    function retrievePromotion(){
        if(promotionID != -1){
            retrievePromotionByIDApi(promotionIDint)
              .then(response =>{
                setPromotionName(response.data.promotionName)
                setPromotionCode(response.data.promotionCode)
                setPromotionType(response.data.promotionType)
                setPromotionNumber(parseInt(response.data.promotionNumber))
                setPromotionCount(parseInt(response.data.promotionCount))
                setLoyaltyName(response.data?.user_loyalty?.loyaltyName)
              })
              .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        const promotionFormDTO = {
            promotionName: values.promotionName,
            promotionCode: values.promotionCode,
            promotionType: values.promotionType,
            promotionNumber: values.promotionNumber,
            promotionCount: values.promotionCount,
            loyaltyName: values.loyaltyName
        }

        if(promotionID == -1){
            createPromotionApi(promotionFormDTO)
            .then(response => {
                navigate('/promotions')
            })
        }else{
            updatePromotionApi(promotionIDint, promotionFormDTO)
            .then(response => {
                navigate('/promotions')
            })
        }
    }

    function validate(values) { 
        let errors = {
        }

        if(values.promotionName.length < 5){
            errors.promotionName = 'Enter at least 5 characters'
        }

        if(values.promotionCode.length < 3 ){
            errors.promotionCode = 'Enter at least 3 characters'
        }

        if(values.promotionType != 'Discount' && values.promotionType != 'Minus'){
            errors.promotionType = 'This promotion type is not valid'
        }

        return errors
    }

    function moveProducts(){
        navigate('/products')
    }

    function moveUser(){
        navigate('/users')
    }

    return (
        <main>
        <div className="main-content">
        <div class="sidebar">
				<h3>Menu</h3>
				<ul>
                <li><a href="index.html">Home</a></li>
					<li><a >Promotion</a></li>
					<li><a class="active">Add new Promotion</a></li>
					<li><a onClick={moveProducts}>Products</a></li>
					<li><a onClick={moveUser}>Users</a></li>
				</ul>				
			</div>
            <div class="content">
            <h3>Add new Promotion</h3>
				<div class="content-data">
					<div class="content-form">
                <Formik initialValues = {{promotionName, promotionCode, promotionType, promotionNumber, promotionCount, loyaltyName}}
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
                                    <label> Promotion Name </label>
                                    <Field type="text" className="form-control" name="promotionName" />
                                    <ErrorMessage name="promotionName" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Promotion Code </label>
                                    <Field type="text" className="form-control" name="promotionCode" />
                                    <ErrorMessage name="promotionCode" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Promotion Type </label>
                                    <Field type="text" className="form-control" name="promotionType" />
                                    <ErrorMessage name="promotionType" component="div" className="error" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Promotion Number</label>
                                    <Field type="number" className="form-control" name="promotionNumber" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Promotion Count</label>
                                    <Field type="number" className="form-control" name="promotionCount" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label> Loyalty Name </label>
                                    <Field type="text" className="form-control" name="loyaltyName" />
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