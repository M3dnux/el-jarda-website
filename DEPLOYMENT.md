# Guide de Déploiement - El Jarda

## 📋 Prérequis
- Compte GitHub
- Compte Koyeb
- Base de données PostgreSQL configurée sur Koyeb

## 🚀 Étapes de Déploiement

### 1. Préparation du Repository GitHub

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - El Jarda website by Ayoub Zouch"

# Créer la branche main
git branch -M main

# Ajouter l'origine GitHub (remplacez par votre URL)
git remote add origin https://github.com/votre-username/el-jarda-website.git

# Pousser vers GitHub
git push -u origin main
```

### 2. Configuration sur Koyeb

1. **Connecter le Repository**
   - Allez sur koyeb.com
   - Créez une nouvelle app
   - Connectez votre repository GitHub

2. **Configuration Build**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: Laissez vide (utilisera $PORT automatiquement)

3. **Variables d'Environnement** ⚠️ IMPORTANT
   Ajoutez ces variables exactement comme indiqué :

   ```
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

   ⚠️ **Important: Assurez-vous de configurer votre nom de domaine eljarda.com pour pointer vers Koyeb**

### 3. Configuration du Domaine Personnalisé

1. **Sur Koyeb:**
   - Allez dans les paramètres de votre app
   - Section "Domains"
   - Ajoutez le domaine `eljarda.com`
   - Notez l'adresse CNAME fournie par Koyeb

2. **Chez votre registraire de domaine:**
   - Ajoutez un enregistrement CNAME :
     - Nom: `@` (ou laissez vide pour le domaine racine)
     - Valeur: L'adresse CNAME fournie par Koyeb
   - Pour le sous-domaine www, ajoutez aussi :
     - Nom: `www`
     - Valeur: L'adresse CNAME fournie par Koyeb

3. **Vérification:**
   - Attendez la propagation DNS (15-30 minutes)
   - Testez `https://eljarda.com`
   - Testez `https://www.eljarda.com`

### 4. Déploiement

1. Cliquez sur "Deploy"
2. Attendez la fin du build (2-3 minutes)
3. Les tables de base de données seront créées automatiquement
4. Les données d'exemple seront insérées

### 5. Vérification Post-Déploiement

1. **Site Public** ✅
   - Visitez `https://eljarda.com`
   - Testez la navigation français/arabe
   - Vérifiez le formulaire de contact
   - **Tous les textes sont maintenant chargés depuis la base de données**

2. **Panel Admin** ✅
   - Allez sur `https://eljarda.com/admin`
   - Connectez-vous avec les identifiants de la base de données
   - **L'authentification est maintenant entièrement basée sur la base de données**

3. **Test Email** ✅
   - Envoyez un message via le formulaire de contact
   - Vérifiez la réception sur l'email configuré en base

4. **Configuration Dynamique** ✅
   - Tous les contenus (titres, descriptions, contact) sont chargés depuis la table `settings`
   - Les produits et catégories sont entièrement gérés en base
   - Aucune valeur n'est codée en dur dans le code

## 🔧 Maintenance

### Mise à jour du contenu
1. Modifiez le code localement
2. Committez les changements
3. Poussez vers GitHub
4. Koyeb redéploiera automatiquement

### Gestion des produits
- Utilisez le panel admin pour ajouter/modifier les produits
- Gérez les catégories et le stock
- Consultez les messages clients

## 📞 Support

En cas de problème :
- Vérifiez les logs sur Koyeb
- Assurez-vous que toutes les variables d'environnement sont correctes
- Contactez Ayoub Zouch pour les questions spécifiques au business

## 🔐 Sécurité

- ✅ Mot de passe admin sécurisé
- ✅ Variables d'environnement protégées
- ✅ Tokens JWT pour l'authentification
- ✅ Hachage des mots de passe avec bcrypt
- ✅ Protection CSRF
- ✅ Validation des entrées utilisateur
