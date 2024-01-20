import { useParams } from "react-router-dom";
import { retrieveOrderByIdApi, retrieveOrderProductByIdApi } from "../api/OrderApiService";
import { useEffect, useState } from "react";
import img5 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img5.jpg'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'

export default function OrderDetail(){
    const {orderID} = useParams()
    const [order, setOrder] = useState([])
    const [orderProducts, setOrderProducts] = useState([])

    useEffect( () => retrieveOrderByID(), [orderID])
    useEffect( () => refreshOrderProducts(), [orderID])

    function retrieveOrderByID(){
        retrieveOrderByIdApi(orderID)
        .then(response => {
            setOrder(response.data)
        })
    }

    function refreshOrderProducts(){
        retrieveOrderProductByIdApi(orderID)
        .then(response => {
            setOrderProducts(response.data)
        })
    }

    return (
        <div class="container">
		<main>
			<div class="breadcrumb">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li> / </li>
					<li><a href="account.html">Account</a></li>
					<li> / </li>
					<li>Orders</li>
				</ul>
			</div> 

			
			<div class="account-page">
				<div class="profile">
                    {
					<div class="profile-img">
						
						<img src={img5} />
						<p>Price: {order.orderPrice}</p>
						<p>Pay Method: {order.orderPay}</p>
						<p>Time: {order.orderTime}</p>
						
					</div>	
                    }					
					
				</div>
				<div class="account-detail">					
					<h2>Order Detail</h2>
					<div class="order-detail">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Price per product</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{
									orderProducts.map(
										order_product => (
											<tr key={order_product.id}>
												<td>{order_product?.product?.productName}</td>
												<td>{order_product?.product?.productPrice}</td>
												<td>{order_product.quantity}</td>
												<td>{order_product.quantity * order_product?.product?.productPrice}</td>
											</tr>
										)
									)
								}
								
							</tbody>
						</table>
					</div>
				</div>	
			</div>		
		</main> 
	</div>
    )
}