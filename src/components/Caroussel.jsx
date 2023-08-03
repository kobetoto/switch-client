import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { ProductService } from "../services/ProductService";

export default function VerticalDemo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 9))
    );
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Carousel
        value={products}
        numVisible={1}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="360px"
        itemTemplate={productTemplate}
      />
    </div>
  );
}
