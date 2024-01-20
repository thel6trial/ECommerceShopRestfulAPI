import { useEffect, useState } from "react";
import { deleteProductApi, retrieveAllProductsApi } from "../api/ProductApiService";
import { useNavigate } from "react-router-dom";
import { activatePromotionApi, deactivatePromotionApi, retrieveAllPromotionApi } from "../api/PromotionApiService";


export default function ListPromotionsComponent(){

    const [promotions, setPromotions] = useState([])

    useEffect ( () => refreshPromotions() )

    const navigate = useNavigate()

    function refreshPromotions(){
        retrieveAllPromotionApi()
          .then(response => {
            setPromotions(response.data)
          })
    }

    function activePromotion(id){

        activatePromotionApi(id)
           .then(
            () => {
                refreshPromotions()
            })
           .catch(error => console.log(error))
    }

    function deactivePromotion(id){

        deactivatePromotionApi(id)
           .then(
            () => {
                refreshPromotions()
            })
           .catch(error => console.log(error))
    }

    function updatePromotion(id){
        navigate(`/promotions/${id}`)
    }

    function addNewPromotion(){
        navigate(`/promotions/-1`)
    }

    function moveProducts(){
        navigate('/products')
    }

    function moveUser(){
        navigate('/users')
    }

    return (
        <main>
		
		<div class="main-content">
			<div class="sidebar">
				<h3>Menu</h3>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a class="active">Promotion</a></li>
					<li><a onClick={addNewPromotion}>Add new Promotion</a></li>
					<li><a onClick={moveProducts}>Products</a></li>
					<li><a onClick={moveUser}>Users</a></li>
				</ul>				
			</div>
			<div class="content">
				<h3>Promotion</h3>
				<div class="content-data">
					<div class="content-detail">
						<h4>All Promotions</h4>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Code</th>
									<th>Type</th>
									<th>Number</th>
                                    <th>Count</th>
                                    <th>State</th>
									<th>Loyalty</th>
                                    
                                    
								</tr>
							</thead>
							<tbody>
								{
									promotions.map(
										promotion => (
											<tr key={promotion.promotionID}>
												<td>{promotion.promotionID}</td>
												<td>{promotion.promotionName}</td>
												<th>{promotion.promotionCode}</th>
												<td>{promotion.promotionType}</td>
												<td>{promotion.promotionNumber}</td>
												<td>{promotion.promotionCount}</td>
												<td>{promotion.promotionFlag === true ? 'Active' : 'Suspend'}</td>
												<td>{promotion?.user_loyalty?.loyaltyName}</td>
												<td> <button className="btn btn-warning" 
													onClick={() => activePromotion(promotion.promotionID)}>Active</button> </td>
		
												<td> <button className="btn btn-warning" 
													onClick={() => deactivePromotion(promotion.promotionID)}>Deactive</button> </td>
		
												<td> <button className="btn btn-success" 
													onClick={() => updatePromotion(promotion.promotionID)}>Update</button> </td>
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