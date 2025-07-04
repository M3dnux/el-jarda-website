'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface ContactProps {
  language: 'fr' | 'ar'
}

interface Settings {
  business_address?: string
  business_phone_1?: string
  business_phone_2?: string
  business_email?: string
  facebook_url?: string
  instagram_url?: string
}

const translations = {
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Vous avez une question ou souhaitez prendre rendez-vous ? N\'hésitez pas à nous contacter',
    name: 'Nom complet',
    email: 'Email',
    phone: 'Téléphone (optionnel)',
    message: 'Message',
    type: 'Type de demande',
    question: 'Question générale',
    appointment: 'Prise de rendez-vous',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Message envoyé avec succès!',
    error: 'Erreur lors de l\'envoi du message',
    required: 'Ce champ est requis'
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'لديك سؤال أو تريد حجز موعد؟ لا تتردد في التواصل معنا',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف (اختياري)',
    message: 'الرسالة',
    type: 'نوع الطلب',
    question: 'سؤال عام',
    appointment: 'حجز موعد',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال الرسالة بنجاح!',
    error: 'خطأ في إرسال الرسالة',
    required: 'هذا الحقل مطلوب'
  }
}

export default function Contact({ language }: ContactProps) {
  const [settings, setSettings] = useState<Settings>({})
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'question'
  })
  const [loading, setLoading] = useState(false)
  const t = translations[language]

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
        setLoadingSettings(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.required)
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(t.success)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          type: 'question'
        })
      } else {
        toast.error(t.error)
      }
    } catch (error) {
      toast.error(t.error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="section-padding bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'ar' ? 'arabic-text' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${language === 'ar' ? 'rtl' : ''}`}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${language === 'ar' ? 'text-right' : ''}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${language === 'ar' ? 'text-right' : ''}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${language === 'ar' ? 'text-right' : ''}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                  {t.type}
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`input-field ${language === 'ar' ? 'text-right' : ''}`}
                >
                  <option value="question">{t.question}</option>
                  <option value="appointment">{t.appointment}</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                  {t.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`input-field resize-none ${language === 'ar' ? 'text-right' : ''}`}
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full btn-primary flex items-center justify-center ${language === 'ar' ? 'gap-2' : 'space-x-2'}`}
              >
                {loading ? (
                  <>
                    <div className="loader w-5 h-5"></div>
                    <span>{t.sending}</span>
                  </>
                ) : (
                  <span>{t.send}</span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-primary-50 p-8 rounded-xl">
              <h3 className={`text-xl font-bold text-gray-900 mb-6 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                {language === 'fr' ? 'Informations de contact' : 'معلومات الاتصال'}
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className={`font-medium text-gray-900 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                      {language === 'fr' ? 'Adresse' : 'العنوان'}
                    </p>
                    <p className={`text-gray-600 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                      {settings.business_address || (language === 'fr' ? 'Route Teniour Km 6, Chihia, Sfax' : 'طريق تنيور كم 6، شيحية، صفاقس')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className={`font-medium text-gray-900 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                      {language === 'fr' ? 'Téléphone' : 'الهاتف'}
                    </p>
                    {settings.business_phone_1 && (
                      <p className={`text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>{settings.business_phone_1}</p>
                    )}
                    {settings.business_phone_2 && (
                      <p className={`text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>{settings.business_phone_2}</p>
                    )}
                    {!settings.business_phone_1 && !settings.business_phone_2 && (
                      <>
                        <p className={`text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>26 503 701</p>
                        <p className={`text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>40 279 250</p>
                      </>
                    )}
                  </div>
                </div>

                <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className={`font-medium text-gray-900 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                      {language === 'fr' ? 'Email' : 'البريد الإلكتروني'}
                    </p>
                    <p className={`text-gray-600 ${language === 'ar' ? 'text-right' : ''}`}>{settings.business_email || 'contact@eljarda.com'}</p>
                  </div>
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
            </div>

            {/* Quick Actions */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${language === 'ar' ? 'rtl' : ''}`}>
              <a
                href={`tel:+216${settings.business_phone_1?.replace(/\s+/g, '') || '26503701'}`}
                className={`btn-primary text-center flex items-center justify-center ${language === 'ar' ? 'gap-2' : 'space-x-2'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{language === 'fr' ? 'Appeler' : 'اتصال'}</span>
              </a>
              <a
                href={`mailto:${settings.business_email || 'contact@eljarda.com'}`}
                className={`btn-secondary text-center flex items-center justify-center ${language === 'ar' ? 'gap-2' : 'space-x-2'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{language === 'fr' ? 'Email' : 'بريد إلكتروني'}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
