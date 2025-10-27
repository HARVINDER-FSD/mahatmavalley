# Resend Email Integration Setup

This project uses Resend for sending emails from contact forms, lead forms, and visit scheduling.

## Setup Instructions

### 1. Get Resend API Key

1. Go to [Resend](https://resend.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Add your Resend API key to the `.env` file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### 3. Verify Domain (Optional but Recommended)

For production use, you should verify your domain:

1. Go to Resend Dashboard > Domains
2. Add your domain (e.g., mahatmavalley.com)
3. Follow the DNS configuration instructions
4. Once verified, update the `from` email in `api/send-email.ts`:

```typescript
from: 'Mahatma Valley Pre-school <noreply@mahatmavalley.com>',
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Deploy API Endpoint

The `api/send-email.ts` file needs to be deployed as a serverless function. Options:

#### Option A: Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add `RESEND_API_KEY` to Vercel environment variables
4. Deploy

#### Option B: Netlify
1. Create `netlify.toml`:
```toml
[build]
  functions = "api"
```
2. Deploy to Netlify
3. Add `RESEND_API_KEY` to Netlify environment variables

#### Option C: Custom Backend
Create a Node.js/Express backend and host the API endpoint separately.

### 6. Update API Endpoint URL

If not using Vercel, update the fetch URLs in `src/lib/email.ts` to point to your deployed API:

```typescript
const response = await fetch('https://your-api-domain.com/api/send-email', {
  // ...
});
```

## Testing

### Development Testing

For local testing, you can use Resend's test mode:

1. Use the test API key from Resend dashboard
2. Emails will be captured in Resend dashboard but not actually sent

### Production Testing

1. Ensure your domain is verified
2. Test all three form types:
   - Contact form
   - Lead/Application form
   - Visit scheduling form

## Email Templates

All emails are sent to: `mahatmavalley@gmail.com`

You can customize email templates in `api/send-email.ts`:

- **Contact Form**: Line 30-40
- **Lead Form**: Line 42-55
- **Visit Schedule**: Line 57-69

## Troubleshooting

### Emails not sending
- Check API key is correct in environment variables
- Verify domain if using custom domain
- Check Resend dashboard for error logs

### CORS errors
- Ensure API endpoint has proper CORS headers (already configured)
- Check if API endpoint is accessible

### Rate limits
- Free tier: 100 emails/day
- Upgrade plan if needed for higher volume

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
