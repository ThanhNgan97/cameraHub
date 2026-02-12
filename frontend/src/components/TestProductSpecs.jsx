import React from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export default function TestProductSpecs() {
    // Get first product with specs
    const product = MOCK_PRODUCTS.find(p => p.specs);

    console.log('TestProductSpecs - Product:', product);
    console.log('TestProductSpecs - Specs:', product?.specs);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1>Test Product Specs Display</h1>

            <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <h2>Product Info:</h2>
                <p><strong>ID:</strong> {product?.id}</p>
                <p><strong>Name:</strong> {product?.name}</p>
                <p><strong>Category:</strong> {product?.category}</p>
                <p><strong>Has Specs:</strong> {product?.specs ? 'YES' : 'NO'}</p>
            </div>

            {product?.specs && (
                <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    <h2>Specifications:</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            {Object.entries(product.specs).map(([key, value]) => (
                                <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', width: '30%' }}>{key}</td>
                                    <td style={{ padding: '10px' }}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <h2>Raw Specs Data:</h2>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
                    {JSON.stringify(product?.specs, null, 2)}
                </pre>
            </div>

            <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <h2>All Products Stats:</h2>
                <p>Total products: {MOCK_PRODUCTS.length}</p>
                <p>Products with specs: {MOCK_PRODUCTS.filter(p => p.specs).length}</p>
                <p>Products without specs: {MOCK_PRODUCTS.filter(p => !p.specs).length}</p>
            </div>
        </div>
    );
}
