import { useNavigate, useParams } from "react-router-dom";
import { newestOrderByUserID, orderSuccessApi, retrieveOrderProductByIdApi } from "../api/OrderApiService";
import { useEffect, useState } from "react";
import { retrieveUserByIdApi } from "../api/UserApiService";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'

export default function OrderCheckoutComponent(){

    const {userID} = useParams()
    const navigate = useNavigate()
    const[order, setOrder] = useState([])
    const[user, setUser]  = useState([])
    const[order_products, setOrder_products] = useState([])

    useEffect( () => retrieveUser() )

    function retrieveUser(){
        retrieveUserByIdApi(userID)
        .then(response => {
            setUser(response.data)
        })
    }

    function BackMain(){
        orderSuccessApi(userID)
        .then( response => {
            navigate('/main')
        })
    }

    useEffect( () => retrieveNewestOrder() )

    function retrieveNewestOrder(){
        newestOrderByUserID(userID)
        .then(response => {
            setOrder(response.data)
        })
    }


    return (
        <div class="container mt-4">
            <form class="needs-validation" name="frmthanhtoan" method="post"
                action="#">
                <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

                <div class="py-5 text-center">
                    <i class="fa fa-credit-card fa-4x" aria-hidden="true"></i>
                    <h2>Thanh toán</h2>
                    <p class="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
                </div>

                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Giỏ hàng</span>
                            <span class="badge badge-secondary badge-pill">2</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <input type="hidden" name="sanphamgiohang[1][sp_ma]" value="2" />
                            <input type="hidden" name="sanphamgiohang[1][gia]" value="11800000.00" />
                            <input type="hidden" name="sanphamgiohang[1][soluong]" value="2" />
                            
                            
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Tổng giảm giá</span>
                                <strong>{order.orderDiscount}</strong>
                            </li>
                           
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Tổng thành tiền</span>
                                <strong>{order.orderPrice}</strong>
                            </li>
                        </ul>


                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Mã khuyến mãi" />
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-secondary">Xác nhận</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Thông tin khách hàng</h4>

                        <div class="row">
                            <div class="col-md-12">
                                <label for="kh_ten">Họ tên</label>
                                <input type="text" class="form-control" name="kh_ten" id="kh_ten"
                                    value={user.username} readonly />
                            </div>
                            
                            <div class="col-md-12">
                                <label for="kh_dienthoai">Điện thoại</label>
                                <input type="text" class="form-control" name="kh_dienthoai" id="kh_dienthoai"
                                    value={user.user_phone} readonly />
                            </div>
                            <div class="col-md-12">
                                <label for="kh_email">Năm sinh</label>
                                <input type="text" class="form-control" name="kh_email" id="kh_email"
                                    value={user.user_birthday} readonly />
                            </div>
                            
                            <div class="col-md-12">
                                <label for="kh_cmnd">Mức độ khách hàng thân thiết</label>
                                <input type="text" class="form-control" name="kh_cmnd" id="kh_cmnd" value={user?.user_loyalty?.loyaltyName} readonly />
                            </div>
                        </div>

                        <h4 class="mb-3">Hình thức thanh toán</h4>
                        <p class="mb-3">{order.orderPay}</p>
                        
                        <hr class="mb-4" />
                    </div>
                </div>
            </form>
            <button class="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang" onClick={BackMain}>Quay về trang chủ
            </button>
        </div>
    )
}