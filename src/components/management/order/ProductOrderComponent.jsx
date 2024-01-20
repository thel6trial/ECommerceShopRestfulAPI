import { useEffect, useState } from "react"
import { retrieveProductByIdApi } from "../api/ProductApiService"
import { orderProductApi } from "../api/OrderApiService"
import { useNavigate, useParams } from "react-router-dom"
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/product-detail.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/vendor/font-awesome/css/font-awesome.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/app.css'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/js/app.js'
import '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/css/style1.css'
import goodquality from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/icons/good_quality.png'
import product1 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img1.jpg'
import product2 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img2.jpg'
import product3 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img3.jpg'
import product4 from '/Users/mac/Documents/ManagementWebApp/management-app/src/assets/img/product/img4.jpg' 

export default function ProductOrderComponent(){

    const {productID} = useParams()
    const productIDint = parseInt(productID)
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    useEffect(
        () => retrieveProductByID(),
        [productIDint]
    )

    function retrieveProductByID() {
        retrieveProductByIdApi(productIDint)
        .then(response => {
            setProduct(response.data)
        });
    }

    function HandleQuantity(event){
        setQuantity(parseInt(event.target.value))

        if(event.target.value <= 0 ){
            setError('Invalid Stock')
        } else if(event.target.value > product.productStock){
            setError('Not enough products')
        }else{
            setError('')
        }
    }

    function AddCart() {
        if (quantity <= 0) {
            setError('Invalid Stock');
            return;
          }
        
        if (quantity > product.productStock) {
            setError('Not enough products');
            return;
          }

        fetch(`http://localhost:8080/products/order/${productIDint}`, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(quantity) // chỉ truyền vào body quantity thôi, còn id nó lấy ở pathVaribale rồi
        })
        .then(response => {
          if (response.ok) {
            navigate('/main');
          } else {
            // Xử lý lỗi nếu cần
          }
        })
        .catch(error => {
          // Xử lý lỗi nếu cần
        });
      }

    return (
        <div class="container">
		<main>
			<div class="breadcrumb">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li> / </li>
					<li><a href="">Shop</a></li>
					<li> / </li>
					<li><a href="">Product</a></li>
				</ul>
			</div> 

			<div class="single-product">
				<div class="images-section">
					<div class="larg-img">
						<img src={product.productImage} />
					</div>
					
				</div> 

				<div class="product-detail">
					<div class="product-name">
						<h2>{product.productName}</h2>
					</div>
					<div class="product-price">
						<h3>{product.productPrice}</h3>
					</div>
                    <div class="product-stock">
						<h3>Stock: {product.productStock}</h3>
					</div>
					<hr/>
					<div class="product-description">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in leo leo. Donec aliquet mauris ac consequat ornare. Pellentesque eget leo tempor, venenatis mauris sed, viverra ante. Donec tincidunt mauris vel tincidunt ultricies. Sed sed libero hendrerit elit gravida vulputate.</p>
					</div>
					<hr />
					<div class="product-cart">
						<div id="cart-form">
							<div class="form-group">
								<input type="number" class="cart-number" id="soluong" name="quantity" onChange={HandleQuantity} />
								{error && <p>{error}</p>}
								<input type="submit" name="addToCart" value="Add To Cart" onClick={AddCart} />
							</div>
						</div>
						<form id="wishlist-form">
							<div class="form-group">
								<input type="checkbox" class="wishlist" name="wishlist" /> Add To Wishlist
							</div>
						</form>
					</div>
					<hr />
					<div class="product-meta">
						<p><b>Category: </b> {product?.category?.categoryName}</p>
						<p><b>Share This Product: </b> Facebook, Twitter</p>
					</div>
				</div> 
			</div>
			<hr />
			<div class="product-long-description">
				<h3>Product Description</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in leo leo. Donec aliquet mauris ac consequat ornare. Pellentesque eget leo tempor, venenatis mauris sed, viverra ante. Donec tincidunt mauris vel tincidunt ultricies. Sed sed libero hendrerit elit gravida vulputate. 
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in leo leo. Donec aliquet mauris ac consequat ornare. Pellentesque eget leo tempor, venenatis mauris sed, viverra ante. Donec tincidunt mauris vel tincidunt ultricies. Sed sed libero hendrerit elit gravida vulputate. 
				</p>
			</div>
			<hr />
			<div class="new-product-section">
				<div class="product-section-heading">
					<h2>Recommend Products <img src={goodquality} /></h2>
					<h3>OUR BEST PRODUCTS RECOMMENDED FOR YOU</h3>
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
							<img src={product3} />
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