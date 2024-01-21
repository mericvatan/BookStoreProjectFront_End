import React from "react";
import { Link } from "react-router-dom";


function SearchProducts({ product }) {

  return (
    <div>
      <div className="row">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}> 
            <div className="card-body"> 
              <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} />
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price} TL</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
      
  );
}

export default SearchProducts;