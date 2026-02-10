
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testSearch(term) {
    try {
        console.log(`\nSEARCHING FOR: "${term}"`);
        const res = await fetch(`http://localhost:3000/api/users/products/search?search=${encodeURIComponent(term)}&limit=5`);
        const data = await res.json();

        if (data.data && data.data.length > 0) {
            console.log(`Found ${data.meta.total} results.`);
            data.data.forEach(p => {
                console.log(` - ${p.name}`);
                console.log(`   Brand Field: '${p.brand}'`);
                console.log(`   Category Field: '${p.category}'`);
            });
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function runTests() {
    // 1. Broad search to check field values
    await testSearch("Sony");

    // 2. Smart Search Test
    await testSearch("Sony Camera");

    // 3. Lens Test
    await testSearch("Canon Lens");
}

runTests();
