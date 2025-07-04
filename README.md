# El Jarda - Website pour Ayoub Zouch

Site web professionnel pour El Jarda, services de jardinage à Sfax, Tunisie.

## Fonctionnalités

- 🌱 Site vitrine bilingue (Français/Arabe)
- 📱 Design responsive et moderne
- 🛒 Catalogue de produits de jardinage
- 📧 Formulaire de contact avec envoi d'emails
- 🔧 Panel d'administration pour gérer les produits
- 🔐 Système d'authentification sécurisé
- 📊 Gestion des catégories et du stock

## Technologies

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Base de données**: PostgreSQL (Koyeb)
- **Email**: Nodemailer avec Zoho Mail
- **Authentification**: bcryptjs, JWT
- **Hébergement**: Koyeb

## Variables d'environnement

**IMPORTANT: PLUS DE VALEURS CODÉES EN DUR!**

Toutes les données de configuration (informations commerciales, identifiants admin, contenu du site) sont maintenant stockées dans la base de données PostgreSQL via la table `settings`. 

Créez les variables d'environnement suivantes sur Koyeb :

```env
DATABASE_HOST=ep-red-queen-a2fi4ulj.eu-central-1.pg.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=npg_EOoCZqiS6de8
DATABASE_NAME=koyebdb

EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USER=contact@eljarda.com
EMAIL_PASS=sCqkTXLa3wUJ

NEXTAUTH_SECRET=eljarda-secret-key-2025-ayoub-zouch-gardener-sfax
NEXTAUTH_URL=https://eljarda.com

ADMIN_EMAIL=admin@eljarda.com
ADMIN_PASSWORD=ElJarda2025Admin!
```

### Configuration dynamique

- **Informations commerciales**: Nom du propriétaire, adresse, téléphones, email
- **Contenu du site**: Titres, descriptions, textes héro en français et arabe
- **Réseaux sociaux**: URLs Facebook et Instagram
- **Authentification admin**: Stockée de manière sécurisée avec hachage bcrypt
- **Produits et catégories**: Entièrement gérés via la base de données

## Déploiement sur Koyeb

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - El Jarda website"
   git branch -M main
   git remote add origin https://github.com/votre-username/el-jarda-website.git
   git push -u origin main
   ```

2. **Déployer sur Koyeb**
   - Connectez votre repository GitHub à Koyeb
   - Ajoutez toutes les variables d'environnement
   - Le build et la migration de base de données se feront automatiquement

3. **Post-déploiement**
   - Les tables de base de données seront créées automatiquement
   - Un compte administrateur sera créé avec les identifiants configurés
   - Le site sera accessible à votre URL Koyeb

## Utilisation

### Interface utilisateur
- Consultation des produits en français et arabe
- Formulaire de contact pour questions et rendez-vous
- Navigation intuitive et responsive

### Panel d'administration
- Accès via `/admin`
- Gestion des produits (ajout, modification, stock)
- Gestion des catégories
- Consultation des messages de contact
- Changement de mot de passe

## Contact

- **Jardinier**: Ayoub Zouch
- **Email**: contact@eljarda.com
- **Téléphone**: 26 503 701 / 40 279 250
- **Adresse**: Route Teniour Km 6, Chihia, Sfax
- **Facebook**: https://www.facebook.com/profile.php?id=61573780066854
- **Instagram**: https://www.instagram.com/el_jarda/
