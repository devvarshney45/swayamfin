const axios = require('axios');

const API_URL = 'http://localhost:5001/api';
const LOGIN = {
  admin: { email: 'vikkrant@swwayamfin.com', password: 'Admin@123' },
  bsm: { email: 'nupur@swwayamfin.com', password: 'Admin@123' },
  sp: { email: 'agra.sp1@swipfin.com', password: 'Admin@123' }
};

async function ultimateTest() {
  console.log('--- STARTING ULTIMATE END-TO-END PROJECT VERIFICATION ---');
  const randomMobile = '9' + Math.floor(Math.random() * 900000000 + 100000000).toString();
  console.log(`SESSION MOBILE: ${randomMobile}\n`);

  try {
    // 1. ANONYMOUS LEAD SUBMISSION (LANDING PAGE)
    console.log('[1] Testing Anonymous Lead Submission...');
    const publicLeadRes = await axios.post(`${API_URL}/leads`, {
      applicant_name: 'Ultimate Test Subject',
      mobile: randomMobile,
      location_city: 'Agra',
      loan_type: 'home_loan',
      loan_amount_required: 2500000,
      source: 'website'
    });
    const leadId = publicLeadRes.data.data._id;
    const leadNo = publicLeadRes.data.data.lead_number;
    console.log(`✅ SUCCESS: Lead ${leadNo} created. Verify "[WhatsApp Simulation] Welcome" and "Assignment" logs in backend.\n`);

    // 2. AGENT PORTAL WORKFLOW
    console.log('[2] Testing Agent Portal Workflow...');
    const spLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.sp);
    const spHeaders = { Authorization: `Bearer ${spLogin.data.token}` };
    
    // Fetch Lead Details
    const leadDetail = await axios.get(`${API_URL}/leads/${leadId}`, { headers: spHeaders });
    console.log(`✅ SUCCESS: Agent found assigned lead: ${leadDetail.data.applicant_name}`);

    // Update Personal Details
    await axios.put(`${API_URL}/leads/${leadId}`, {
      father_or_spouse_name: 'Ultimate Father',
      occupation_type: 'Salaried',
      monthly_income: 125000
    }, { headers: spHeaders });
    console.log('✅ SUCCESS: Personal details updated.');

    // Add Remark
    await axios.post(`${API_URL}/leads/${leadId}/remarks`, {
      remark_text: 'Processing ultimate test lead',
      remark_type: 'system'
    }, { headers: spHeaders });
    console.log('✅ SUCCESS: Activity remark added.');

    // 3. STATUS TRANSITION & NOTIFICATIONS
    console.log('\n[3] Testing Status Transitions & WhatsApp Triggers...');
    
    // Status to Contacted
    await axios.patch(`${API_URL}/leads/${leadId}/status`, { status: 'Contacted' }, { headers: spHeaders });
    console.log('✅ SUCCESS: Status -> Contacted.');

    // Status to Sanctioned (Should trigger WhatsApp)
    await axios.patch(`${API_URL}/leads/${leadId}/status`, { status: 'Sanctioned' }, { headers: spHeaders });
    console.log('✅ SUCCESS: Status -> Sanctioned. Verify "[WhatsApp Simulation] Sanctioned" logs.\n');

    // 4. BSM BRANCH OVERSIGHT
    console.log('[4] Testing BSM Branch Oversight...');
    const bsmLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.bsm);
    const bsmHeaders = { Authorization: `Bearer ${bsmLogin.data.token}` };
    
    const bsmLeads = await axios.get(`${API_URL}/leads`, { headers: bsmHeaders });
    const bsmFound = bsmLeads.data.data.find(l => l._id === leadId);
    if(bsmFound) {
      console.log(`✅ SUCCESS: BSM (Agra) sees lead ${leadNo} in branch repository.`);
    } else {
      throw new Error('BSM failed to see branch lead.');
    }

    // 5. ADMIN GLOBAL REPOSITORY
    console.log('\n[5] Testing Admin Global Access...');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.admin);
    const adminHeaders = { Authorization: `Bearer ${adminLogin.data.token}` };
    
    const adminLeads = await axios.get(`${API_URL}/leads`, { headers: adminHeaders });
    const adminFound = adminLeads.data.data.find(l => l._id === leadId);
    if(adminFound) {
      console.log(`✅ SUCCESS: Admin verified lead ${leadNo} in global master repository.`);
    } else {
      throw new Error('Admin failed to see lead.');
    }

  } catch (err) {
    console.error('\n❌ ULTIMATE TEST FAILED:', err.response?.data || err.message);
  }

  console.log('\n--- ULTIMATE END-TO-END PROJECT VERIFICATION COMPLETE ---');
}

ultimateTest();
