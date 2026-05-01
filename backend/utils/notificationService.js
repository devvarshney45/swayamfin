const axios = require('axios');

/**
 * Notification Service (Meta WhatsApp Cloud API)
 */

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';

/**
 * Formats a phone number for the WhatsApp API (adds country code if missing)
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  let cleaned = phone.replace(/\D/g, ''); // Remove non-digits
  
  // If it's a 10-digit number, assume India (+91)
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  
  return cleaned;
};

/**
 * Generic helper to send WhatsApp messages (Text or Template)
 */
const sendWhatsApp = async (to, content, type = 'text') => {
  const formattedTo = formatPhoneNumber(to);
  
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.log(`\n--- WHATSAPP SIMULATION ---`);
    console.log(`URL: https://graph.facebook.com/${API_VERSION}/[PHONE_NUMBER_ID]/messages`);
    console.log(`TO: ${formattedTo}`);
    console.log(`TEXT: ${type === 'text' ? content : 'Template Data'}`);
    console.log(`TOKEN: [MISSING] - Add WHATSAPP_TOKEN to .env for real delivery.`);
    console.log(`---------------------------\n`);
    return true; 
  }

  if (!formattedTo) return false;

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`;
    
    let body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: formattedTo,
    };

    if (type === 'template') {
      body.type = 'template';
      body.template = content;
    } else {
      body.type = 'text';
      body.text = { body: content };
    }

    const response = await axios.post(url, body, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    return false;
  }
};

/**
 * Notify Agent about new Lead Assignment
 */
exports.sendWhatsAppAssignment = async (agent, lead) => {
  if (!agent?.phone) return false;

  const leadUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/agent/lead/${lead._id}`;
  
  // Real Template usage typically requires specific parameter ordering in Meta Business Suite
  const message = `*NEW LEAD ASSIGNED* 🚀\n\n` +
                  `Hello *${agent.full_name}*,\n` +
                  `A new lead from *${lead.location_city}* has been assigned to you.\n\n` +
                  `*Lead ID:* ${lead.lead_number}\n` +
                  `*Applicant:* ${lead.applicant_name}\n` +
                  `*Loan Type:* ${lead.loan_type?.replace('_', ' ')}\n` +
                  `*Amount:* ₹${(lead.loan_amount_required/100000).toFixed(2)} Lacs\n\n` +
                  `*View Details:* ${leadUrl}\n\n` +
                  `_Swayamfin SOMS System_`;

  return await sendWhatsApp(agent.phone, message);
};

/**
 * Notify Customer immediately after application submission
 */
exports.sendCustomerWelcome = async (lead) => {
  if (!lead.mobile) return false;

  const message = `Hello *${lead.applicant_name}*,\n\n` +
                  `Thank you for choosing *Swayamfin*! We have received your application for a *${lead.loan_type?.replace('_', ' ')}*.\n\n` +
                  `*Reference ID:* ${lead.lead_number}\n` +
                  `Our representative will contact you shortly to guide you through the next steps.\n\n` +
                  `Regards,\n` +
                  `Team Swayamfin\n` +
                  `_Empowering Your Financial Success_`;

  return await sendWhatsApp(lead.mobile, message);
};

/**
 * Notify Customer on important Status Changes (Sanctioned/Disbursed)
 */
exports.sendCustomerStatusUpdate = async (lead, status) => {
  if (!lead.mobile) return false;

  let message = '';
  const loanLabel = lead.loan_type?.replace('_', ' ');

  if (status === 'Sanctioned') {
    message = `Congratulations *${lead.applicant_name}*! 🎉\n\n` +
              `Your *${loanLabel}* (ID: ${lead.lead_number}) has been *SANCTIONED*.\n\n` +
              `Our team is now processing your disbursement documentation. We'll be in touch soon.\n\n` +
              `Team Swayamfin`;
  } else if (status === 'Disbursed') {
    message = `Great News *${lead.applicant_name}*! 🚀\n\n` +
              `Funds for your *${loanLabel}* (ID: ${lead.lead_number}) have been successfully *DISBURSED*.\n\n` +
              `Thank you for trusting Swayamfin with your financial journey.\n\n` +
              `Team Swayamfin`;
  }

  if (message) {
    return await sendWhatsApp(lead.mobile, message);
  }
  return true;
};
