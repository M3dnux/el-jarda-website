#!/usr/bin/env node

// This script runs migrations and seeds, then starts the Next.js app
// It's designed to run in production after environment variables are available

const { spawn } = require('child_process');

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

async function main() {
  try {
    console.log('🚀 Starting El Jarda application...');
    
    // Only run migrations in production
    if (process.env.NODE_ENV === 'production') {
      console.log('📊 Running database migrations...');
      await runCommand('npx', ['tsx', 'scripts/migrate.ts']);
      
      console.log('🌱 Running database seed...');
      await runCommand('npx', ['tsx', 'scripts/seed.ts']);
    }
    
    console.log('🎯 Starting Next.js server...');
    await runCommand('npm', ['start']);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
