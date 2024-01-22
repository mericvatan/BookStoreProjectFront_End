
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct  = async () => {
      try {
        const response = await axios.get('http://localhost:5045/api/Product/GetProductById/${id}');
        setProduct(response.data.data);
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
    <div>
        <h2 className="text-uppercase text-center mb-5">Kitap Detayları</h2>
            <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div className="card-body">
                    <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} alt={product.name} />
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} TL</p>
                </div>
            </div>
    </div>      
  );
}

export default ProductDetails;