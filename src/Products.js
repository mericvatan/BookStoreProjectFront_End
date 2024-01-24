import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { Nav } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa'; 

import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5045/api/Product/All");
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
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-2">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div className="card-body">
                    <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={130} height={180} alt={product.name} />
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} ₺ <FaShoppingBasket size={20} /></p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
