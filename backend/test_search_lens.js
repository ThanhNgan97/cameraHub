
async function testSearch(term) {
    try {
        console.log(`Searching for: "${term}"`);
        const res = await fetch(`http://localhost:3000/api/users/products/search?search=${encodeURIComponent(term)}&limit=50`); // Increase limit
        const data = await res.json();
        console.log(`Found ${data.data ? data.data.length : 0} results.`);
        if (data.data && data.data.length > 0) {
            data.data.forEach(p => console.log(` - ${p.name}`));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function run() {
    await testSearch('lens');
    await testSearch('ống kính');
}

run();
