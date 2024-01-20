import { useNavigate, useParams } from "react-router-dom"
import { searchProductNameApi } from "../api/SearchApiService"
import { useEffect, useState } from "react"
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




export default function ProductNameSearchComponent(){
    
    const [products, setProducts] = useState([])
    const {productName} = useParams()
    const navigate = useNavigate()

    useEffect( () => searchProduct() )

    function searchProduct(){

        searchProductNameApi(productName)
        .then( response => {
            if (response.data.length === 0) {
                // Chuyển hướng tới trang lỗi (ví dụ: '/error')
                
            } else {
                setProducts(response.data);
            }
        })
        .catch(error => console.log(error))
    }

    function handleOrderProduct(productID){
        navigate(`/main/order/${productID}`)
    }

    return (
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
					<h3>Search Results</h3>
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
					<h3>OUR BEST SELLING PRODUCTS RECOMMENDED FOR YOU</h3>
				</div>
				<div class="product-content">
					<div class="product">
						<a href="product.html">
							<img src={product1} />
						</a>
						<div class="product-detail">
							<h3>Men's / Watches</h3>
							<h2>Gray Color Men's Watch</h2>
							<a href="#">Add to Cart</a>
							<p>Rs.4500/-</p>
						</div>						
					</div>
					<div class="product">
						<a href="product.html">
							<img src={product2} />
						</a>
						<div class="product-detail">
							<h3>Men's / Pants</h3>
							<h2>Levi's Jeans Pant</h2>
							<a href="#">Add to Cart</a>
							<p>Rs.2000/-</p>
						</div>
					</div>
					<div class="product">
						<a href="product.html">
							<img src={product3}/>
						</a>
						<div class="product-detail">
							<h3>Men's / Watches</h3>
							<h2>Black Men's Watch</h2>
							<a href="#">Add to Cart</a>
							<p>Rs.4000/-</p>
						</div>
					</div>
					<div class="product">
						<a href="product.html">
							<img src={product4} />
						</a>
						<div class="product-detail">
							<h3>Men's / Shoes</h3>
							<h2>Nick Black Sneakers</h2>
							<a href="#">Add to Cart</a>
							<p>Rs.3200/-</p>
						</div>
					</div>
				</div>
			</div> 
		</main> 
	</div>
    )
}