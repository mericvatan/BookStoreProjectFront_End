import React from 'react';

const ImageGallery = ()=>{
    const importAll = (r)=>{
        return r.keys().map(r);
    };

    const images = importAll(require.context('./wwwroot/uploads',false))

    return (
        <div>
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image} 
                style={{ maxWidth: '90%', margin: '10px' }}
              />
            ))}
          </div>
        </div>
      );
};
export default ImageGallery;
