/**
 * Script para sincronizar imágenes de public/images/uploads a src/assets/uploads
 * Esto permite que Astro optimice las imágenes subidas via DecapCMS
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '..', 'public', 'images', 'uploads');
const DEST_DIR = join(__dirname, '..', 'src', 'assets', 'uploads');

function syncImages() {
  console.log('🖼️  Sincronizando imágenes para optimización...');
  
  // Crear directorio destino si no existe
  if (!existsSync(DEST_DIR)) {
    mkdirSync(DEST_DIR, { recursive: true });
    console.log(`📁 Creado directorio: src/assets/uploads`);
  }

  // Verificar si existe el directorio fuente
  if (!existsSync(SOURCE_DIR)) {
    console.log('⚠️  No existe public/images/uploads - saltando sincronización');
    return;
  }

  // Obtener lista de archivos
  const files = readdirSync(SOURCE_DIR);
  let copied = 0;
  let skipped = 0;

  for (const file of files) {
    const sourcePath = join(SOURCE_DIR, file);
    const destPath = join(DEST_DIR, file);
    
    // Solo copiar archivos (no directorios)
    if (!statSync(sourcePath).isFile()) continue;
    
    // Solo copiar imágenes
    const ext = file.toLowerCase().split('.').pop();
    if (!['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'].includes(ext)) continue;

    // Verificar si necesita actualización
    if (existsSync(destPath)) {
      const sourceTime = statSync(sourcePath).mtimeMs;
      const destTime = statSync(destPath).mtimeMs;
      if (sourceTime <= destTime) {
        skipped++;
        continue;
      }
    }

    // Copiar archivo
    copyFileSync(sourcePath, destPath);
    copied++;
    console.log(`  ✅ ${file}`);
  }

  console.log(`\n📊 Resultado: ${copied} copiadas, ${skipped} sin cambios`);
  console.log('✨ Sincronización completada!\n');
}

syncImages();
