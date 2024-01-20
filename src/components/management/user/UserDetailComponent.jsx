import { useNavigate, useParams } from "react-router-dom";
import { retrieveUserByIdApi } from "../api/UserApiService";
import { useEffect, useState } from "react";
import { retrievePromotionByIDApi, retrievePromotionByLoyaltyIdApi, retrievePromotionByUserIdApi, retrieveUserPromotionByUserIdApi } from "../api/PromotionApiService";
import img5 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img5.jpg'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'

export default function UserDetailComponent(){
    const {userID} = useParams()
    const [user, setUser] = useState([])
    const [userPromotions, setUserPromotions] = useState([])
    const [showPromotions, setShowPromotions] = useState(false)

    useEffect( () => refreshUserDetail(), [userID])

    const navigate = useNavigate()

    function refreshUserDetail(){
        retrieveUserByIdApi(userID)
        .then(response => {
            setUser(response.data)
        })
        .catch(error => console.log(error))
    }

    function detailOrder(orderID){
        navigate(`/main/detail/${orderID}`)
    }

    function retrieveUserPromotionByUserId(){
        setShowPromotions(!showPromotions)
        retrieveUserPromotionByUserIdApi(parseInt(userID))
        .then( response => {
            setUserPromotions(response.data)
        })
    }

    function retrievePromotionById(promotionID){
        const promotion = retrievePromotionByIDApi(promotionID);
        return promotion;
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userPromotionsData = await retrieveUserPromotionByUserId();
            const updatedUserPromotions = [];
    
            for (const userPromotion of userPromotionsData) {
              const promotion = await retrievePromotionById(userPromotion?.promotion?.promotionID);
              if (promotion) {
                updatedUserPromotions.push({ ...userPromotion, ...promotion });
              }
            } // userPromotions bây giờ sẽ có cả userPromotion lẫn promotion
            // lấy tất cả UserPromotion, với mỗi cái đó lấy ra Promotion và đẩy vào thành 1 cặp
            setUserPromotions(updatedUserPromotions);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
 
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
						<h2>{user.username}</h2>
						<p>{user.user_phone}</p>
						<p>{user?.user_loyalty?.loyaltyName}</p>
					</div>
                    }						
					<ul>
						
						<li><a >My Orders <span> &gt; </span></a></li>
						<li><a >Change Password <span> &gt; </span></a></li>
						<li><a >Logout <span> &gt; </span></a></li>
					</ul>
				</div>
				<div class="account-detail">					
					<h2>My Orders</h2>
					<div class="order-detail">
						{user.orders && user.orders.length > 1 ? (
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Price</th>
									<th>Time</th>
									<th>Discount</th>
									<th>Method Pay</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>
								{
									user.orders.map(
										(order) => {
											if(order.orderPrice != 0){
												return (
													<tr key={order.orderID}>
												<td>{order.orderID}</td>
												<td>{order.orderPrice}</td>
												<td>{order.orderTime}</td>
												<td>{order.orderDiscount}</td>
												<td>{order.orderPay}</td>
												<td> <button className="btn btn-success" 
													onClick={() => detailOrder(order.orderID)}>View detail of this order</button> </td>
											</tr>
												)
											}
										}
									)
								}
								
							</tbody>
						</table>
						) : (
                <p>You've not ordered any order yet</p>
            )}
					</div>	
				
				<button onClick={() => retrieveUserPromotionByUserId()}>Show Promotions</button>
				{showPromotions && (
					
					<div class="order-detail">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Code</th>
									<th>Type</th>
									<th>Number Discount</th>
									<th>State</th>
								</tr>
							</thead>
							<tbody>
								{userPromotions.map( (userPromotion1) => (
									userPromotion1.used === false &&  userPromotion1.promotion.promotionFlag === true && (
										<tr key={userPromotion1.promotion.promotionID}>
											<td>{userPromotion1.promotion.promotionID}</td>
											<td>{userPromotion1.promotion.promotionName}</td>
											<td>{userPromotion1.promotion.promotionCode}</td>
											<td>{userPromotion1.promotion.promotionType}</td>
											<td>{userPromotion1.promotion.promotionNumber}</td>
											<td>{userPromotion1.promotion.promotionFlag === true ? 'Active' : 'Suspend'}</td>
										</tr>
									)
								))}
							</tbody>
						</table>
					
					</div>
				)}
			</div>	
            	</div>
		</main> 
	</div>
        
    )
}