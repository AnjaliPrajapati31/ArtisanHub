import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerProfile from "./pages/CustomerProfile";
import ProductListing from "./pages/ProductListing";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/create" element={<CreatePost />} />

        {/* IMPORTANT: DO NOT place any routes below this. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;