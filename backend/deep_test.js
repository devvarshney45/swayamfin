const axios = require('axios');

const API_URL = 'http://localhost:5001/api';
const LOGIN = {
  admin: { email: 'vikkrant@swwayamfin.com', password: 'Admin@123' },
  bsm_agra: { email: 'nupur@swwayamfin.com', password: 'Admin@123' },
  sp_agra: { email: 'agra.sp1@swipfin.com', password: 'Admin@123' },
  sp_mathura: { email: 'mathura.sp1@swipfin.com', password: 'Admin@123' }
};

async function deepTest() {
  console.log('--- STARTING DEEP SYSTEM VERIFICATION ---');
  const sessionMobile = '8' + Math.floor(Math.random() * 900000000 + 100000000).toString();

  try {
    // SCENARIO 1: DEDUPLICATION
    console.log('\n[1] TEST: Deduplication (409 Conflict)...');
    await axios.post(`${API_URL}/leads`, {
      applicant_name: 'Dedupe Test 1',
      mobile: sessionMobile,
      location_city: 'Agra',
      loan_type: 'secured',
      loan_amount_required: 100000,
      source: 'website'
    });
    try {
      await axios.post(`${API_URL}/leads`, {
        applicant_name: 'Dedupe Test 2',
        mobile: sessionMobile,
        location_city: 'Mathura',
        loan_type: 'unsecured',
        loan_amount_required: 200000,
        source: 'website'
      });
      console.log('❌ FAIL: Duplicate mobile was accepted.');
    } catch (err) {
      if (err.response?.status === 409) {
        console.log('✅ SUCCESS: Duplicate mobile rejected with 409.');
      } else {
        throw err;
      }
    }

    // SCENARIO 2: MULTI-CITY ROUTING
    console.log('\n[2] TEST: Multi-City Routing...');
    const cities = ['Mathura', 'Hathras', 'Kosi'];
    for (const city of cities) {
      const res = await axios.post(`${API_URL}/leads`, {
        applicant_name: `Test for ${city}`,
        mobile: '7' + Math.floor(Math.random() * 900000000 + 100000000).toString(),
        location_city: city,
        loan_type: 'hybrid',
        loan_amount_required: 1500000,
        source: 'website'
      });
      console.log(`✅ SUCCESS: Lead for ${city} created with ID ${res.data.data._id} and routed to ${res.data.data.lead_number.split('-')[0]} branch.`);
    }

    // SCENARIO 3: ROLE ISOLATION
    console.log('\n[3] TEST: Agent Data Isolation...');
    const agraLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.sp_agra);
    const agraHeaders = { Authorization: `Bearer ${agraLogin.data.token}` };
    
    const mathuraLeadRes = await axios.post(`${API_URL}/leads`, {
      applicant_name: 'Mathura Private Lead',
      mobile: '6' + Math.floor(Math.random() * 900000000 + 100000000).toString(),
      location_city: 'Mathura',
      loan_type: 'home_loan',
      loan_amount_required: 3000000,
      source: 'website'
    });
    const mathuraLeadId = mathuraLeadRes.data.data._id;

    const agraLeads = await axios.get(`${API_URL}/leads`, { headers: agraHeaders });
    const foundMathura = agraLeads.data.data.find(l => l._id === mathuraLeadId);
    if (!foundMathura) {
      console.log('✅ SUCCESS: Agra Agent cannot see Mathura lead.');
    } else {
      console.log('❌ FAIL: Security Leak! Agra Agent sees Mathura lead.');
    }

    // SCENARIO 4: FULL DATA ENRICHMENT
    console.log('\n[4] TEST: Full Lead Enrichment & Persistence...');
    const spAgraLogin = await axios.post(`${API_URL}/auth/login`, LOGIN.sp_agra);
    const spAgraHeaders = { Authorization: `Bearer ${spAgraLogin.data.token}` };
    
    const leadRes = await axios.post(`${API_URL}/leads`, {
      applicant_name: 'Enrichment Subject',
      mobile: '5' + Math.floor(Math.random() * 900000000 + 100000000).toString(),
      location_city: 'Agra',
      loan_type: 'structured',
      loan_amount_required: 4000000,
      source: 'manual'
    }, { headers: spAgraHeaders });
    const leadId = leadRes.data.data._id;

    await axios.put(`${API_URL}/leads/${leadId}`, {
      father_or_spouse_name: 'Vikkrant Sr.',
      occupation_type: 'Business Owner',
      monthly_income: 250000,
      current_address: 'Agra Fort Road, UP',
      gst_registered: true
    }, { headers: spAgraHeaders });

    const finalLead = await axios.get(`${API_URL}/leads/${leadId}`, { headers: spAgraHeaders });
    if(finalLead.data.monthly_income === 250000 && finalLead.data.gst_registered === true) {
      console.log('✅ SUCCESS: Lead data enriched and persisted correctly.');
    } else {
      console.log('❌ FAIL: Data mismatch after update.');
    }

  } catch (err) {
    console.error('\n❌ DEEP TEST CRASHED:', err.response?.data || err.message);
  }

  console.log('\n--- DEEP TEST COMPLETE ---');
}

deepTest();
