import React from "react";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no-image.jpg";
import type { ProductItem } from "../../types/Product";

const { Paragraph, Text } = Typography;

type Props = {
  product: ProductItem;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-list-flex-item">
      <Card
        hoverable
        title={product.name}
        onClick={handleProductClick}
        className="product-card"
      >
        <Text strong>Description: </Text>
        <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
        <Text strong>Number: </Text>
        <Paragraph>
          {product.number !== undefined ? product.number : "N/A"}
        </Paragraph>
        <div className="product-card-image-container">
          {(product.images?.length ?? 0) > 0 &&
            (product.images ?? [])
              .filter(
                (img) =>
                  (typeof img === "string" && img) ||
                  (typeof img === "object" && img.url),
              )
              .map((img, index) => {
                const src = typeof img === "string" ? img : img.url;
                return (
                  <img
                    key={index}
                    src={src}
                    alt={`${product.name} ${index + 1}`}
                    className="product-card-image"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = noImage;
                    }}
                  />
                );
              })}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
