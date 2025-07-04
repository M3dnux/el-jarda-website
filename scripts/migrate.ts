import sql from '../lib/db'

// Helper function to check if a migration version has been applied
async function migrationApplied(version: string): Promise<boolean> {
  try {
    if (!(await tableExists('migration_versions'))) {
      return false
    }
    const result = await sql`
      SELECT EXISTS (
        SELECT 1 FROM migration_versions 
        WHERE version = ${version}
      )
    `
    return result[0].exists
  } catch (error) {
    console.error(`Error checking migration version ${version}:`, error)
    return false
  }
}

// Helper function to mark a migration as applied
async function markMigrationApplied(version: string, description: string) {
  try {
    await sql`
      INSERT INTO migration_versions (version, description) 
      VALUES (${version}, ${description})
      ON CONFLICT (version) DO NOTHING
    `
    console.log(`✓ Migration ${version} marked as applied`)
  } catch (error) {
    console.error(`Error marking migration ${version} as applied:`, error)
  }
}

// Helper function to check if a table exists
async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      )
    `
    return result[0].exists
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error)
    return false
  }
}

// Helper function to check if a column exists
async function columnExists(tableName: string, columnName: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
        AND column_name = ${columnName}
      )
    `
    return result[0].exists
  } catch (error) {
    console.error(`Error checking if column ${columnName} exists in ${tableName}:`, error)
    return false
  }
}

export async function createTables() {
  try {
    console.log('Running database migrations...')
    
    // Create migration_versions table first to track schema versions
    if (!(await tableExists('migration_versions'))) {
      console.log('Creating migration_versions table...')
      await sql`
        CREATE TABLE migration_versions (
          id SERIAL PRIMARY KEY,
          version VARCHAR(50) UNIQUE NOT NULL,
          description TEXT,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Migration_versions table created')
    } else {
      console.log('✓ Migration_versions table already exists')
    }
    
    // Create settings table if it doesn't exist
    if (!(await tableExists('settings'))) {
      console.log('Creating settings table...')
      await sql`
        CREATE TABLE settings (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255) UNIQUE NOT NULL,
          value TEXT,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Settings table created')
    } else {
      console.log('✓ Settings table already exists')
    }

    // Create users table if it doesn't exist
    if (!(await tableExists('users'))) {
      console.log('Creating users table...')
      await sql`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          reset_token VARCHAR(500),
          reset_token_expiry TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Users table created')
    } else {
      console.log('✓ Users table already exists')
    }

    // Create categories table if it doesn't exist
    if (!(await tableExists('categories'))) {
      console.log('Creating categories table...')
      await sql`
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name_fr VARCHAR(255) NOT NULL,
          name_ar VARCHAR(255) NOT NULL,
          description_fr TEXT,
          description_ar TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Categories table created')
    } else {
      console.log('✓ Categories table already exists')
    }

    // Create products table if it doesn't exist
    if (!(await tableExists('products'))) {
      console.log('Creating products table...')
      await sql`
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name_fr VARCHAR(255) NOT NULL,
          name_ar VARCHAR(255) NOT NULL,
          description_fr TEXT,
          description_ar TEXT,
          price DECIMAL(10,2) NOT NULL,
          category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
          stock INTEGER DEFAULT 0,
          image_url VARCHAR(500),
          reference VARCHAR(100) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Products table created')
    } else {
      console.log('✓ Products table already exists')
    }

    // Create contact_messages table if it doesn't exist
    if (!(await tableExists('contact_messages'))) {
      console.log('Creating contact_messages table...')
      await sql`
        CREATE TABLE contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          message TEXT NOT NULL,
          type VARCHAR(20) DEFAULT 'question',
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log('✓ Contact_messages table created')
    } else {
      console.log('✓ Contact_messages table already exists')
    }

    // Run schema updates
    await runSchemaUpdates()

    console.log('✅ Database migrations completed successfully')
  } catch (error) {
    console.error('❌ Error during migrations:', error)
    throw error
  }
}

export async function runSchemaUpdates() {
  console.log('Checking for schema updates...')
  
  try {
    // Version 1.1.0: Add description columns to categories
    if (!(await migrationApplied('1.1.0'))) {
      console.log('Running migration 1.1.0: Adding description columns to categories...')
      
      if (await tableExists('categories')) {
        if (!(await columnExists('categories', 'description_fr'))) {
          await sql`ALTER TABLE categories ADD COLUMN description_fr TEXT`
          console.log('✓ Added description_fr to categories')
        }
        
        if (!(await columnExists('categories', 'description_ar'))) {
          await sql`ALTER TABLE categories ADD COLUMN description_ar TEXT`
          console.log('✓ Added description_ar to categories')
        }
      }
      
      await markMigrationApplied('1.1.0', 'Added description columns to categories table')
    }

    // Version 1.2.0: Add missing columns to products table
    if (!(await migrationApplied('1.2.0'))) {
      console.log('Running migration 1.2.0: Adding missing columns to products...')
      
      if (await tableExists('products')) {
        if (!(await columnExists('products', 'description_fr'))) {
          await sql`ALTER TABLE products ADD COLUMN description_fr TEXT`
          console.log('✓ Added description_fr to products')
        }
        
        if (!(await columnExists('products', 'description_ar'))) {
          await sql`ALTER TABLE products ADD COLUMN description_ar TEXT`
          console.log('✓ Added description_ar to products')
        }
        
        if (!(await columnExists('products', 'image_url'))) {
          await sql`ALTER TABLE products ADD COLUMN image_url VARCHAR(500)`
          console.log('✓ Added image_url to products')
        }
        
        if (!(await columnExists('products', 'stock'))) {
          await sql`ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0`
          console.log('✓ Added stock to products')
        }
        
        if (!(await columnExists('products', 'reference'))) {
          await sql`ALTER TABLE products ADD COLUMN reference VARCHAR(100)`
          console.log('✓ Added reference to products')
          
          // Add unique constraint if the column was just created
          try {
            await sql`ALTER TABLE products ADD CONSTRAINT products_reference_unique UNIQUE (reference)`
            console.log('✓ Added unique constraint to reference')
          } catch (error) {
            console.log('ℹ️ Reference unique constraint already exists or could not be added')
          }
        }
      }
      
      await markMigrationApplied('1.2.0', 'Added missing columns to products table')
    }

    // Version 1.3.0: Add password reset columns to users table
    if (!(await migrationApplied('1.3.0'))) {
      console.log('Running migration 1.3.0: Adding password reset columns to users...')
      
      if (await tableExists('users')) {
        if (!(await columnExists('users', 'reset_token'))) {
          await sql`ALTER TABLE users ADD COLUMN reset_token VARCHAR(500)`
          console.log('✓ Added reset_token to users')
        }
        
        if (!(await columnExists('users', 'reset_token_expiry'))) {
          await sql`ALTER TABLE users ADD COLUMN reset_token_expiry TIMESTAMP`
          console.log('✓ Added reset_token_expiry to users')
        }
      }
      
      await markMigrationApplied('1.3.0', 'Added password reset columns to users table')
    }

    // Version 1.4.0: Add metadata columns to products (example of how to add new migrations)
    if (!(await migrationApplied('1.4.0'))) {
      console.log('Running migration 1.4.0: Adding metadata columns to products...')
      
      if (await tableExists('products')) {
        if (!(await columnExists('products', 'meta_title'))) {
          await sql`ALTER TABLE products ADD COLUMN meta_title VARCHAR(255)`
          console.log('✓ Added meta_title to products')
        }
        
        if (!(await columnExists('products', 'meta_description'))) {
          await sql`ALTER TABLE products ADD COLUMN meta_description TEXT`
          console.log('✓ Added meta_description to products')
        }
        
        if (!(await columnExists('products', 'is_featured'))) {
          await sql`ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT FALSE`
          console.log('✓ Added is_featured to products')
        }
        
        if (!(await columnExists('products', 'sort_order'))) {
          await sql`ALTER TABLE products ADD COLUMN sort_order INTEGER DEFAULT 0`
          console.log('✓ Added sort_order to products')
        }
      }
      
      await markMigrationApplied('1.4.0', 'Added metadata and display columns to products table')
    }

    console.log('✅ Schema updates completed')
  } catch (error) {
    console.error('❌ Error during schema updates:', error)
    throw error
  }
}

if (require.main === module) {
  createTables()
    .then(() => {
      console.log('🎉 Migration completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error)
      process.exit(1)
    })
}
