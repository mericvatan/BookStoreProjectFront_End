import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResults, error }) => {
  return (
    <div className="row">
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
          <div key={product.id} className="col-md-3 mb-2">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div className="card-body">
                  <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} alt={product.name} />
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} TL</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col">
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SearchResult;