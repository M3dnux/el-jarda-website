import { NextRequest, NextResponse } from 'next/server'
import sql from '../../../../lib/db'
import { validateAdminToken, createAuthResponse } from '../../../../lib/middleware'

export async function GET(request: NextRequest) {
  // Validate admin token
  const authResult = await validateAdminToken(request)
  if (!authResult.valid) {
    return createAuthResponse(authResult.error || 'Non autorisé')
  }

  try {
    // Get all table names
    const tableNames = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `

    const tablesData = []
    let totalRecords = 0

    // Process each table
    for (const tableRow of tableNames) {
      const tableName = tableRow.table_name

      try {
        // Get row count
        const countResult = await sql.unsafe(`SELECT COUNT(*) as count FROM "${tableName}"`)
        const rowCount = parseInt(countResult[0].count)
        totalRecords += rowCount

        // Get column details
        const columnDetails = await sql`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = ${tableName}
          ORDER BY ordinal_position
        `

        // Get table data (limit to 50 rows for performance)
        const tableData = await sql.unsafe(`SELECT * FROM "${tableName}" LIMIT 50`)

        tablesData.push({
          name: tableName,
          rowCount,
          columnDetails,
          tableData
        })

      } catch (error) {
        console.error(`Error processing table ${tableName}:`, error)
        // Add table with empty data if there's an error
        tablesData.push({
          name: tableName,
          rowCount: 0,
          columnDetails: [],
          tableData: []
        })
      }
    }

    return NextResponse.json({
      totalTables: tablesData.length,
      totalRecords,
      tables: tablesData
    })

  } catch (error) {
    console.error('Database API error:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
