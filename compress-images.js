import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'public', 'compressed');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🖼️  Starting image compression...\n');

// Get all JPG files
const files = fs.readdirSync(inputDir)
  .filter(file => file.match(/\.(jpg|jpeg)$/i) && !file.includes('hero'));

let totalOriginal = 0;
let totalCompressed = 0;
let processed = 0;

// Process each image
for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);
  
  try {
    // Get original size
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size / (1024 * 1024); // MB
    totalOriginal += originalSize;
    
    // Compress image
    await sharp(inputPath)
      .resize(1920, 1920, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 82,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);
    
    // Get compressed size
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = compressedStats.size / (1024 * 1024); // MB
    totalCompressed += compressedSize;
    
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✓ ${file}`);
    console.log(`  ${originalSize.toFixed(2)} MB → ${compressedSize.toFixed(2)} MB (${reduction}% smaller)\n`);
    
    processed++;
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}

console.log('━'.repeat(60));
console.log(`\n✅ Compression Complete!\n`);
console.log(`📊 Results:`);
console.log(`   Files processed: ${processed}`);
console.log(`   Original size: ${totalOriginal.toFixed(2)} MB`);
console.log(`   Compressed size: ${totalCompressed.toFixed(2)} MB`);
console.log(`   Total saved: ${(totalOriginal - totalCompressed).toFixed(2)} MB`);
console.log(`   Reduction: ${((1 - totalCompressed / totalOriginal) * 100).toFixed(1)}%`);
console.log(`\n📁 Compressed images saved to: public/compressed/`);
console.log(`\n⚠️  Next steps:`);
console.log(`   1. Review compressed images in public/compressed/`);
console.log(`   2. If satisfied, replace original files:`);
console.log(`      - Delete old images from public/`);
console.log(`      - Move compressed images from public/compressed/ to public/`);
console.log(`   3. Delete the public/compressed/ folder`);
console.log(`   4. Commit and deploy\n`);
