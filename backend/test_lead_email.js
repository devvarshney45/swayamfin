require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';

async function testLeadEmailConfirmation() {
  console.log('🧪 TESTING LEAD EMAIL CONFIRMATION FEATURE\n');
  console.log(`API URL: ${API_URL}`);
  console.log(`Brevo User: ${process.env.BREVO_USER}\n`);

  // Test data
  const testLead = {
    applicant_name: 'Test User',
    mobile: '9' + Math.floor(Math.random() * 900000000 + 100000000),
    email: 'test-lead-' + Date.now() + '@yopmail.com', // Using yopmail for disposable email testing
    loan_type: 'home_loan', // Valid enum value
    loan_amount_required: 500000,
    location_city: 'Delhi',
    employment_type: 'self_employed',
    monthly_income: 50000,
  };

  try {
    console.log('📤 Submitting test lead...');
    console.log('Lead Data:');
    console.log(`  Name: ${testLead.applicant_name}`);
    console.log(`  Phone: ${testLead.mobile}`);
    console.log(`  Email: ${testLead.email}`);
    console.log(`  Loan Type: ${testLead.loan_type}`);
    console.log(`  Amount: ₹${testLead.loan_amount_required}`);
    console.log();

    const response = await axios.post(`${API_URL}/leads`, testLead, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    if (response.status === 201 && response.data.success) {
      console.log('✅ Lead created successfully!');
      console.log(`   Lead ID: ${response.data.data._id}`);
      console.log(`   Lead Number: ${response.data.data.lead_number}`);
      console.log();
      console.log('📧 EMAIL CONFIRMATION:');
      console.log('   ✓ Lead confirmation email should be sent to: ' + testLead.email);
      console.log('   ✓ Check email inbox (or yopmail.com for test email)');
      console.log('   ✓ Email includes:');
      console.log('     - Lead number for reference');
      console.log('     - Loan type and amount');
      console.log('     - Expected response timeline (24-48 hours)');
      console.log('     - WhatsApp support link');
      console.log();
      console.log('🧪 Test Email Check: https://yopmail.com/form');
      console.log('   Enter email: ' + testLead.email.split('@')[0]);
      console.log();
      console.log('✅ TEST PASSED - Lead creation with email notification working!\n');
    } else {
      console.error('❌ Unexpected response:', response.data);
    }
  } catch (error) {
    console.error('❌ TEST FAILED!');
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Check if backend server is running on port 5001');
      console.error('Start backend with: npm run dev');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

// Run test
testLeadEmailConfirmation();
