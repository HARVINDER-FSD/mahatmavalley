// Email service using Resend
// Note: This should be called from a backend API endpoint for security

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  campus: string;
  message: string;
}

export interface LeadFormData {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  campus: string;
  preferredStartDate: string;
}

export interface VisitScheduleData {
  parentName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  campus: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

export async function sendLeadEmail(data: LeadFormData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'lead',
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending lead email:', error);
    throw error;
  }
}

export async function sendVisitScheduleEmail(data: VisitScheduleData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'visit',
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending visit schedule email:', error);
    throw error;
  }
}
