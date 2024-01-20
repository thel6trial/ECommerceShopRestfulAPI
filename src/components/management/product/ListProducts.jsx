import { useEffect, useState } from "react";
import { deleteProductApi, retrieveAllProductsApi } from "../api/ProductApiService";
import { useNavigate } from "react-router-dom";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'


export default function ListProductsComponent(){

    const [products, setProducts] = useState([])

    useEffect ( () => refreshProducts() )

    const navigate = useNavigate()

    function refreshProducts(){
        retrieveAllProductsApi()
          .then(response => {
            setProducts(response.data)
          })
    }

    function deleteProduct(id){

        deleteProductApi(id)
           .then(
            () => {
                refreshProducts()
            }
           )
           .catch(error => console.log(error))
    }

    function updateProduct(id){
        navigate(`/products/${id}`)
    }

    function addNewProduct(){
        navigate(`/products/-1`)
    }

    function moveUsers(){
        navigate('/users')
    }

    function movePromotions(){
        navigate('/promotions')
    }

    return (
        <main>
        <div class="main-content">
			<div class="sidebar">
				<h3>Menu</h3>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a class="active" href="product.html">Product</a></li>
					<li><a onClick={addNewProduct}>Add New Product</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
					<li><a onClick={moveUsers}>Users</a></li>
				</ul>				
			</div>
			<div class="content">
				<h3>Product</h3>
				<div class="content-data">
					<div class="content-detail">
						<h4>All Products</h4>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Product</th>
									<th>Price</th>
									<th>Stock</th>
									<th>Category</th>
                                    <th>Sales</th>
									<th>Image</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{
									products.map(
										product => (
											<tr key={product.productID}>
												<td>{product.productID}</td>
												<td>{product.productName}</td>
												<td>{product.productPrice}</td>
                                                
												<td>{product.productStock > 0 ? product.productStock : "Out of stock"}</td>
												<td>{product?.category?.categoryName}</td>
                                                <td>{product.productCount}</td>
                                                <td><img style={{ width: '120px', height: '150px' }} src={product.productImage} alt="Product Image" />
</td>
												<td> <button className="btn btn-warning" 
													onClick={() => deleteProduct(product.productID)}>Delete</button> </td>
												<td> <button className="btn btn-success" 
													onClick={() => updateProduct(product.productID)}>Update</button> </td>
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