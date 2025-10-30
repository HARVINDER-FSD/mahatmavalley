# Email Testing Guide

## Current Email Configuration

**All form submissions are sent TO:** `mahatmavalley@gmail.com`

**Sender (FROM):** `Mahatma Valley Pre-school <onboarding@resend.dev>`

**Reply-To:** The email address entered in the form

---

## Important Notes

### Using Resend Test Domain
Currently using `onboarding@resend.dev` as the sender. This is Resend's test domain and has limitations:

1. ✅ **Works for testing** - Emails will be delivered
2. ⚠️ **May go to spam** - Test domain emails often land in spam folders
3. ⚠️ **Limited sending** - Only 100 emails per day on free tier

### Check Your Spam Folder
If you're not receiving emails at mahatmavalley@gmail.com:
1. Check the **Spam/Junk folder**
2. Mark emails from `onboarding@resend.dev` as "Not Spam"
3. Add to contacts/safe senders

---

## Verify Email Destination

### Test Each Form:

1. **Contact Form**
   - Fill out the form
   - Check: mahatmavalley@gmail.com inbox (and spam)
   - Subject: "New Contact Form Submission - [Campus]"

2. **Apply Now / Lead Form**
   - Fill out application
   - Check: mahatmavalley@gmail.com inbox (and spam)
   - Subject: "New Application - [Child Name]"

3. **Schedule Visit**
   - Book a campus tour
   - Check: mahatmavalley@gmail.com inbox (and spam)
   - Subject: "New Visit Schedule Request - [Campus]"

---

## Upgrade to Custom Domain (Recommended for Production)

To avoid spam issues and look more professional:

### Step 1: Verify Your Domain in Resend
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `mahatmavalley.com`)
4. Add the DNS records shown to your domain provider

### Step 2: Update Sender Email
Once domain is verified, update `api/send-email.ts`:

```typescript
from: 'Mahatma Valley Pre-school <noreply@mahatmavalley.com>',
```

### Benefits:
- ✅ Professional appearance
- ✅ Better deliverability
- ✅ Won't go to spam
- ✅ Higher sending limits

---

## Troubleshooting

### Emails not arriving at mahatmavalley@gmail.com?

1. **Check Spam Folder First** ⭐ Most common issue
2. **Check Resend Dashboard**
   - Go to [resend.com/emails](https://resend.com/emails)
   - View sent emails and delivery status
   - Check for errors

3. **Verify API Key**
   - Ensure `RESEND_API_KEY` is set correctly in Vercel/Netlify
   - Key: `re_7iA3hHrp_KRMgGFFtrFFED9tLYgkVBNUV`

4. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for errors when submitting forms

5. **Test API Endpoint**
   - After deployment, test: `https://your-site.vercel.app/api/send-email`
   - Should return error for GET request (expected)

### Emails going to wrong address?

The code is configured to send ALL emails to: `mahatmavalley@gmail.com`

If emails are going elsewhere, check:
- Resend dashboard for actual recipient
- Browser console for any client-side redirects
- Verify you're testing the deployed version, not local

---

## Current Status

✅ **Configured to send to:** mahatmavalley@gmail.com  
✅ **Reply-to:** Form submitter's email  
⚠️ **Using test domain:** onboarding@resend.dev (may go to spam)  
📧 **Recommendation:** Check spam folder and verify domain for production

---

## Next Steps

1. Deploy to Vercel/Netlify
2. Test all three forms
3. **Check spam folder** at mahatmavalley@gmail.com
4. Mark as "Not Spam" if found there
5. (Optional) Verify custom domain for better deliverability
