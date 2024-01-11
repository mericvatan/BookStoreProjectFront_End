import React, { useState, useEffect } from "react";
import axios from "axios";
import img from './wwwroot/uploads/img1.jpeg'
import ImageGallery from "./imageLoader";

function Products() {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5045/api/Product/All"
        );
        const productList = response.data.data; 
        setProducts(productList);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 class="text-uppercase text-center mb-5">Kitaplar</h2>
      <div className="row">
       
        {products.map((product) => (
          
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body"> 
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <p className="card-text">{product.authorName}</p>
                {/* <img src={imagesList[0]} alt={imagesList.alt} width={100} height={190} /> */}
                <ImageGallery></ImageGallery>
              </div>
            </div>
          
          </div>
        )    
        )
        }
      </div>
    </div>
  );
}

export default Products;