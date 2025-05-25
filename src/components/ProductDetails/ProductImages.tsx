import React from "react";
import { Image, Button } from "antd";
import noImage from "../../assets/no-image.jpg";

type Props = {
  images?: (string | { url: string })[];
  name: string;
  onRemove?: (idx: number) => void;
  editable?: boolean;
};

const ProductImages: React.FC<Props> = ({
  images,
  name,
  onRemove,
  editable,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="product-details-images">
      {images
        .filter(
          (img) =>
            (typeof img === "string" && img) ||
            (typeof img === "object" && img.url),
        )
        .map((img, index) => {
          const src = typeof img === "string" ? img : img.url;
          return (
            <div className="product-details-image-wrapper" key={index}>
              <Image
                src={src}
                alt={`${name} ${index + 1}`}
                width={120}
                height={120}
                style={{ objectFit: "cover", borderRadius: 8 }}
                fallback={noImage}
              />
              {editable && onRemove && (
                <Button
                  type="primary"
                  danger
                  size="small"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    borderRadius: "50%",
                    padding: 0,
                    width: 22,
                    height: 22,
                    minWidth: 0,
                  }}
                  onClick={() => onRemove(index)}
                >
                  ×
                </Button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ProductImages;
