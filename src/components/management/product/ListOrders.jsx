import { useEffect, useState } from "react";
import { deleteProductApi, retrieveAllProductsApi } from "../api/ProductApiService";
import { useNavigate } from "react-router-dom";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'
import { retrieveAllOrderApi } from "../api/OrderApiService";


export default function ListOrdersComponent(){

    const [orders, setOrders] = useState([])

    useEffect ( () => refreshOrders() )

    const navigate = useNavigate()

    function refreshOrders(){
        retrieveAllOrderApi()
          .then(response => {
            setOrders(response.data)
          })
    }

    function moveUsers(){
        navigate('/users')
    }

    function movePromotions(){
        navigate('/promotions')
    }

	function moveProducts(){
		navigate('/products')
	}

    return (
        <main>
        <div class="main-content">
			<div class="sidebar">
				<h3>Menu</h3>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a class="active" href="product.html">Order</a></li>
					<li><a onClick={moveProducts}>Products</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
					<li><a onClick={moveUsers}>Users</a></li>
				</ul>				
			</div>
			<div class="content">
				<h3>Order</h3>
				<div class="content-data">
					<div class="content-detail">
						<h4>All Orders</h4>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Username</th>
									<th>Order Price</th>
									<th>Order Time</th>
									<th>Order Discount</th>
                                    <th>Order Pay</th>
								</tr>
							</thead>
							<tbody>
								{
									orders.map(
									    order => (
											<tr key={order.orderID}>
												<td>{order.orderID}</td>
												<td>{order?.user?.username}</td>
												<td>{order.orderPrice}</td>
                                                <td>{order.orderTime}</td>
												<td>{order.orderDiscount}</td>
												<td>{order.orderPay}</td>
											</tr>
										)
									)
                                }
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>	
        </main>
    )
}