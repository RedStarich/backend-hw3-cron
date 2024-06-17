'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

interface ProductProps {
  name: string;
  title: string;
  price: number;
  description: string;
  image: File | string; // Can be either a File object for upload or the uploaded image URL
  category: string;
}

const queryClient = new QueryClient();

const createProductMutation = async (newProduct: ProductProps) => {
  const formData = new FormData();
  formData.append('title', newProduct.title);
  formData.append('price', newProduct.price.toString()); // Ensure price is a string
  formData.append('description', newProduct.description);
  formData.append('category', newProduct.category);

  if (newProduct.image instanceof File) {
    formData.append('image', newProduct.image, newProduct.image.name);
  }

  const response = await axios.post('https://fakestoreapi.com/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

function Page() {
  const [product, setProduct] = useState<ProductProps>({
    name: '',
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  const mutation = useMutation<ProductProps, unknown, ProductProps>(createProductMutation, {
    onSuccess: (data) => {
      console.log('Product created successfully:', data);
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      // Handle errors appropriately, e.g., display error messages
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProduct({ ...product, image: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutation.mutate(product);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-2xl py-[45px] md:text-5xl text-center font-bold">
          Давайте создадим объявление
        </div>
        <div className="bg-white border rounded-lg px-8 py-6 max-w-2xl">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Название объявления (Ad Title)"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Цена (Price)"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <textarea
              placeholder="Описание (Description)"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            <input
              type="file"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              name="image"
              onChange={handleImageChange}
            />
            <button className="w-full bg-green-500 text-white >font-bold py-2 rounded-lg">
              Создать объявление (Create Ad) </button>
            </form>
            </div>
            </div>
        </QueryClientProvider>
    );
}

export default Page;