'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const Page: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the data to send
    const data = new FormData();
    data.append('title', title);
    data.append('price', price);
    data.append('description', description);
    if (image) {
      data.append('image', image);
    }

    try {
      // Replace with your API endpoint
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          price: parseFloat(price),
          description: description,
          image: image ? URL.createObjectURL(image) : 'https://i.pravatar.cc', // Assuming you upload the image to a separate service
          category: 'electronic', // Modify as needed
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Data uploaded successfully!');
      } else {
        alert('Failed to upload data. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('An error occurred while uploading data. Please try again.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl py-[45px] md:text-7xl text-center font-bold">Давайте создадим объявление</h1>
      </div>
      <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название объявления"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <input
            type="text"
            placeholder="Цена"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4"
          ></textarea>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-lg">
            Создать объявление
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
