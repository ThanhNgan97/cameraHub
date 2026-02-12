const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/users/products/search';

async function runTests() {
    try {
        console.log('--- Testing Product Search Filters ---');

        // Test 1: Brand Filter
        console.log('\n1. Testing Brand Filter (Sony)');
        try {
            const resBrand = await axios.get(`${BASE_URL}?brand=Sony`);
            console.log(`Status: ${resBrand.status}, Count: ${resBrand.data.data.length}`);
            if (resBrand.data.data.length > 0) {
                console.log('First Item Brand:', resBrand.data.data[0].brand);
            }
        } catch (e) { console.log('Brand test failed', e.message); if (e.response) console.log(e.response.data); }

        // Test 2: Color Filter
        console.log('\n2. Testing Color Filter (Black)');
        try {
            const resColor = await axios.get(`${BASE_URL}?colors=Black`);
            console.log(`Status: ${resColor.status}, Count: ${resColor.data.data.length}`);
        } catch (e) { console.log('Color test failed', e.message); if (e.response) console.log(e.response.data); }

        // Test 3: Condition Filter
        console.log('\n3. Testing Condition Filter (Mới 100% -> new)');
        try {
            const resCond = await axios.get(`${BASE_URL}?conditions=Mới 100%`);
            console.log(`Status: ${resCond.status}, Count: ${resCond.data.data.length}`);
            if (resCond.data.data.length > 0) {
                console.log('First Item Condition:', resCond.data.data[0].condition);
            }
        } catch (e) { console.log('Condition test failed', e.message); if (e.response) console.log(e.response.data); }

        // Test 4: Resolution Filter
        console.log('\n4. Testing Resolution Filter (20MP - 30MP)');
        try {
            const resRes = await axios.get(`${BASE_URL}?resolutions=20MP - 30MP`);
            console.log(`Status: ${resRes.status}, Count: ${resRes.data.data.length}`);
            if (resRes.data.data.length > 0) {
                console.log('First Item Resolution:', resRes.data.data[0].resolution);
            }
        } catch (e) { console.log('Resolution test failed', e.message); if (e.response) console.log(e.response.data); }

    } catch (error) {
        console.error('Fatal Test Error:', error.message);
    }
}

runTests();
