import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function AddToChart() {
    const { id } = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:5045/api/Product/AddToCart/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Ürünleri getirirken bir hata oluştu:", error);
            }
        };

        fetchProduct();
    }, [id]);


   if(!product){
    console.log(product.name)
   }
}

export default AddToChart;
