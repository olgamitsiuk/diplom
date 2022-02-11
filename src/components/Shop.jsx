import React, { useContext } from "react";
import { ShopContext } from "../context";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import {ProductPage} from "./pages/ProductPage";
import {Header} from "./layouts/Header";
import {Home} from "./pages/Home";
import {Category} from "./pages/Category";
import {SubCategory} from "./pages/SubCategory";
import {NotFound} from "./pages/NotFound";
import {BlogPage} from "./pages/BlogPage";
import {Footer} from "./layouts/Footer";
import Mailer from "./layouts/Mailer";
import {SearchPage} from "./pages/SearchPage";
import {Alert} from "./shop/Alert";
import {SalePage} from "./pages/SalePage";
import {ContactPage} from "./pages/ContactPage";
import {DeliveryPage} from "./pages/DeliveryPage";
import UserContainer from "./user/userContainer";


function Shop () {
    const {alertName} = useContext(ShopContext);

    return <div className="App">
        {alertName && <Alert />}

        <BrowserRouter >
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserContainer/>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/category/:categoryName/:subCategoryName" element={<SubCategory />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/search/:searchString" element={<SearchPage />} />
            <Route path="/product/sale" element={<SalePage />} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Mailer/>
        <Footer/>
        </BrowserRouter>
    </div>
}
export {Shop}

