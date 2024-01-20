import { useEffect, useState } from "react";
import {hintProductApi, retrieveAllProductsApi } from "./api/ProductApiService";
import { useNavigate } from "react-router-dom";
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'
import slider1 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/slider/slide-1.jpg'
import increase from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/icons/increase.png'
import goodquality from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/icons/good_quality.png'
import product1 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img1.jpg'
import product2 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img2.jpg'
import product3 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img3.jpg'
import product4 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img4.jpg' 


function MainComponent(){

    const [products, setProducts] = useState([])
	const [hintProducts, setHintProducts] = useState([])

    useEffect ( () => refreshProducts() )
    useEffect( () => retrieveHintProducts() )

    const navigate = useNavigate()

    function refreshProducts(){
        retrieveAllProductsApi()
          .then(response => {
            setProducts(response.data)
          })
    }

	function retrieveHintProducts(){
		hintProductApi()
		.then(response =>{
			setHintProducts(response.data)
		})
	}

    // function refreshCategories(){
    //     retrieveAllCategoryApi()
    //       .then(response => {
    //         setCategories(response.data)
    //       })
    // }

    // function handleSearchName(event){
    //     setSearchName(event.target.value)
    // }
    // // kiểm tra chỗ searchName la product hay category
    // function isProduct(){
    //     return products.some(c => c.productName === searchName)
    // }

    // function isCategory(){
    //     return categories.some(c => c.categoryName === searchName)
    // }

    // function handleSearch(){
    //     if(isCategory()){
    //         const EnSearchName = encodeURIComponent(searchName)
    //         navigate(`/products/category_search/${EnSearchName }`)
    //     }
    //     else if(isProduct()){
    //         const EnSearchName = encodeURIComponent(searchName)
    //         navigate(`/products/name_search/${EnSearchName}`)
    //     }else{
    //         setError('Your search name is not valid')
    //         return
    //     }
    // }

    // bấm vào order sẽ chuyển sang trang sản phẩm
    function handleOrderProduct(productID){
        navigate(`/main/order/${productID}`)
    }

    function Cart(){
        navigate('/cart')
    }

    return (
        <div>
        <div class="container">
		<main>
			<div class="slider">
				<div class="slide-1">
					<img src={slider1} />
					<div class="slider-text">
						<h3>Sale 40% off</h3>
						<h2>Men's Watches</h2>
						<a href="#">Shop Now</a>
					</div>
				</div>
			</div> 

			<div class="new-product-section">
				<div class="product-section-heading">
					<h2>Products <img src={increase} /></h2>
					<h3>Most selling product for the month</h3>
				</div>
				<div class="product-content">
                {products.map(product=> (
                 <div class="product" key={product.productID}>
          <a onClick={() => handleOrderProduct(product.productID)}>
          <img src={product.productImage} alt="Product Image" />
          </a>
          <div class="product-detail">
            <h3>{product?.category?.categoryName}</h3>
            <h2>{product.productName}</h2>
			
            <a onClick={() => handleOrderProduct(product.productID)}>Add to Cart</a>
            <p>{product.productPrice} vnđ</p>
          </div>
        </div>
      ))}
					
				</div>
				
			</div> 

			<div class="collection">
				<div class="men-collection">
					<h2>Men's Collection</h2>
				</div>
				<div class="women-collection">
					<h2>Women's Collection</h2>
				</div>
			</div> 

			<div class="new-product-section">
				<div class="product-section-heading">
					<h2>Recommend Products <img src={goodquality} /></h2>
					<h3>OUR BEST PRODUCTS RECOMMENDED FOR YOU</h3>
				</div>
				<div class="product-content">
				{hintProducts.map(product=> (
                 <div class="product" key={product.productID}>
          <a onClick={() => handleOrderProduct(product.productID)}>
          <img src={product.productImage} alt="Product Image" />
          </a>
          <div class="product-detail">
            <h3>{product?.category?.categoryName}</h3>
            <h2>{product.productName}</h2>
			
            <a onClick={() => handleOrderProduct(product.productID)}>Add to Cart</a>
            <p>{product.productPrice} vnđ</p>
          </div>
        </div>
      ))}
					
				</div>
			</div> 
		</main> 
	</div>
    </div>
    )
}

export default () => (
    <>
      <MainComponent />
    </>
  );