import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { editProduct } from "../store/productsReducer";
import type { ProductItem } from "../types/Product";
import { Card, Typography, Button } from "antd";
import ProductDetailsForm from "../components/ProductDetails/ProductDetailsForm";
import ProductImages from "../components/ProductDetails/ProductImages";
import "../styles/main.scss";

const { Title, Paragraph } = Typography;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.productList.products.find((product) => product.id === id)
  );

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<ProductItem | null>(product ?? null);

  if (!product || !form) {
    return <div>Product not found.</div>;
  }

  const handleSave = () => {
    if (form) {
      dispatch(editProduct(form));
      setEditMode(false);
    }
  };

  return (
    <div className="product-details-container">
      <Card>
        <Title level={2} className="product-details-title">
          Product Details
        </Title>
        {editMode ? (
          <ProductDetailsForm
            form={form}
            setForm={setForm}
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <div>
            <Title level={3}>{product.name}</Title>
            <Paragraph>{product.description}</Paragraph>
            <Paragraph>
              <strong>Number:</strong>{" "}
              {product.number !== undefined ? product.number : "N/A"}
            </Paragraph>
            <ProductImages images={product.images} name={product.name} />
            <Button
              type="primary"
              style={{ marginTop: 24 }}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails;
