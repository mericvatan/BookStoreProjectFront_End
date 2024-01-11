import React, { useState, useEffect } from "react";
import axios from "axios";
import img1 from "./wwwroot/uploads/img1.jpeg";
import img2 from "./wwwroot/uploads/img2.jpeg";
import img3 from "./wwwroot/uploads/img3.jpeg";
import img4 from "./wwwroot/uploads/img4.jpeg";
import img5 from "./wwwroot/uploads/img5.jpeg";
import img6 from "./wwwroot/uploads/img1.jpeg";

function Products() {
  const [products, setProducts] = useState([]);
  

  const imagesList = [
   img1,img2,img3,img4,img5,img6
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5045/api/Product/All"
        );
        const productList = response.data.data; // Burada "data" nesnesine göre güncelleme yapın
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
                {/* <img src={imagesList[0]} alt={imagesList.alt} width={100} height={190} /> */}

                <img  src={imagesList[0]} width={100} height={190}/>
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
