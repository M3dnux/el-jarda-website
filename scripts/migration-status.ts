import sql from '../lib/db'

// Helper to show migration status
async function showMigrationStatus() {
  try {
    console.log('📊 Migration Status Report')
    console.log('=' .repeat(50))
    
    // Check if migration_versions table exists
    const tableExistsResult = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'migration_versions'
      )
    `
    
    if (!tableExistsResult[0].exists) {
      console.log('❌ No migration_versions table found. Run migrations first.')
      return
    }
    
    // Get all applied migrations
    const appliedMigrations = await sql`
      SELECT version, description, applied_at 
      FROM migration_versions 
      ORDER BY applied_at ASC
    `
    
    console.log(`✅ ${appliedMigrations.length} migrations applied:`)
    console.log('')
    
    appliedMigrations.forEach((migration, index) => {
      console.log(`${index + 1}. Version: ${migration.version}`)
      console.log(`   Description: ${migration.description}`)
      console.log(`   Applied: ${new Date(migration.applied_at).toLocaleString()}`)
      console.log('')
    })
    
    // Show current table structure
    console.log('📋 Current Database Tables:')
    console.log('-' .repeat(30))
    
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `
    
    for (const table of tables) {
      console.log(`🗃️  ${table.table_name}`)
      
      // Get column info for each table
      const columns = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = ${table.table_name}
        ORDER BY ordinal_position
      `
      
      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(required)'
        const defaultVal = col.column_default ? ` default: ${col.column_default}` : ''
        console.log(`   📝 ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`)
      })
      console.log('')
    }
    
  } catch (error) {
    console.error('❌ Error checking migration status:', error)
  } finally {
    await sql.end()
  }
}

if (require.main === module) {
  showMigrationStatus()
    .then(() => {
      console.log('📊 Migration status check completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Migration status check failed:', error)
      process.exit(1)
    })
}

export { showMigrationStatus }
