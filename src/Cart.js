import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart ()  {
  

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
            'http://localhost:5045/api/Product/GetCart'
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      }
    };

    fetchProducts();
  }, []);

  // sepetteki ürünler döndürmesi icin
  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <p>{product.id}</p>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.price} ₺</p>
          </div>
        ))
      ) : (
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      )}
    </div>
  );
  
}

export default Cart;