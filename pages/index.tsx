'use client';

import Head from 'next/head'
import Image from 'next/image'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      // router.push('/Landing')
    }
  }, [])
  

  return (
    <div>
    </div>
  )
}
