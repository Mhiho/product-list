import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Typography } from "antd";
import ProductCard from "../components/ProductList/ProductCard";
import "../styles/main.scss";

const { Title } = Typography;

const Home: React.FC = () => {
  const products = useSelector(
    (state: RootState) => state.productList.products,
  );

  return (
    <div className="product-list-container">
      <Title level={2}>Product List</Title>
      <div className="product-list-flex">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
