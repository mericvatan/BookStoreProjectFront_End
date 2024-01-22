
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5045/api/Category/GetProductsByCategory/${categoryId}`);
        const categoryProductsList = response.data.data;
        setCategoryProducts(categoryProductsList);
      } catch (error) {
        console.error('Kategori ürünlerini getirirken bir hata oluştu:', error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div>
      <h2>Kategori {categoryId} Ürünleri</h2>
      <div className="row">
        {categoryProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-2">
            <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
              <div className="card-body">
                <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} />
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} TL</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;