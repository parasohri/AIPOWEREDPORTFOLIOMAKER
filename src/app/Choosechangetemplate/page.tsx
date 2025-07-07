// app/templates/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const templates = [
  {
    name: 'Template-One',
    slug: 'modern-dark',
    preview: 'https://parasohriresume.vercel.app/',
    image: '/portfolioone.gif',
  },
  {
    name: 'Template-Two',
    slug: 'template-two',
    preview: '/portfoliotwo/686ac11123e59d8d7faae6c3',
    image: '/portfoliotwo.gif',
  },
];

export default function TemplateSelector() {
  const { isSignedIn } = useUser();
  const [selected, setSelected] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <h1 className="text-center text-3xl md:text-5xl font-bold mb-10">
        Choose Your Portfolio Template
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {templates.map((template) => (
          <div
            key={template.slug}
            className={`bg-slate-800 border ${selected === template.slug ? 'border-blue-500' : 'border-slate-700'} rounded-lg overflow-hidden hover:shadow-xl transition group`}
          >
            <Image
              src={template.image}
              alt={template.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{template.name}</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(template.slug)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded"
                >
                  Select
                </button>
                <Link
                  href={template.preview}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded"
                >
                  Preview
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="text-center mt-10">
          <button onClick={() => {
             
            localStorage.setItem('selectedTemplate', selected);
             fetch('/api/changetemplate', {
              method: 'PUT',
              body: JSON.stringify({ template:selected , id: localStorage.getItem('portfolioId') }),

          }).then((res) => {
            if (res.ok) {
              alert('Template changed successfully!');
              window.location.href = '/view-portfolio';
            } else {
              alert('Failed to change template. Please try again.');
            }           
          })}} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded mr-4">
            Continue with {selected}
          </button>
          
          <p className="mt-4 text-lg">You have selected: <span className="font-bold">{selected}</span></p>    
        </div>
      )}
    </div>
  );
}
