export interface ProductItem {
  id: string;
  name: string;
  number: string;
  description: string;
  images?: (Image | string)[];
}

type Image = {
  url: string;
  name: string;
};
