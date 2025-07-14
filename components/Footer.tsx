import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  language: 'fr' | 'ar'
}

interface Settings {
  business_address?: string
  business_phone_1?: string
  business_phone_2?: string
  business_email?: string
  facebook_url?: string
  instagram_url?: string
  owner_name?: string
  site_name?: string
}

const translations = {
  fr: {
    description: 'Dirigé par Ayoub Zouch, votre partenaire de confiance pour tous vos besoins en jardinage à Sfax, Tunisie.',
    quickLinks: 'Liens rapides',
    contact: 'Contact',
    services: 'Services',
    products: 'Produits',
    about: 'À propos',
    rights: 'Tous droits réservés.',
    followUs: 'Suivez-nous'
  },
  ar: {
    description: 'بقيادة أيوب زوش، شريكك الموثوق لجميع احتياجاتك في البستنة في صفاقس، تونس.',
    quickLinks: 'روابط سريعة',
    contact: 'اتصل بنا',
    services: 'الخدمات',
    products: 'المنتجات',
    about: 'حولنا',
    rights: 'جميع الحقوق محفوظة.',
    followUs: 'تابعنا'
  }
}

export default function Footer({ language }: FooterProps) {
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

  const getDescription = () => {
    const ownerName = settings.owner_name || 'Ayoub Zouch'
    if (language === 'fr') {
      return `Dirigé par ${ownerName}, votre partenaire de confiance pour tous vos besoins en jardinage à Sfax, Tunisie.`
    }
    return `بقيادة ${ownerName}، شريكك الموثوق لجميع احتياجاتك في البستنة في صفاقس، تونس.`
  }

  const getContactInfo = () => {
    const phoneDisplay = settings.business_phone_1 && settings.business_phone_2 
      ? `${settings.business_phone_1} / ${settings.business_phone_2}`
      : '26 503 701 / 40 279 250'

    return {
      address: settings.business_address || 'Route Teniour Km 6, Chihia, Sfax',
      phone: phoneDisplay,
      email: settings.business_email || 'contact@eljarda.com'
    }
  }

  const getSiteName = () => {
    return settings.site_name || 'El Jarda'
  }

  const getSocialLinks = () => {
    return {
      facebook: settings.facebook_url || 'https://www.facebook.com/profile.php?id=61573780066854',
      instagram: settings.instagram_url || 'https://www.instagram.com/el_jarda/'
    }
  }

  const t = translations[language]
  const contactInfo = getContactInfo()
  const socialLinks = getSocialLinks()
  const siteName = getSiteName()
  const currentYear = new Date().getFullYear()

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="container-max section-padding">
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-max section-padding">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}>
          {/* Company Info */}
          <div className={`lg:col-span-2 ${language === 'ar' ? 'md:order-1 lg:order-1' : ''}`}>
            <Link href="/" className={`flex items-center mb-4 hover:opacity-80 transition-opacity cursor-pointer ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className={`text-2xl font-bold ${language === 'ar' ? 'arabic-text' : ''}`}>{siteName}</span>
                <Image 
                  src="/el_jarda.png" 
                  alt="El Jarda Logo" 
                  width={48} 
                  height={48}
                  className="rounded-full"
                />
              </div>
            </Link>
            <p className={`text-gray-300 mb-6 leading-relaxed max-w-md ${language === 'ar' ? 'arabic-text text-right' : 'text-left'}`}>
              {getDescription()}
            </p>
            <div className={`flex gap-4 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 6.71.048 5.493.087 4.73.222 4.058.42a5.916 5.916 0 0 0-2.134 1.404A5.916 5.916 0 0 0 .42 4.058C.222 4.73.087 5.493.048 6.71.01 7.929 0 8.396 0 12.017s.01 4.087.048 5.306c.039 1.217.174 1.98.372 2.652a5.916 5.916 0 0 0 1.404 2.134 5.916 5.916 0 0 0 2.134 1.404c.672.198 1.435.333 2.652.372 1.219.038 1.686.048 5.306.048s4.087-.01 5.306-.048c1.217-.039 1.98-.174 2.652-.372a5.916 5.916 0 0 0 2.134-1.404 5.916 5.916 0 0 0 1.404-2.134c.198-.672.333-1.435.372-2.652.038-1.219.048-1.686.048-5.306s-.01-4.087-.048-5.306c-.039-1.217-.174-1.98-.372-2.652a5.916 5.916 0 0 0-1.404-2.134A5.916 5.916 0 0 0 19.676.42c-.672-.198-1.435-.333-2.652-.372C16.805.01 16.338 0 12.017 0zM12.017 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12.017 16a3.838 3.838 0 1 1 0-7.676 3.838 3.838 0 0 1 0 7.676zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info - appears second in Arabic */}
          <div className={`${language === 'ar' ? 'text-right md:order-2 lg:order-2' : 'text-left'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.contact}
            </h3>
            <div className="space-y-3">
              <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={`text-gray-300 text-sm leading-relaxed ${language === 'ar' ? 'arabic-text' : ''}`}>
                  {contactInfo.address}
                </span>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className={`text-gray-300 text-sm ${language === 'ar' ? 'arabic-text' : ''}`}>{contactInfo.phone}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className={`text-gray-300 text-sm ${language === 'ar' ? 'arabic-text' : ''}`}>{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links - appears last in Arabic */}
          <div className={`${language === 'ar' ? 'text-right md:order-3 lg:order-3' : 'text-left'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className={`text-gray-300 hover:text-primary-400 transition-colors block ${language === 'ar' ? 'arabic-text' : ''}`}>
                  {language === 'fr' ? 'Accueil' : 'الرئيسية'}
                </a>
              </li>
              <li>
                <a href="#about" className={`text-gray-300 hover:text-primary-400 transition-colors block ${language === 'ar' ? 'arabic-text' : ''}`}>
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#products" className={`text-gray-300 hover:text-primary-400 transition-colors block ${language === 'ar' ? 'arabic-text' : ''}`}>
                  {t.products}
                </a>
              </li>
              <li>
                <a href="#contact" className={`text-gray-300 hover:text-primary-400 transition-colors block ${language === 'ar' ? 'arabic-text' : ''}`}>
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className={`text-gray-400 text-sm ${language === 'ar' ? 'arabic-text' : ''}`}>
            © {currentYear} {siteName}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
