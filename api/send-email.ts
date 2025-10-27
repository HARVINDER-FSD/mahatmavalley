import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    const result = await resend.emails.send({
      from: 'Mahatma Valley Pre-school <onboarding@resend.dev>',
      to: ['mahatmavalley@gmail.com'],
      subject: subject,
      html: emailContent,
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
