import React from 'react';

function ProductImage({ product, className }) {
  const handleError = (event) => {
    const image = event.currentTarget;
    const fallback = image.dataset.fallback;
    if (fallback && image.getAttribute('src') !== fallback) {
      image.src = fallback;
    }
  };

  return (
    <img
      src={product.image}
      data-fallback={product.imageFallback}
      alt={product.name}
      className={className}
      onError={handleError}
    />
  );
}

export default ProductImage;
