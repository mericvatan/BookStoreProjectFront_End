import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Sepet ()  {
   const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [chart, setChart] = useState(null);
  
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
    return <div>...</div>;
  }
  const handleAddToChart = () =>{
    const addedItems = {
      name: product.name,
      authorName : product.authorName,
      price: product.price,
  
    }
    try{
      setChart([...chart,addedItems])
      toast.success(`${addedItems.name} sepete eklendi!`);

    }catch(error){
      toast.error("Ürün sepete eklenemedi, tekrar deneyin.")
    }
    
  }
  return (
    <div onClick={handleAddToChart}>
        <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={130} height={180} alt={product.name} />
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">{product.price} ₺  </p>
    </div>

  );
  
}

export default Sepet;