import React from "react";
import { Form, Input, Button, Space } from "antd";
import ProductImages from "./ProductImages";
import type { ProductItem } from "../../types/Product";

type Props = {
  form: ProductItem;
  setForm: (form: ProductItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

const ProductDetailsForm: React.FC<Props> = ({
  form,
  setForm,
  onSave,
  onCancel,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const readers = Array.from(files).map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((images) => {
        setForm({
          ...form,
          images: [...(form.images || []), ...images],
        });
      });
    }
  };

  const handleRemoveImage = (idx: number) => {
    setForm({
      ...form,
      images: form.images?.filter((_, i) => i !== idx),
    });
  };

  return (
    <Form className="product-details-form" layout="vertical">
      <Form.Item label="Name">
        <Input
          name="name"
          value={form?.name || ""}
          onChange={handleChange}
          placeholder="Product Name"
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          name="description"
          value={form?.description || ""}
          onChange={handleChange}
          placeholder="Product Description"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item label="Number">
        <Input
          name="number"
          type="text"
          value={form?.number || ""}
          onChange={handleChange}
          placeholder="Product Number"
          min={0}
        />
      </Form.Item>
      <Form.Item label="Images">
        <Input
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
        <ProductImages
          images={form.images}
          name={form.name}
          onRemove={handleRemoveImage}
          editable
        />
      </Form.Item>
      <Form.Item>
        <Space className="product-details-actions">
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductDetailsForm;
