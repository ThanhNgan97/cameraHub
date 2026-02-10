
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testSearch(term) {
    try {
        console.log(`\nSEARCHING FOR: "${term}"`);
        const res = await fetch(`http://localhost:3000/api/users/products/search?search=${encodeURIComponent(term)}&limit=5`);
        const data = await res.json();

        if (data.data && data.data.length > 0) {
            console.log(`Found ${data.meta.total} results.`);
            data.data.forEach(p => {
                console.log(` - ${p.name} (Brand: ${p.brand?.name || 'N/A'}, Category: ${p.category?.name || 'N/A'})`);
            });
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function runTests() {
    // 1. Specific Brand + Category (Should only return Sony Cameras)
    await testSearch("Sony Camera");

    // 2. Another Brand + Category
    await testSearch("Canon Lens");

    // 3. Just Brand
    await testSearch("Fujifilm");
}

runTests();
