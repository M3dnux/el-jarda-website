'use client'

import React from 'react'

interface ProductsProps {
  language: 'fr' | 'ar'
}

export default function Products({ language }: ProductsProps) {
  const isArabic = language === 'ar'

  return (
    <section id="products" className={`py-20 bg-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic ? 'منتجاتنا' : 'Nos Produits'}
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic 
              ? 'اكتشف مجموعتنا المختارة من منتجات الحدائق الطبيعية والعضوية'
              : 'Découvrez notre sélection de produits naturels et biologiques pour votre jardin'
            }
          </p>
        </div>

        <div className="text-center py-12">
          <p className={`text-gray-600 text-lg ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic ? 'المنتجات ستكون متاحة قريباً' : 'Les produits seront bientôt disponibles'}
          </p>
        </div>

        <div className="text-center mt-16">
          <p className={`text-lg text-gray-600 mb-6 ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic 
              ? 'هل تريد معرفة المزيد عن منتجاتنا؟'
              : 'Vous souhaitez en savoir plus sur nos produits ?'
            }
          </p>
          <a
            href="#contact"
            className={`inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold ${isArabic ? 'arabic-text' : ''}`}
          >
            {isArabic ? 'اتصل بنا' : 'Nous contacter'}
          </a>
        </div>
      </div>
    </section>
  )
}
