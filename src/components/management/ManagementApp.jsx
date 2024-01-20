import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ListProductsComponent from './product/ListProducts'
import ListUsersComponent from './user/ListUsers'
import ListCategoriesComponents from './product/ListCategories'
import  LoginComponent  from './LoginComponent'
import  ProductComponent  from './product/ProductComponent'
import AuthContextProvider, { AuthContext} from './security/AuthContext'
import LogoutComponent from './LogoutComponent'
import HeaderComponent1 from './HeaderComponent1'
import HeaderComponent2 from './HeaderComponent2'
import UserComponent from './user/UserComponent'
import MainComponent from './MainComponent'
import ProductNameSearchComponent from './product/ProductNameSearchComponent'
import CategoryNameSearchComponent from './product/CategorySearchComponent'
import OrderCheckoutComponent from './order/OrderCheckoutComponent'
import CartComponent from './order/CartComponent'
import ProductOrderComponent from './order/ProductOrderComponent'
import UserDetailComponent from './user/UserDetailComponent'
import OrderDetail from './order/OrderDetailComponent'
import PromotionComponent from './promotion/PromotionComponent'
import ListPromotionsComponent from './promotion/ListPromotions'
import RegisterComponent from './RegisterComponent'
import ErrorComponent from './ErrorComponent'
import { useContext, useEffect } from 'react'
import FooterComponent from './FooterComponent'
import CategoryComponent from './product/CategoryComponent'
import ListOrdersComponent from './product/ListOrders'

function RequireAuth({children}){
    const authContext = useContext(AuthContext)

    if(authContext.isAuthenticated){
        return children;
    }else{
        return <Navigate to ="/login" />
    }
}

export default function ManagementApp(){
    return (
        <div className="ManagementApp">
            <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderComponent1 />} /> {/* HeaderComponent1 */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/main" element={<RequireAuth><HeaderComponent1/><MainComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/error" element={<RequireAuth><HeaderComponent1/><ErrorComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/products" element={<RequireAuth><HeaderComponent2 /><ListProductsComponent /><FooterComponent/></RequireAuth>} />
        <Route path="/products/:id" element={<RequireAuth><HeaderComponent2 /><ProductComponent /></RequireAuth>} />
        
        <Route path="/users/:id" element={<RequireAuth><HeaderComponent2 /><UserComponent /><FooterComponent/></RequireAuth>} />
        <Route path="/users" element={<RequireAuth><HeaderComponent2 /><ListUsersComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/promotions/:promotionID" element={<RequireAuth><HeaderComponent2 /><PromotionComponent /><FooterComponent/></RequireAuth>} />
        <Route path="/promotions" element={<RequireAuth><HeaderComponent2 /><ListPromotionsComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/categories/:id" element={<RequireAuth><HeaderComponent2 /><CategoryComponent /></RequireAuth>} />
        
        <Route path="/categories" element={<RequireAuth><HeaderComponent2 /><ListCategoriesComponents /><FooterComponent/></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><HeaderComponent2 /><ListOrdersComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/products/name_search/:productName" element={<RequireAuth><HeaderComponent1 /><ProductNameSearchComponent /><FooterComponent/></RequireAuth>} />
        <Route path="/products/category_search/:categoryName" element={<RequireAuth><HeaderComponent1 /><CategoryNameSearchComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/main/order/:productID" element={<RequireAuth><HeaderComponent1 /><ProductOrderComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/main/:userID" element={<RequireAuth><HeaderComponent1 /><UserDetailComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/main/detail/:orderID" element={<RequireAuth><HeaderComponent1 /><OrderDetail /><FooterComponent/></RequireAuth>} />

        <Route path="/cart" element={<RequireAuth><HeaderComponent1 /><CartComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/confirm/:userID" element={<RequireAuth><HeaderComponent1 /><OrderCheckoutComponent /><FooterComponent/></RequireAuth>} />

        <Route path="/logout" element={<RequireAuth><HeaderComponent1 /><LogoutComponent /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
</AuthContextProvider>
        </div>
    )
}
