'use client';
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

interface ProductProps {
  product: {
    name: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-4 w-1/3 mx-2 mb-4 text-center transition-transform hover:scale-105">
      <img
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-60 object-cover"
          />
      <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
              <button>Buy Now</button>
            </div>
        </div>
    </div>
  );
};

const fetchProducts = async () => {
  const response = await axios.get('http://localhost:3000/products');
  return response.data;
};


const Products: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery('products', fetchProducts, {
    refetchInterval: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error('Error fetching products:', error);
    return <div>Error: Something went wrong</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: Something went wrong</div>;

  return (
    <div>
      <h1>All products</h1>
      <div>
        {data.map((product: any) => (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl" key={product.name}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;