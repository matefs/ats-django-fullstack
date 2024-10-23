// src/app/page.jsx
'use client';


import { redirect } from 'next/navigation';


export default function Home() {

  redirect('/usuario/login');

  return (
    <div>
    </div>
  );
}
