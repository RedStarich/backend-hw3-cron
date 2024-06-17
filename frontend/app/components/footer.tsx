import React from 'react'
import Link from 'next/link'

export default function footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-1 px-4 md:px-6  inset-x-0 bottom-0 fixed">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">OLX</span>
      </div>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <Link href="#" className="hover:text-green-500" prefetch={false}>
          Правила персональных данных
        </Link>
        <Link href="#" className="hover:text-green-500" prefetch={false}>
          Правила пользования
        </Link>
        <Link href="#" className="hover:text-green-500" prefetch={false}>
          Возврат средств
        </Link>
      </div>
    </div>
  </footer>
  )
}
