async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/recruitment/registrations');
    const json = await res.json();
    console.log('API RESPONSE:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('FETCH ERROR:', err);
  }
}
test();
