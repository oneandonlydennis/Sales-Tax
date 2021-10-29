const { test, expect } = require('@jest/globals');
const addToCart = require('./cart');
const createReceipt = require('./cart');
const cart = require('./cart');

const testData = [
    {product_name: 'book', price: 12.49}, 
    {product_name: 'Chocolate Bar', price: 0.85}, 
    {product_name: 'Music CD', price: 14.99}
];

test('the input returns the expected output.', () => {
    expect(createReceipt(testData)).toEqual('1 book: €12.49<br>1 Chocolate Bar: €0.85<br>1 Music CD: €16.49<br>Sales Tax: €1.50<br>total: €29.83');
})