
async function testSearch(term) {
    try {
        console.log(`Searching for: "${term}"`);
        const res = await fetch(`http://localhost:3000/api/users/products/search?search=${encodeURIComponent(term)}`);
        const data = await res.json();
        console.log(`Found ${data.data ? data.data.length : 0} results.`);
        if (data.data && data.data.length > 0) {
            console.log(`First result: ${data.data[0].name}`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function run() {
    await testSearch('SONY');
    await testSearch('sony');
    await testSearch('MÁY ẢNH');
    await testSearch('máy ảnh');
}

run();
