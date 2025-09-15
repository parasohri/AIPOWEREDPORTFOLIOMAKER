'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';  

const templates = [
  {
    name: 'Template-One',
    slug: 'modern-dark',
    preview: '/portfolio/68c4e8f72368fde0a1757e4c',
    image: '/portfolioone.gif',
  },
  {
    name: 'Template-Two',
    slug: 'template-two',
    preview: '/portfoliotwo/68c4e8f72368fde0a1757e4c',
    image: '/portfoliotwo.gif',
  },
   {name: 'Template-Three',
   slug: 'template-three',
   preview: '/Portfoliothree/68c4e8f72368fde0a1757e4c',
   image: '/portfoliothree.gif',
  },
];

export default function TemplateSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl md:text-6xl font-extrabold mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        View Sample Portfolios
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {templates.map((template) => (
          <div
            key={template.slug}
            className={`bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden">
              <Image
                src={template.image}
                alt={template.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                {template.name}
              </h2>
              <div className="mt-2">
                <Link
                  href={template.preview}
                  rel="noopener noreferrer" // Added for security best practices
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  View Sample Portfolio
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}