# Local Development Setup

## Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `concurrently` - Run multiple commands

## Run Locally with Email Support

### Option 1: Run Both Servers Together (Recommended)
```bash
npm run dev:full
```

This starts:
- Frontend: http://localhost:8080
- Email API: http://localhost:3001

### Option 2: Run Separately (Two Terminals)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Email Server:**
```bash
npm run server
```

## Test Email Forms

1. Open http://localhost:8080
2. Fill out any form:
   - Contact Form
   - Apply Now
   - Schedule Visit
3. Submit the form
4. Check console for confirmation
5. Check mahatmavalley@gmail.com inbox (or spam folder)

## Environment Variables

Make sure `.env` file has:
```
RESEND_API_KEY=re_7iA3hHrp_KRMgGFFtrFFED9tLYgkVBNUV
```

## Troubleshooting

### Port 3001 already in use?
Change the port in `server.js`:
```javascript
const PORT = 3002; // or any other port
```

Then update `vite.config.ts`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3002',
    changeOrigin: true,
  },
},
```

### Emails not sending?
1. Check server.js is running (Terminal 2)
2. Verify RESEND_API_KEY in .env
3. Check browser console for errors
4. Check spam folder at mahatmavalley@gmail.com

## Deploy to Production

For production, you don't need the local server. Just deploy to Vercel:

```bash
# Push to GitHub
git add .
git commit -m "Add local development server"
git push

# Then deploy on Vercel
# The api/send-email.ts will work automatically
```

## Summary

- **Local Development**: Use `npm run dev:full`
- **Production**: Deploy to Vercel (no server.js needed)
- **Emails go to**: mahatmavalley@gmail.com
