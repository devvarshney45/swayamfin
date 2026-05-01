const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_URL = 'http://localhost:5001/api';

async function testWhatsAppTriggers() {
  console.log('--- STARTING WHATSAPP TRIGGER VERIFICATION ---');
  
  try {
    // 1. LOGIN AS ADMIN (to update status later)
    console.log('\n[1] Logging in as Admin...');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'vikkrant@swwayamfin.com',
      password: 'Admin@123'
    });
    const token = adminLogin.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // 2. CREATE LEAD (Trigger Welcome)
    console.log('\n[2] Creating Lead (Anonymous Flow)...');
    const mobile = '9' + Math.floor(Math.random() * 900000000 + 100000000).toString();
    const createRes = await axios.post(`${API_URL}/leads`, {
      applicant_name: 'WhatsApp Test User',
      mobile: mobile,
      location_city: 'Agra',
      loan_type: 'home_loan',
      loan_amount_required: 1500000,
      source: 'website'
    });
    const leadId = createRes.data.data._id;
    console.log('SUCCESS: Lead created. Check backend console for [WhatsApp Simulation] Welcome logs.');

    // 3. UPDATE STATUS TO SANCTIONED (Trigger Status Update)
    console.log('\n[3] Updating Status to Sanctioned...');
    await axios.patch(`${API_URL}/leads/${leadId}/status`, {
      status: 'Sanctioned'
    }, { headers });
    console.log('SUCCESS: Status updated. Check backend console for [WhatsApp Simulation] Sanctioned logs.');

    // 4. UPDATE STATUS TO DISBURSED (Trigger Status Update)
    console.log('\n[4] Updating Status to Disbursed...');
    await axios.patch(`${API_URL}/leads/${leadId}/status`, {
      status: 'Disbursed'
    }, { headers });
    console.log('SUCCESS: Status updated. Check backend console for [WhatsApp Simulation] Disbursed logs.');

  } catch (error) {
    console.error('\n❌ VERIFICATION FAILED:', error.response?.data || error.message);
  }

  console.log('\n--- VERIFICATION COMPLETE ---');
}

testWhatsAppTriggers();
