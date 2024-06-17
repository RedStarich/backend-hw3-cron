import React from 'react'
import Link from 'next/link'

export default function navbar() {
  return (
    <header className="bg-[#1a1a1a] text-white py-4 px-6">
    <div className="container mx-auto flex items-center justify-between">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <span className="font-bold text-lg">OLX</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-green-500" prefetch={false}>
          Home
        </Link>
        <Link href="/products" className="hover:text-green-500" prefetch={false}>
          Товары
        </Link>
        <Link href="/about" className="hover:text-green-500" prefetch={false}>
          О нас
        </Link>
        <Link href="/createproduct" className="hover:text-green-500" prefetch={false}>
          Добавить продукт
        </Link>
      </nav>
      <button className="md:hidden bg-transparent border-none text-white hover:text-green-500 focus:outline-none">
      </button>
    </div>
  </header>
  )
}