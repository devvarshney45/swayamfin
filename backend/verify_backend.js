const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function verify() {
  console.log('--- STARTING BACKEND VERIFICATION ---');
  
  try {
    // 1. Test Login
    console.log('1. Testing Login (Admin)...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@swipfin.com',
      password: 'Admin@123'
    });
    
    if (loginRes.data.token) {
      console.log('SUCCESS: Login successful.');
      const token = loginRes.data.token;
      const headers = { Authorization: `Bearer ${token}` };

      // 2. Test Get Leads
      console.log('2. Testing Get Leads...');
      const leadsRes = await axios.get(`${API_URL}/leads`, { headers });
      console.log(`SUCCESS: Fetched ${leadsRes.data.count} leads.`);

      // 3. Test Lead Creation (Manual)
      console.log('3. Testing Lead Creation...');
      const newLeadRes = await axios.post(`${API_URL}/leads`, {
        applicant_name: 'Verification Lead',
        mobile: '1234567890',
        location_city: 'Agra',
        loan_type: 'home_loan',
        loan_amount_required: 1000000,
        source: 'manual'
      }, { headers });

      if (newLeadRes.data.success) {
        console.log(`SUCCESS: Lead created with number ${newLeadRes.data.data.lead_number}`);
      } else {
        console.log('FAIL: Lead creation failed.');
      }
    } else {
      console.log('FAIL: No token returned.');
    }
  } catch (err) {
    console.error('ERROR during verification:', err.response?.data || err.message);
  }

  console.log('--- BACKEND VERIFICATION COMPLETE ---');
}

verify();
