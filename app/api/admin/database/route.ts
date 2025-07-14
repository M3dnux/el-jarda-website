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
    // Get table information from PostgreSQL information_schema
    const tables = await sql`
      SELECT 
        table_name,
        (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', table_schema, table_name), false, true, '')))[1]::text::int as row_count
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `

    // Get detailed information for each table
    const tableDetails = await Promise.all(
      tables.map(async (table: any) => {
        try {
          // Get column information
          const columns = await sql`
            SELECT 
              column_name,
              data_type,
              is_nullable,
              column_default
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = ${table.table_name}
            ORDER BY ordinal_position
          `

          return {
            name: table.table_name,
            rowCount: table.row_count || 0,
            columns: columns.length,
            columnDetails: columns
          }
        } catch (error) {
          console.error(`Error getting details for table ${table.table_name}:`, error)
          return {
            name: table.table_name,
            rowCount: 0,
            columns: 0,
            columnDetails: []
          }
        }
      })
    )

    // Calculate totals
    const totalTables = tableDetails.length
    const totalRows = tableDetails.reduce((sum, table) => sum + table.rowCount, 0)

    return NextResponse.json({
      summary: {
        totalTables,
        totalRows
      },
      tables: tableDetails
    })
  } catch (error) {
    console.error('Error fetching database statistics:', error)
    return NextResponse.json({ error: 'Failed to fetch database statistics' }, { status: 500 })
  }
}
