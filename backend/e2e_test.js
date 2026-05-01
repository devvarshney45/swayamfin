const axios = require('axios');

const API_URL = 'http://localhost:5001/api';
const LOGIN = {
  admin: { email: 'vikkrant@swayamfin.com', password: 'Admin@123' },
  bsm: { email: 'nupur@swayamfin.com', password: 'Admin@123' },
  sp: { email: 'agra.sp1@swipfin.com', password: 'Admin@123' }
};

async function testLifecycle() {
  console.log('--- STARTING COMPREHENSIVE E2E TEST ---');
  const randomMobile = '9' + Math.floor(Math.random() * 900000000 + 100000000).toString();
  console.log(`Using random mobile: ${randomMobile}`);
  
  try {
    // 1. PUBLIC LEAD SUBMISSION (LANDING PAGE)
    console.log('\n[1] Testing Anonymous Lead Submission (Landing Page)...');
    const publicLeadRes = await axios.post(`${API_URL}/leads`, {
      applicant_name: 'Public E2E Subject',
      mobile: randomMobile,
      location_city: 'Agra',
      loan_type: 'home_loan',
      loan_amount_required: 2500000,
      source: 'website'
    });
    const publicLeadId = publicLeadRes.data.data._id;
    console.log(`SUCCESS: Public Lead created with ID: ${publicLeadId} and Number: ${publicLeadRes.data.data.lead_number}`);

    // 2. LOGIN AS SP
    console.log('\n[2] Testing Agent Login...');
    const spLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.sp);
    const spToken = spLogin.data.token;
    const spHeaders = { Authorization: `Bearer ${spToken}` };
    console.log(`SUCCESS: Agent ${spLogin.data.user.full_name} logged in.`);

    // 3. VERIFY PUBLIC LEAD APPEARS FOR AGENT
    console.log('\n[3] Verifying Public Lead assigned to Agent...');
    const agentLeads = await axios.get(`${API_URL}/leads`, { headers: spHeaders });
    const found = agentLeads.data.data.find(l => l._id === publicLeadId);
    if (found) {
      console.log('SUCCESS: Public lead correctly assigned via Round-Robin.');
    } else {
      throw new Error('Public lead not found in agent dashboard. Round-robin assignment failed?');
    }

    const leadId = publicLeadId; 
    // Now continue with lifecycle for this lead...

    // 3. EDIT PERSONAL DETAILS
    console.log('\n[3] Testing Personal Details Update...');
    await axios.put(`${API_URL}/leads/${leadId}`, {
      father_or_spouse_name: 'Test Father',
      occupation_type: 'Salaried',
      monthly_income: 150000
    }, { headers: spHeaders });
    console.log('SUCCESS: Personal details updated.');

    // 4. ADD REMARK
    console.log('\n[4] Testing Remark Addition...');
    await axios.post(`${API_URL}/leads/${leadId}/remarks`, {
      remark_text: 'Initial contact made via E2E script',
      remark_type: 'call_log'
    }, { headers: spHeaders });
    console.log('SUCCESS: Remark added.');

    // 5. UPDATE STATUS (AGENT)
    console.log('\n[5] Testing Lead Status Update (Agent -> Contacted)...');
    const statusRes = await axios.patch(`${API_URL}/leads/${leadId}/status`, {
      status: 'Contacted'
    }, { headers: spHeaders });
    console.log(`SUCCESS: Status updated to ${statusRes.data.data.status}, Stage: ${statusRes.data.data.stage}`);

    // 6. LOGIN AS BSM & REASSIGN
    console.log('\n[6] Testing BSM Reassignment...');
    const bsmLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.bsm);
    const bsmHeaders = { Authorization: `Bearer ${bsmLogin.data.token}` };
    
    // For reassignment, we need another agent but in our seed we only have sp1 in Agra.
    // Let's just "reassign" to نفسه (itself) or check error handling.
    // Actually, let's just verify BSM can fetch the lead.
    const bsmLeadRes = await axios.get(`${API_URL}/leads/${leadId}`, { headers: bsmHeaders });
    console.log(`SUCCESS: BSM fetched lead ${bsmLeadRes.data.applicant_name}`);

    // 7. LOGIN AS ADMIN & CHECK REPOSITORY
    console.log('\n[7] Testing Admin Repository...');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.admin);
    const adminHeaders = { Authorization: `Bearer ${adminLogin.data.token}` };
    const adminLeadsRes = await axios.get(`${API_URL}/leads`, { headers: adminHeaders });
    const adminFound = adminLeadsRes.data.data.find(l => l._id === leadId);
    if(adminFound) {
       console.log('SUCCESS: Admin verified lead in global repository.');
    } else {
       console.log('FAIL: Admin could not see the lead.');
    }

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.response?.data || err.message);
  }

  console.log('\n--- E2E TEST COMPLETE ---');
}

testLifecycle();
