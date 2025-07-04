'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr')

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <About language={language} />
      <Products language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </div>
  )
}
