# Deployment Guide - Mahatma Valley Preschool Website

## Deploy to Vercel (Recommended - 5 minutes)

Vercel is the easiest way to deploy this application with working email functionality.

### Step 1: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with your GitHub account

### Step 2: Import Your Project
1. After signing in, click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Find and select your repository: `HARVINDER-FSD/mahatmavalley`
4. Click "Import"

### Step 3: Configure Build Settings
Vercel will auto-detect your settings. Verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables
Before deploying, add your Resend API key:
1. Click on "Environment Variables"
2. Add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_7iA3hHrp_KRMgGFFtrFFED9tLYgkVBNUV`
3. Click "Add"

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for deployment to complete
3. Your site will be live at: `https://mahatmavalley.vercel.app` (or similar)

### Step 6: Test Email Forms
Once deployed, test all three forms:
1. Contact Form
2. Apply Now / Lead Form
3. Schedule Visit Form

All emails will be sent to: **mahatmavalley@gmail.com**

---

## Alternative: Deploy to Netlify

### Step 1: Sign up for Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

### Step 2: Create netlify.toml
This file is already in your project root with the correct configuration.

### Step 3: Import Project
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select your repository: `HARVINDER-FSD/mahatmavalley`

### Step 4: Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `api`

### Step 5: Add Environment Variables
1. Go to Site settings → Environment variables
2. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_7iA3hHrp_KRMgGFFtrFFED9tLYgkVBNUV`

### Step 6: Deploy
Click "Deploy site" and wait for completion.

---

## Verify Email Setup

After deployment, check:

1. **Test Contact Form**: Fill and submit
2. **Test Apply Now**: Fill application form
3. **Test Schedule Visit**: Book a campus tour
4. **Check Email**: Verify emails arrive at mahatmavalley@gmail.com

---

## Custom Domain Setup (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., mahatmavalley.com)
3. Follow DNS configuration instructions

### On Netlify:
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records

---

## Troubleshooting

### Emails not sending?
1. Check Resend dashboard for errors: [resend.com/emails](https://resend.com/emails)
2. Verify API key is correct in environment variables
3. Check browser console for errors

### Build failing?
1. Check build logs in Vercel/Netlify dashboard
2. Ensure all dependencies are in package.json
3. Try running `npm install` and `npm run build` locally

### API endpoint not working?
1. Verify `api/send-email.ts` exists in your repository
2. Check that environment variable `RESEND_API_KEY` is set
3. Review function logs in hosting dashboard

---

## Support

- Vercel Documentation: https://vercel.com/docs
- Netlify Documentation: https://docs.netlify.com
- Resend Documentation: https://resend.com/docs

For issues, check the hosting platform's logs and Resend dashboard.
