const bcrypt = require('bcryptjs');

async function testBcrypt() {
  try {
    const password = 'testpassword';
    console.log('Password:', password);
    const hash = await bcrypt.hash(password, 10);
    console.log('Hash created:', hash);
    const match = await bcrypt.compare(password, hash);
    console.log('Match result:', match);
    if (match) console.log('Bcrypt is working correctly.');
    else console.log('Bcrypt failed to match.');
  } catch (err) {
    console.error('Bcrypt error:', err);
  }
}

testBcrypt();
