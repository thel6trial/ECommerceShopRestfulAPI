import { useEffect, useState } from "react";
import {retrieveAllProductsApi } from "./api/ProductApiService";
import { useNavigate } from "react-router-dom";
import { retrieveAllCategoryApi } from "./api/CategoryApiService";
import { orderProductApi } from "./api/OrderApiService";
import { retrieveUserBy0Api } from "./api/UserApiService";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'


function ErrorComponent(){

    const [products, setProducts] = useState([])
    const [categories, setCategories] =  useState([])
    const [searchName, setSearchName] = useState('')
    const [error, setError] = useState('')

    useEffect ( () => refreshProducts() )
    useEffect( () => refreshCategories() )

    const navigate = useNavigate()

    function refreshProducts(){
        retrieveAllProductsApi()
          .then(response => {
            setProducts(response.data)
          })
    }

    function refreshCategories(){
        retrieveAllCategoryApi()
          .then(response => {
            setCategories(response.data)
          })
    }

    function handleSearchName(event){
        setSearchName(event.target.value)
    }
    // kiểm tra chỗ searchName la product hay category
    function isProduct(){
        return products.some(c => c.productName === searchName)
    }

    function isCategory(){
        return categories.some(c => c.categoryName === searchName)
    }

    function handleSearch(){
        if(isCategory()){
            const EnSearchName = encodeURIComponent(searchName)
            navigate(`/products/category_search/${EnSearchName }`)
        }
        else if(isProduct()){
            const EnSearchName = encodeURIComponent(searchName)
            navigate(`/products/name_search/${EnSearchName}`)
        }else{
            setError('Your search name is not valid')
            return
        }
    }

    // bấm vào order sẽ chuyển sang trang sản phẩm
    function handleOrderProduct(productID){
        navigate(`/main/order/${productID}`)
    }

    function Cart(){
        navigate('/cart')
    }

    function userInfo(){
        retrieveUserBy0Api()
        .then(response => {
            const userID = response.data
            navigate(`/main/${userID}`)
        })
    }

    function backToMain(){
        navigate('/main')
    }

    return (
        // <div className='container'>
        //     <nav class="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
        //     <div class="container">
        //     <a class="nav-link" onClick={backToMain}>Nền tảng</a>
        //     <div class="navbar-collapse collapse" id="navbarCollapse">
                
        //             <input class="form-control mr-sm-2" type="text" name="name" placeholder="Tìm kiếm" aria-label="Search" value={searchName} onChange={handleSearchName} />
        //             {error && <p>{error}</p>}
        //             <button class="btn btn-outline-success my-2 my-sm-0" name="search" onClick={handleSearch}>Tìm kiếm</button>
        //     </div>
        //     <ul class="navbar-nav px-3">
        //         <li class="nav-item text-nowrap">
        //             <a class="nav-link" onClick={userInfo}>Thông tin người dùng</a>
        //         </li>
        //     </ul>
        //     <ul class="navbar-nav px-3">
        //         <li class="nav-item text-nowrap">
        //             <a class="nav-link" onClick={Cart}>Giỏ hàng</a>
        //         </li>
                
        //     </ul>
        // </div>
        // </nav>

        //     <div id="myCarousel" class="carousel slide" data-ride="carousel">
        //     <ol class="carousel-indicators">
        //         <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        //         <li data-target="#myCarousel" data-slide-to="1" class=""></li>
        //         <li data-target="#myCarousel" data-slide-to="2" class=""></li>
        //     </ol>
        //     <div class="carousel-inner">
        //         <div class="carousel-item active">
        //             <img src={slider1} />
        //             <div class="container">
        //                 <div class="carousel-caption text-left">
        //                     <h1>Nền Tảng - Nơi mua sắm tuyệt vời</h1>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="carousel-item">
        //             <img src={slider2} />
        //             <div class="container">
        //                 <div class="carousel-caption">
        //                     <h1>Hàng triệu sản phẩm - Lựa chọn mỏi tay</h1>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="carousel-item">
        //             <img src={slider3} />
        //             <div class="container">
        //                 <div class="carousel-caption text-right">
        //                     <h1>Chất lượng là Hàng đầu.</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span class="sr-only">Previous</span>
        //     </a>
        //     <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span class="sr-only">Next</span>
        //     </a>
        // </div>

        // <div class="container marketing">
        //     <div class="row">
        //         <div class="col-lg-4">
        //             <img className="bd-placeholder-img rounded-circle" width="140" height="140"
        //                 src={icon1} />
        //             <h2>Đặt hàng</h2>
        //             <p>Chọn sản phẩm bạn yêu thích, và Đặt hàng.</p>
        //         </div>
        //         <div class="col-lg-4">
        //             <img className="bd-placeholder-img rounded-circle" width="140" height="140"
        //                 src={icon2} />
        //             <h2>Tạo đơn hàng</h2>
        //             <p>Theo dõi đơn hàng của bạn.</p>
        //         </div>
        //         <div class="col-lg-4">
        //             <img className="bd-placeholder-img rounded-circle" width="140" height="140"
        //                 src={icon3} />
        //             <h2>Giao hàng</h2>
        //             <p>Giao hàng tận nơi.</p>
        //         </div>
        //     </div>


        //     <hr class="featurette-divider" />
        //     <div class="row featurette">
        //         <div class="col-md-7">
        //             <h2 className="featurette-heading">Đặt hàng, Tạo đơn hàng, Giao hàng <span class="text-muted">Nhanh
        //                     chóng</span>
        //             </h2>
        //             <p class="lead">Nơi mua sắm tuyệt vời cho mọi lứa tuổi.</p>
        //         </div>
        //         <div className="col-md-5">
        //             <img src={marketing_1} />
        //         </div>
        //     </div>

        //     <hr class="featurette-divider" />
        //     <div class="row featurette">
        //         <div class="col-md-7 order-md-2">
        //             <h2 class="featurette-heading">Báo cáo Doanh thu tuyệt vời <span class="text-muted">Theo dõi đơn
        //                     hàng của
        //                     bạn.</span></h2>
        //             <p class="lead">Hệ thống theo dõi đơn hàng chi tiết, thông tin mọi lúc mọi nơi.</p>
        //         </div>
        //         <div class="col-md-5 order-md-1">
        //             <img src={marketing_2} />
        //         </div>
        //     </div>

        //     <hr class="featurette-divider" />
        // </div>

        // <section class="jumbotron text-center">
        //     <div class="container">
        //         <h1 class="jumbotron-heading">Danh sách Sản phẩm</h1>
        //         <p class="lead text-muted">Các sản phẩm với chất lượng, uy tín, cam kết từ nhà Sản xuất, phân phối và
        //             bảo hành
        //             chính hãng.</p>
        //     </div>
        // </section>

        //     <div class="danhsachsanpham py-5 bg-light">
        //     <div class="container">
        //         <p>Không tồn tại sản phẩm</p>

        //         </div>
        //         </div>
        //     <button className="" onClick={Cart}>Check out your Order !</button>
        // </div>
        <div></div>
    )
}

export default () => (
    <>
      <ErrorComponent />
    </>
  );