import { useEffect, useState } from "react";
import { deleteCategoryApi, retrieveAllCategoryApi } from "../api/CategoryApiService";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'
import { useNavigate } from "react-router-dom";



export default function ListCategoriesComponents(){

    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    useEffect( () => refreshCategories() )

    function refreshCategories (){
        
        retrieveAllCategoryApi()
          .then( response => {
            setCategories(response.data)
          }

          )
    }

    function moveUsers(){
        navigate('/users')
    }

    function movePromotions(){
        navigate('/promotions')
    }

    function deleteProduct(id){

        deleteCategoryApi(id)
           .then(
            () => {
                refreshCategories()
            }
           )
           .catch(error => console.log(error))
    }

    function updateProduct(id){
        navigate(`/categories/${id}`)
    }

    function addNewProduct(){
        navigate(`/categories/-1`)
    }

    return (
        <main>
        <div class="main-content">
			<div class="sidebar">
				<h3>Menu</h3>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a class="active" href="product.html">Category</a></li>
					<li><a onClick={addNewProduct}>Add New Categories</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
					<li><a onClick={moveUsers}>Users</a></li>
				</ul>				
			</div>
			<div class="content">
				<h3>Category</h3>
				<div class="content-data">
					<div class="content-detail">
						<h4>All Categories</h4>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Category Name</th>
									<th>Category Count</th>
									
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{
									categories.map(
										category => (
											<tr key={category.productID}>
												<td>{category.categoryID}</td>
												<td>{category.categoryName}</td>
												<td>{category.categoryCount}</td>
                                                
												<td> <button className="btn btn-warning" 
													onClick={() => deleteProduct(category.categoryID)}>Delete</button> </td>
												<td> <button className="btn btn-success" 
													onClick={() => updateProduct(category.categoryID)}>Update</button> </td>
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