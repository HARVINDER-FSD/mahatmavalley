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
    // For development: Open email client with pre-filled data
    if (import.meta.env.DEV) {
      const subject = encodeURIComponent(`Contact Form: ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCampus: ${data.campus}\n\nMessage:\n${data.message}`
      );
      window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
      return { success: true };
    }

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
    // Fallback to email client
    const subject = encodeURIComponent(`Contact Form: ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCampus: ${data.campus}\n\nMessage:\n${data.message}`
    );
    window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
    return { success: true };
  }
}

export async function sendLeadEmail(data: LeadFormData) {
  try {
    // For development: Open email client with pre-filled data
    if (import.meta.env.DEV) {
      const subject = encodeURIComponent(`Application: ${data.childName}`);
      const body = encodeURIComponent(
        `Parent Name: ${data.parentName}\nEmail: ${data.email}\nPhone: ${data.phone}\nChild Name: ${data.childName}\nChild Age: ${data.childAge}\nCampus: ${data.campus}\nPreferred Start Date: ${data.preferredStartDate}`
      );
      window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
      return { success: true };
    }

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
    // Fallback to email client
    const subject = encodeURIComponent(`Application: ${data.childName}`);
    const body = encodeURIComponent(
      `Parent Name: ${data.parentName}\nEmail: ${data.email}\nPhone: ${data.phone}\nChild Name: ${data.childName}\nChild Age: ${data.childAge}\nCampus: ${data.campus}\nPreferred Start Date: ${data.preferredStartDate}`
    );
    window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
    return { success: true };
  }
}

export async function sendVisitScheduleEmail(data: VisitScheduleData) {
  try {
    // For development: Open email client with pre-filled data
    if (import.meta.env.DEV) {
      const subject = encodeURIComponent(`Visit Schedule Request: ${data.campus}`);
      const body = encodeURIComponent(
        `Parent Name: ${data.parentName}\nPhone: ${data.phone}\nEmail: ${data.email}\nPreferred Date: ${data.preferredDate}\nPreferred Time: ${data.preferredTime}\nCampus: ${data.campus}`
      );
      window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
      return { success: true };
    }

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
    // Fallback to email client
    const subject = encodeURIComponent(`Visit Schedule Request: ${data.campus}`);
    const body = encodeURIComponent(
      `Parent Name: ${data.parentName}\nPhone: ${data.phone}\nEmail: ${data.email}\nPreferred Date: ${data.preferredDate}\nPreferred Time: ${data.preferredTime}\nCampus: ${data.campus}`
    );
    window.open(`mailto:mahatmavalley@gmail.com?subject=${subject}&body=${body}`, '_blank');
    return { success: true };
  }
}
