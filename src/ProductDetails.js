import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Padding } from "@mui/icons-material";
import { width } from "@mui/system";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5045/api/Product/GetProductById/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-content-center" style={{ paddingTop:"9rem"}}   >
    <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
      <div className="col-md-4" >
        <img
          src={`data:image/jpeg;base64, ${product.imageUrl}`}
          alt={product.name}
          style={{ paddingTop:"0rem"}}
        />
      </div> 
      <div className="col-md-5">
        <div className="row-md-5">
          <div
            className="text-start"
            style={{ fontSize: "16px",paddingTop:"5rem"}}
          >
            <h5 style={{ fontSize: "30px", fontWeight: "bold" }}>
              {product.name}
            </h5>

            <p style={{ fontSize: "20px" }}>{product.authorName}</p>
            <p>
              <a>Fiyat:</a>
              {product.price} TL
            </p>
            <p>
              <a>Sayfa Sayısı:</a>
              {product.pages}
            </p>
            </div>
            <p className="text-start" >
              <a style={{ fontSize: "16px", fontWeight: "bolder" }}>AÇIKLAMA</a><br />
              {product.description}
            </p>
         
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default ProductDetails;

