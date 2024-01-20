import { useEffect, useState } from "react";
import { cartApi, checkOutApi } from "../api/OrderApiService";
import { useNavigate } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { retrievePromotionByCodeApi } from "../api/PromotionApiService";

import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'

export default function CartComponent(){

    const [order_products, setOrder_products] = useState([])

    const [orderPay, setOrderPay] = useState('')
    const [orderDiscountCode, setOrderDiscountCode] = useState('')
    
    
    const [showDiscount, setShowDiscount] = useState(false)

    useEffect( () => retrieveOrder_Products() )
    const navigate = useNavigate()

    function retrieveOrder_Products(){
        cartApi()
        .then(response =>{
            setOrder_products(response.data)
        })
        .catch( error => console.log(error))
    }

    function CheckoutOrder(values){
        const orderFormDTO = {
            orderPay: values.orderPay,
            orderDiscountCode: values.orderDiscountCode || ''
        }

        checkOutApi(orderFormDTO)
        .then( response => {
            const userID = response.data.user?.userID
            navigate(`/confirm/${userID}`)
        })
    }

    let total = 0

    order_products.forEach( (order_product) => {
        const productPrice = parseInt(order_product.product?.productPrice);
        const quantity = order_product.quantity
        total += productPrice * quantity
    });

    function backToMain(){
        navigate('/main')
    }

    function Discount(promotionCode) {
        const promotionCodeRequestDTO = {
          promotionCode: promotionCode
        };
      
        retrievePromotionByCodeApi(promotionCodeRequestDTO)
          .then(response => {
            setShowDiscount(!showDiscount);
            const discountValue = total * parseInt(response.data.promotionNumber) / 100;
            const afterDiscountValue = total - discountValue;
            setDiscount(discountValue);
            setAfterDiscount(afterDiscountValue);
          })
          .catch(error => {
            console.log(error);
            setDiscount(0);
            setAfterDiscount(0);
          });
      }
      
      const [discount, setDiscount] = useState(0);
      const [afterDiscount, setAfterDiscount] = useState(0);

    return (
        <div class="container">
		<main>
			<div class="breadcrumb">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li> / </li>
					<li><a href="shop.html">Shop</a></li>
					<li> / </li>
					<li>Cart</li>
				</ul>
			</div> 

			<h2>Shopping Cart</h2>
			<div class="cart-page">
				<div class="cart-items">					
					<table>
						<thead>
							<tr>
								<th colspan="3">Cart Items</th>
							</tr>
						</thead>
						<tbody>
							{order_products.map((order_product, index) => (
							<tr key={order_product.id}>
								<td style={{width: "20%"}}><img src={order_product?.product?.productImage}/></td>
								<td style={{width: "60%"}}>
									<h2>{order_product?.product?.productName}</h2>
									<p>{order_product?.product?.category?.categoryName}</p>
									<br/>
									<h3>{order_product.product?.productPrice}</h3>
									<br />
									<a href="">x</a> Remove
								</td>
								<td class="qty" style={{width: "15%"}}>
									<h3>{order_product.quantity}</h3>
									<br></br>
									<h3>{order_product.product?.productPrice * order_product.quantity}</h3>
								</td>
							</tr>
							))}				
						</tbody>	
					</table>
					<div class="pagination">
						<ul>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
						</ul>
					</div>
				</div>
				<div class="cart-summary">
					<div class="checkout-total">
						
						<ul>
							<hr />
							<li>Cart Total <span style={{float: "right"}}>{total}</span></li>
							<Formik initialValues = {{orderDiscountCode}}
                     enableReinitialize = {true}
                     onSubmit={values => {
                        if (total === 0) {
                          // Ngăn chặn hành động onSubmit khi total = 0
                          return;
                        }
                        CheckoutOrder(values);
                      }}
                     validateOnChange={false}
                     validateOnBlur={false}  
                >
                    {
                        (pros) => (
                            <Form>

                                <fieldset className="form-group">
                                    <label> Name of promotion code </label>
                                    <Field type="text" className="form-control" name="orderDiscountCode" />
                                </fieldset>

                                <button className="btn btn-success" type="button" onClick={() => Discount(pros.values.orderDiscountCode)}>Show Discount</button>
                                {showDiscount && (
                                    <div className="container">
                                        <div className="">Discount: {discount}</div>
                                        <div className="">Price after discount: {afterDiscount}</div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label></label>
                                    <Field as="select" className="form-control" name="orderPay">
                                        <option value="">Select Pay Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                    </Field>
                                </div>

                                {total === 0 && <div>Your cart is empty</div>}
                
                                <div>
                                    <button className="btn btn-primary btn-md" type="submit"><i
                            class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Thanh toán</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
						</ul>
					</div>
				</div>
			</div>	
			<a class="btn btn-warning btn-md" onClick={backToMain} style={{marginTop: "40px"}}><i class="fa fa-arrow-left"
				aria-hidden="true"></i>&nbsp;Quay
			về trang chủ</a>	
		</main> 
	</div>
    )
}