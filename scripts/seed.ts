import sql from '../lib/db'
import { hashPassword } from '../lib/auth'

export async function seedDatabase() {
  try {
    // Create admin user from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@eljarda.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'ElJarda2025Admin!'
    
    const hashedPassword = await hashPassword(adminPassword)
    await sql`
      INSERT INTO users (email, password, role)
      VALUES (${adminEmail}, ${hashedPassword}, 'admin')
      ON CONFLICT (email) DO UPDATE SET 
        password = EXCLUDED.password,
        updated_at = CURRENT_TIMESTAMP
    `

    // Create website settings
    const settings = [
      {
        key: 'site_name',
        value: 'El Jarda',
        description: 'Website name'
      },
      {
        key: 'owner_name',
        value: 'Ayoub Zouch',
        description: 'Business owner name'
      },
      {
        key: 'business_address',
        value: 'Route Teniour Km 6, Chihia, Sfax',
        description: 'Business address'
      },
      {
        key: 'business_phone_1',
        value: '26503701',
        description: 'Primary phone number'
      },
      {
        key: 'business_phone_2',
        value: '40279250',
        description: 'Secondary phone number'
      },
      {
        key: 'business_email',
        value: 'contact@eljarda.com',
        description: 'Business email'
      },
      {
        key: 'facebook_url',
        value: 'https://www.facebook.com/profile.php?id=61573780066854',
        description: 'Facebook page URL'
      },
      {
        key: 'instagram_url',
        value: 'https://www.instagram.com/el_jarda/',
        description: 'Instagram page URL'
      },
      {
        key: 'site_description_fr',
        value: 'Services de jardinage professionnel avec Ayoub Zouch à Sfax, Tunisie. Outils, conseils et entretien de jardins.',
        description: 'Site description in French'
      },
      {
        key: 'site_description_ar',
        value: 'خدمات البستنة المهنية مع أيوب زوش في صفاقس، تونس. أدوات ونصائح وصيانة الحدائق.',
        description: 'Site description in Arabic'
      },
      {
        key: 'hero_title_fr',
        value: 'Votre Expert en Jardinage à Sfax',
        description: 'Hero section title in French'
      },
      {
        key: 'hero_title_ar',
        value: 'خبيرك في البستنة في صفاقس',
        description: 'Hero section title in Arabic'
      },
      {
        key: 'hero_subtitle_fr',
        value: 'Avec Ayoub Zouch, transformez votre espace extérieur avec nos services professionnels et nos produits de qualité',
        description: 'Hero section subtitle in French'
      },
      {
        key: 'hero_subtitle_ar',
        value: 'مع أيوب زوش، حوّل مساحتك الخارجية بخدماتنا المهنية ومنتجاتنا عالية الجودة',
        description: 'Hero section subtitle in Arabic'
      },
      {
        key: 'about_description_fr',
        value: 'Dirigé par Ayoub Zouch, spécialisé dans l\'entretien et l\'aménagement de jardins à Sfax, El Jarda vous accompagne depuis des années dans la création et la maintenance de vos espaces verts. Notre expertise locale et notre passion pour la nature nous permettent de vous offrir des solutions adaptées au climat tunisien.',
        description: 'About section description in French'
      },
      {
        key: 'about_description_ar',
        value: 'بقيادة أيوب زوش، متخصصون في صيانة وتنسيق الحدائق في صفاقس، الجردة ترافقكم منذ سنوات في إنشاء وصيانة مساحاتكم الخضراء. خبرتنا المحلية وشغفنا بالطبيعة يمكننا من تقديم حلول مناسبة للمناخ التونسي.',
        description: 'About section description in Arabic'
      }
    ]

    for (const setting of settings) {
      await sql`
        INSERT INTO settings (key, value, description)
        VALUES (${setting.key}, ${setting.value}, ${setting.description})
        ON CONFLICT (key) DO UPDATE SET 
          value = EXCLUDED.value,
          updated_at = CURRENT_TIMESTAMP
      `
    }

    // Create categories
    const categories = [
      {
        name_fr: 'Outils de jardinage',
        name_ar: 'أدوات البستنة',
        description_fr: 'Outils essentiels pour l\'entretien du jardin',
        description_ar: 'الأدوات الأساسية لصيانة الحديقة'
      },
      {
        name_fr: 'Engrais et fertilisants',
        name_ar: 'الأسمدة والمخصبات',
        description_fr: 'Produits pour nourrir vos plantes',
        description_ar: 'منتجات لتغذية النباتات'
      },
      {
        name_fr: 'Semences et plants',
        name_ar: 'البذور والشتلات',
        description_fr: 'Graines et jeunes plants pour votre jardin',
        description_ar: 'البذور والنباتات الصغيرة لحديقتك'
      },
      {
        name_fr: 'Systèmes d\'irrigation',
        name_ar: 'أنظمة الري',
        description_fr: 'Solutions d\'arrosage automatique et manuel',
        description_ar: 'حلول الري التلقائي واليدوي'
      }
    ]

    for (const category of categories) {
      await sql`
        INSERT INTO categories (name_fr, name_ar, description_fr, description_ar)
        VALUES (${category.name_fr}, ${category.name_ar}, ${category.description_fr}, ${category.description_ar})
        ON CONFLICT DO NOTHING
      `
    }

    // Get category IDs
    const categoryResults = await sql`SELECT * FROM categories LIMIT 4`
    
    // Create sample products
    const products = [
      {
        name_fr: 'Bêche professionnelle',
        name_ar: 'مجرفة مهنية',
        description_fr: 'Bêche robuste en acier inoxydable avec manche ergonomique',
        description_ar: 'مجرفة قوية من الستانلس ستيل مع مقبض مريح',
        price: 45.00,
        category_id: categoryResults[0].id,
        stock: 25,
        reference: 'TOOL001'
      },
      {
        name_fr: 'Sécateur de qualité',
        name_ar: 'مقص تقليم عالي الجودة',
        description_fr: 'Sécateur ergonomique pour la taille précise des branches',
        description_ar: 'مقص تقليم مريح للتقليم الدقيق للأغصان',
        price: 35.00,
        category_id: categoryResults[0].id,
        stock: 30,
        reference: 'TOOL002'
      },
      {
        name_fr: 'Engrais bio universel',
        name_ar: 'سماد عضوي شامل',
        description_fr: 'Engrais biologique adapté à tous types de plantes',
        description_ar: 'سماد عضوي مناسب لجميع أنواع النباتات',
        price: 25.00,
        category_id: categoryResults[1].id,
        stock: 50,
        reference: 'FERT001'
      },
      {
        name_fr: 'Graines de tomates',
        name_ar: 'بذور الطماطم',
        description_fr: 'Graines de tomates variété locale adaptée au climat tunisien',
        description_ar: 'بذور طماطم صنف محلي مناسب للمناخ التونسي',
        price: 8.00,
        category_id: categoryResults[2].id,
        stock: 100,
        reference: 'SEED001'
      },
      {
        name_fr: 'Kit d\'arrosage goutte à goutte',
        name_ar: 'طقم الري بالتنقيط',
        description_fr: 'Système d\'irrigation économique et efficace',
        description_ar: 'نظام ري اقتصادي وفعال',
        price: 65.00,
        category_id: categoryResults[3].id,
        stock: 15,
        reference: 'IRR001'
      }
    ]

    for (const product of products) {
      await sql`
        INSERT INTO products (name_fr, name_ar, description_fr, description_ar, price, category_id, stock, reference)
        VALUES (${product.name_fr}, ${product.name_ar}, ${product.description_fr}, ${product.description_ar}, 
                ${product.price}, ${product.category_id}, ${product.stock}, ${product.reference})
        ON CONFLICT (reference) DO NOTHING
      `
    }

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
