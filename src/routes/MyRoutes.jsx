import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/*" element={<div>Error 404</div>} />
        </Routes>
    );
};