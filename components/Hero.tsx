'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  language: 'fr' | 'ar'
}

interface Settings {
  hero_title_fr?: string
  hero_title_ar?: string
  hero_subtitle_fr?: string
  hero_subtitle_ar?: string
  business_phone_1?: string
}

const defaultTranslations = {
  fr: {
    title: 'Votre Expert en Jardinage à Sfax',
    subtitle: 'Avec Ayoub Zouch, transformez votre espace extérieur avec nos services professionnels et nos produits de qualité',
    cta: 'Découvrir nos services',
    phone: 'Appelez-nous'
  },
  ar: {
    title: 'خبيرك في البستنة في صفاقس',
    subtitle: 'مع أيوب زوش، حوّل مساحتك الخارجية بخدماتنا المهنية ومنتجاتنا عالية الجودة',
    cta: 'اكتشف خدماتنا',
    phone: 'اتصل بنا'
  }
}

export default function Hero({ language }: HeroProps) {
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

  const getTitle = () => {
    if (language === 'fr') {
      return settings.hero_title_fr || defaultTranslations.fr.title
    }
    return settings.hero_title_ar || defaultTranslations.ar.title
  }

  const getSubtitle = () => {
    if (language === 'fr') {
      return settings.hero_subtitle_fr || defaultTranslations.fr.subtitle
    }
    return settings.hero_subtitle_ar || defaultTranslations.ar.subtitle
  }

  const getPhoneNumber = () => {
    return settings.business_phone_1 ? `+216${settings.business_phone_1}` : '+21626503701'
  }

  const t = defaultTranslations[language]

  if (loading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-earth-100">
        <div className="loader"></div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-earth-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative z-10 container-max text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Prominent leaf emoji above title */}
          <div className="mb-6">
            <span className="text-6xl md:text-8xl animate-pulse text-green-500 drop-shadow-lg">🌿</span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${language === 'ar' ? 'arabic-text text-center' : ''}`}>
            <span className="text-primary-700">{getTitle()}</span>
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed ${language === 'ar' ? 'arabic-text text-center' : ''}`}>
            {getSubtitle()}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn-primary text-lg px-8 py-4 ${language === 'ar' ? 'arabic-text font-medium' : ''}`}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.cta}
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${getPhoneNumber()}`}
              className={`btn-secondary text-lg px-8 py-4 flex items-center ${language === 'ar' ? 'gap-3 flex-row-reverse arabic-text font-medium' : 'gap-3'}`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{t.phone}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-primary-200 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-earth-300 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
