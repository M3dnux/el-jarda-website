# El Jarda - Garden Maintenance & Landscaping Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

</div>

A modern, bilingual (French/Arabic) website for a professional garden maintenance and landscaping business. Features a comprehensive admin panel for complete content management.

## ✨ Key Features

### For Visitors
- **Bilingual Experience** - French/Arabic with RTL support
- **Product Catalog** - Browse plants, tools, and supplies by category
- **Contact Forms** - Direct communication with the business
- **Responsive Design** - Perfect on all devices

### For Business Owners
- **Admin Dashboard** - Complete website management without technical knowledge
- **Product Management** - Add/edit products with images and descriptions
- **Message Center** - Handle customer inquiries
- **Content Control** - Update business info, descriptions, and settings

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js API routes, PostgreSQL database
- **Security**: JWT authentication, bcrypt password hashing
- **Features**: Framer Motion animations, React Hook Form, Email integration
- **Deployment**: Koyeb/Heroku ready with SSL support

## 🏗️ Architecture

```
app/
├── page.tsx           # Bilingual homepage
├── admin/page.tsx     # Protected admin dashboard
└── api/               # Backend API routes
    ├── admin/         # Admin management
    ├── products/      # Product CRUD
    ├── categories/    # Category management
    └── contact/       # Contact form handler

components/
├── Header.tsx         # Navigation with language toggle
├── Products.tsx       # Product catalog
├── Contact.tsx        # Contact form
└── ...               # Other UI components
```

## 🌐 Database Schema

- **users** - Admin authentication
- **products** - Product catalog with images
- **categories** - Product organization
- **contact_messages** - Customer inquiries
- **settings** - Site configuration

## 🚀 Deployment

### Hosting
- **Primary**: Koyeb (Node.js optimized)
- **Alternative**: Heroku compatible
- **Database**: PostgreSQL cloud (Neon, Supabase, Railway, AWS RDS)
- **SSL**: Automatic HTTPS certificate management

## 🎯 Perfect For

Garden maintenance businesses, plant nurseries, and any company needing:
- Bilingual Arabic/French support
- Professional web presence
- Easy content management
- Customer communication tools

---

*Modern design meets powerful functionality - easy for businesses to showcase services while maintaining complete control over content.*
