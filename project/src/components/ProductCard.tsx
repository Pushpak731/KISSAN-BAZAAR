import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  addToCart, 
  toggleFavorite, 
  isFavorite 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.organic && (
          <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Organic
          </span>
        )}
        <button 
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`p-2 rounded-full ${
              product.stock > 0 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        
        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-2 text-xs text-orange-600">
            Only {product.stock} left in stock!
          </p>
        )}
        
        {product.stock <= 0 && (
          <p className="mt-2 text-xs text-red-600">
            Out of stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;