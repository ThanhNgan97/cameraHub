// Quick reference: Products with specifications
// Run this script to see which products have specs: node list_products_with_specs.js

import { MOCK_PRODUCTS } from './src/data/mockProducts.js';

console.log('=== DANH SÁCH SẢN PHẨM CÓ THÔNG SỐ KỸ THUẬT ===\n');

const productsWithSpecs = MOCK_PRODUCTS.filter(p => p.specs);

console.log(`Tổng số sản phẩm có specs: ${productsWithSpecs.length}/${MOCK_PRODUCTS.length}\n`);

console.log('CAMERA PRODUCTS (có thông số kỹ thuật):');
console.log('==========================================');

productsWithSpecs.forEach((product, index) => {
    console.log(`${index + 1}. ID: ${product.id} | ${product.name}`);
    console.log(`   Brand: ${product.brand} | Category: ${product.category}`);
    console.log(`   URL: http://localhost:5175/user/products/${product.id}`);
    console.log('');
});

console.log('\n=== SẢN PHẨM KHÔNG CÓ SPECS (Lens & Accessories) ===');
const productsWithoutSpecs = MOCK_PRODUCTS.filter(p => !p.specs);
productsWithoutSpecs.slice(0, 5).forEach(product => {
    console.log(`ID: ${product.id} | ${product.name} | Category: ${product.category}`);
});
console.log(`... và ${productsWithoutSpecs.length - 5} sản phẩm khác\n`);
