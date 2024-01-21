import React from "react";

function SearchProducts({ product }) {

  return (
    <div>
      <h2 className="text-uppercase text-center mb-5">Kitaplar</h2>
      <div className="row">
        <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}> 
          <div className="card-body"> 
            <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} />
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.price} TL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts;