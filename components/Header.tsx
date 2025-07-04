'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  language: 'fr' | 'ar'
  setLanguage: (lang: 'fr' | 'ar') => void
}

interface Settings {
  site_name?: string
}

const translations = {
  fr: {
    home: 'Accueil',
    about: 'À Propos',
    products: 'Produits',
    contact: 'Contact',
    admin: 'Admin'
  },
  ar: {
    home: 'الرئيسية',
    about: 'حولنا',
    products: 'المنتجات',
    contact: 'اتصل بنا',
    admin: 'الإدارة'
  }
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const getSiteName = () => {
    return settings.site_name || 'El Jarda'
  }

  const t = translations[language]
  const siteName = getSiteName()

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-max">
        <div className={`flex items-center justify-between h-16 px-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center hover:opacity-80 transition-opacity cursor-pointer ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <Image 
              src="/el_jarda.png" 
              alt="El Jarda Logo" 
              width={50} 
              height={50}
              className="rounded-full"
            />
            <span className={`text-2xl font-bold text-primary-700 ${language === 'ar' ? 'arabic-text' : ''}`}>{siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            <a href="#home" className={`text-gray-700 hover:text-primary-600 transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.home}
            </a>
            <a href="#about" className={`text-gray-700 hover:text-primary-600 transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.about}
            </a>
            <a href="#products" className={`text-gray-700 hover:text-primary-600 transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.products}
            </a>
            <a href="#contact" className={`text-gray-700 hover:text-primary-600 transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.contact}
            </a>
            <Link href="/admin" className={`text-gray-700 hover:text-primary-600 transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.admin}
            </Link>
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className={`px-3 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white transition-colors ${language === 'ar' ? 'arabic-text' : ''}`}
            >
              {language === 'fr' ? 'العربية' : 'Français'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className={`px-4 py-2 space-y-2 ${language === 'ar' ? 'text-right' : ''}`}>
              <a href="#home" className={`block py-2 text-gray-700 hover:text-primary-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {t.home}
              </a>
              <a href="#about" className={`block py-2 text-gray-700 hover:text-primary-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {t.about}
              </a>
              <a href="#products" className={`block py-2 text-gray-700 hover:text-primary-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {t.products}
              </a>
              <a href="#contact" className={`block py-2 text-gray-700 hover:text-primary-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {t.contact}
              </a>
              <Link href="/admin" className={`block py-2 text-gray-700 hover:text-primary-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {t.admin}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
