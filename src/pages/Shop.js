import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../components/products';
import './Shop.css';

const categories = ['All', 'Lips', 'Eyes', 'Face', 'Skincare', 'Fragrance'];
const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const activeCategory = categories.includes(categoryParam) ? categoryParam : 'All';
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');

  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="page-wrapper shop-page">
      {/* Page Header */}
      <div className="shop-header">
        <div className="container">
          <h1>Our Collection</h1>
          <p>Discover your perfect beauty essentials</p>
        </div>
      </div>

      <div className="container">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);
                  if (cat === 'All') {
                    nextParams.delete('category');
                  } else {
                    nextParams.set('category', cat);
                  }
                  setSearchParams(nextParams);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="shop-controls">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="results-count">{filtered.length} products found</p>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>😔</span>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
