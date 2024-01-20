import { useEffect, useState } from "react";
import { deleteUserApi, retriveAllUsersApi } from "../api/UserApiService";
import { useNavigate } from "react-router-dom";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style2.css'

export default function ListUsersComponent(){

    const [users, setUsers] = useState([])

    useEffect( () => refreshUsers() )

    const navigate = useNavigate()

    function refreshUsers(){
        
        retriveAllUsersApi()
             .then(response => {
                setUsers(response.data)
             })
    }

    function deleteUser(id){
        deleteUserApi(id)
        .then(
            () => {
                refreshUsers()
            }
        )
        .catch(error => console.log(error))
    }

    function updateUser(id){
        navigate(`/users/${id}`)
    }

    function addNewUser(){
        navigate(`/users/-1`)
    }

    function moveProducts(){
        navigate('/products')
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
					<li><a class="active" >Users</a></li>
					<li><a onClick={addNewUser}>Add new user</a></li>
					<li><a onClick={moveProducts}>Products</a></li>
					<li><a onClick={movePromotions}>Promotions</a></li>
				</ul>				
			</div>
			<div class="content">
				<h3>User</h3>
				<div class="content-data">
					<div class="content-detail">
						<h4>All Users</h4>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Username</th>
									<th>Password</th>
									<th>Birthday</th>
									<th>Phone Number</th>
                                    <th>Total Payment</th>
                                    <th> Role</th>
                                    <th>Loyalty Prize</th>
									<th>Delete</th>
									<th>Edit</th>
								</tr>
							</thead>
							<tbody>
								{
									users.map(
										user => (
											<tr key={user.userID}>
												<td>{user.userID}</td>
												<td>{user.username}</td>
												<td>{user.user_password}</td>
												<td>{user.user_birthday}</td>
												<td>{user.user_phone}</td>
												<td>{user.user_total_payment}</td>
												<td>{user?.user_role?.roleName}</td>
												<td>{user?.user_loyalty?.loyaltyName}</td>
												<td> <button className="btn btn-warning" 
													onClick={() => deleteUser(user.userID)}>Delete</button> </td>
												<td> <button className="btn btn-success" 
													onClick={() => updateUser(user.userID)}>Update</button> </td>
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