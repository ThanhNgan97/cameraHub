// Test script to verify mockProducts data structure
import { MOCK_PRODUCTS } from './src/data/mockProducts.js';

console.log('=== MOCK PRODUCTS TEST ===\n');
console.log('Total products:', MOCK_PRODUCTS.length);

// Check first few products for specs
const productsWithSpecs = MOCK_PRODUCTS.filter(p => p.specs);
const productsWithoutSpecs = MOCK_PRODUCTS.filter(p => !p.specs);

console.log('\nProducts WITH specs:', productsWithSpecs.length);
console.log('Products WITHOUT specs:', productsWithoutSpecs.length);

console.log('\n=== First 5 Products ===');
MOCK_PRODUCTS.slice(0, 5).forEach(product => {
    console.log(`\nID: ${product.id}`);
    console.log(`Name: ${product.name}`);
    console.log(`Category: ${product.category}`);
    console.log(`Has specs: ${!!product.specs}`);
    if (product.specs) {
        console.log('Specs keys:', Object.keys(product.specs));
        console.log('Sample spec - sensor:', product.specs.sensor);
    }
});

console.log('\n=== Checking for TypeScript syntax issues ===');
try {
    const testProduct = MOCK_PRODUCTS[0];
    console.log('Product 1 can be accessed:', !!testProduct);
    console.log('Product 1 specs can be accessed:', !!testProduct.specs);
    console.log('Product 1 specs.sensor:', testProduct.specs?.sensor);
} catch (error) {
    console.error('ERROR accessing product data:', error);
}
