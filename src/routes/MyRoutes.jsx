import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};