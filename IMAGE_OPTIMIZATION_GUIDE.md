# Image Optimization Guide

## Current Problem

Your gallery images are **13-27 MB each** - way too large for web!
- Total: ~450 MB for 24 images
- Slow loading times
- High bandwidth usage
- Poor user experience

## Recommended Image Sizes for Web

- **Gallery thumbnails**: 200-500 KB (max 1 MB)
- **Full-size images**: 500 KB - 2 MB
- **Hero images**: 200-500 KB

## Quick Solutions

### Option 1: Use Online Tools (Easiest)

**TinyPNG** (Recommended)
1. Go to [tinypng.com](https://tinypng.com)
2. Upload your images (up to 20 at once)
3. Download compressed versions
4. Replace files in `public/` folder

**Squoosh** (More control)
1. Go to [squoosh.app](https://squoosh.app)
2. Upload image
3. Choose format: WebP or JPEG
4. Adjust quality: 75-85%
5. Download

### Option 2: Batch Resize with ImageMagick

Install ImageMagick, then run:

```bash
# Resize all images to max 1920px width, 85% quality
magick mogrify -resize 1920x1920> -quality 85 public/*.jpg
```

### Option 3: Use Sharp (Node.js)

Create `optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const outputDir = './public/optimized';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir)
  .filter(file => file.match(/\.(jpg|jpeg|png)$/i))
  .forEach(file => {
    sharp(path.join(inputDir, file))
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, file))
      .then(() => console.log(`✓ ${file}`))
      .catch(err => console.error(`✗ ${file}:`, err));
  });
```

Run:
```bash
npm install sharp
node optimize-images.js
```

## What I Already Did

✅ Added `loading="lazy"` to gallery images
- Images load only when scrolled into view
- Reduces initial page load time

✅ Added background color while loading
- Shows gray placeholder while image loads

## Recommended Next Steps

1. **Compress all images** using TinyPNG or Squoosh
2. **Target sizes:**
   - Gallery images: 500 KB each
   - Total gallery: ~12 MB (instead of 450 MB)
3. **Replace files** in `public/` folder
4. **Test:** Page should load 10-20x faster

## Convert to WebP (Optional - Best Performance)

WebP images are 25-35% smaller than JPEG:

```bash
# Using cwebp (from WebP tools)
for file in public/*.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

Then update Gallery.tsx to use .webp files.

## Quick Comparison

| Current | Optimized | Improvement |
|---------|-----------|-------------|
| 27 MB per image | 500 KB per image | 98% smaller |
| 450 MB total | 12 MB total | 97% smaller |
| 30+ seconds load | 2-3 seconds load | 10x faster |

## Priority Actions

1. ⭐ **Compress images with TinyPNG** (5 minutes)
2. Replace files in `public/` folder
3. Test gallery page
4. Deploy

Your images will load much faster after compression!
