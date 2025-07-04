'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AboutProps {
  language: 'fr' | 'ar'
}

interface Settings {
  about_description_fr?: string
  about_description_ar?: string
  business_address?: string
  business_phone_1?: string
  business_phone_2?: string
  business_email?: string
  facebook_url?: string
  instagram_url?: string
}

const translations = {
  fr: {
    title: 'À Propos d\'El Jarda',
    description: 'Dirigé par Ayoub Zouch, spécialisé dans l\'entretien et l\'aménagement de jardins à Sfax, El Jarda vous accompagne depuis des années dans la création et la maintenance de vos espaces verts. Notre expertise locale et notre passion pour la nature nous permettent de vous offrir des solutions adaptées au climat tunisien.',
    experience: 'Années d\'expérience',
    clients: 'Clients satisfaits',
    products: 'Produits disponibles',
    services: 'Nos Services',
    serviceList: [
      'Conception et aménagement de jardins',
      'Entretien régulier d\'espaces verts',
      'Vente d\'outils et équipements',
      'Conseils en jardinage adapté au climat local',
      'Installation de systèmes d\'irrigation',
      'Taille et élagage professionnel'
    ],
    contact: {
      address: 'Route Teniour Km 6, Chihia, Sfax',
      phone: '26 503 701 / 40 279 250',
      email: 'contact@eljarda.com'
    }
  },
  ar: {
    title: 'حول الجردة',
    description: 'بقيادة أيوب زوش، متخصصون في صيانة وتنسيق الحدائق في صفاقس، الجردة ترافقكم منذ سنوات في إنشاء وصيانة مساحاتكم الخضراء. خبرتنا المحلية وشغفنا بالطبيعة يمكننا من تقديم حلول مناسبة للمناخ التونسي.',
    experience: 'سنوات من الخبرة',
    clients: 'عميل راض',
    products: 'منتج متوفر',
    services: 'خدماتنا',
    serviceList: [
      'تصميم وتنسيق الحدائق',
      'الصيانة الدورية للمساحات الخضراء',
      'بيع الأدوات والمعدات',
      'نصائح في البستنة المناسبة للمناخ المحلي',
      'تركيب أنظمة الري',
      'التقليم والتشذيب المهني'
    ],
    contact: {
      address: 'طريق تنيور كم 6، شيحية، صفاقس',
      phone: '26 503 701 / 40 279 250',
      email: 'contact@eljarda.com'
    }
  }
}

export default function About({ language }: AboutProps) {
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
    if (language === 'fr') {
      return settings.about_description_fr || translations.fr.description
    }
    return settings.about_description_ar || translations.ar.description
  }

  const getContactInfo = () => {
    const phoneDisplay = settings.business_phone_1 && settings.business_phone_2 
      ? `${settings.business_phone_1} / ${settings.business_phone_2}`
      : translations[language].contact.phone

    return {
      address: settings.business_address || translations[language].contact.address,
      phone: phoneDisplay,
      email: settings.business_email || translations[language].contact.email
    }
  }

  const t = translations[language]
  const contactInfo = getContactInfo()

  if (loading) {
    return (
      <section id="about" className="section-padding bg-white">
        <div className="container-max">
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section-padding bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${language === 'ar' ? 'arabic-text' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed ${language === 'ar' ? 'arabic-text' : ''}`}>
            {getDescription()}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
            <div className={`text-gray-600 ${language === 'ar' ? 'arabic-text' : ''}`}>{t.experience}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className={`text-gray-600 ${language === 'ar' ? 'arabic-text' : ''}`}>{t.clients}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
            <div className={`text-gray-600 ${language === 'ar' ? 'arabic-text' : ''}`}>{t.products}</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
              {t.services}
            </h3>
            <div className="space-y-4">
              {t.serviceList.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                  <span className={`text-gray-700 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-primary-50 p-8 rounded-xl"
          >
            <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
              {language === 'fr' ? 'Nous Contacter' : 'تواصل معنا'}
            </h3>
            <div className="space-y-4">
              <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={`text-gray-700 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>{contactInfo.address}</span>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className={`text-gray-700 ${language === 'ar' ? 'text-right' : ''}`}>{contactInfo.phone}</span>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className={`text-gray-700 ${language === 'ar' ? 'text-right' : ''}`}>{contactInfo.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className={`mt-6 flex gap-4 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
              <a
                href={settings.facebook_url || "https://www.facebook.com/profile.php?id=61573780066854"}
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
                href={settings.instagram_url || "https://www.instagram.com/el_jarda/"}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
