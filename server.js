import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { type, data } = req.body;

    let emailContent = '';
    let subject = '';

    switch (type) {
      case 'contact':
        subject = `New Contact Form Submission - ${data.campus}`;
        emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Campus:</strong> ${data.campus}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `;
        break;

      case 'lead':
        subject = `New Application - ${data.childName}`;
        emailContent = `
          <h2>New Application Submission</h2>
          <p><strong>Parent Name:</strong> ${data.parentName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Child Name:</strong> ${data.childName}</p>
          <p><strong>Child Age:</strong> ${data.childAge}</p>
          <p><strong>Campus:</strong> ${data.campus}</p>
          <p><strong>Preferred Start Date:</strong> ${data.preferredStartDate}</p>
        `;
        break;

      case 'visit':
        subject = `New Visit Schedule Request - ${data.campus}`;
        emailContent = `
          <h2>New Visit Schedule Request</h2>
          <p><strong>Parent Name:</strong> ${data.parentName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          <p><strong>Campus:</strong> ${data.campus}</p>
        `;
        break;

      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }

    const replyToEmail = data.email || '';

    const result = await resend.emails.send({
      from: 'Mahatma Valley Pre-school <onboarding@resend.dev>',
      to: ['mahatmavalley@gmail.com'],
      replyTo: replyToEmail,
      subject: subject,
      html: emailContent,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Email server running on http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent to: mahatmavalley@gmail.com`);
});
