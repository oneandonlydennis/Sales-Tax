const { test, expect } = require('@jest/globals');
const addToCart = require('./cart');
const createReceipt = require('./cart');
const cart = require('./cart');

const testData = 
[
    [
        [
            {product_name: 'book', price: 12.49}, 
            {product_name: 'Chocolate Bar', price: 0.85}, 
            {product_name: 'Music CD', price: 14.99}
        ], 
        '1 book: €12.49<br>1 Chocolate Bar: €0.85<br>1 Music CD: €16.49<br>Sales Tax: €1.50<br>Total: €29.83'
    ],
    [
        [
            {product_name: 'imported box of chocolates', price: 10.00}, 
            {product_name: 'imported bottle of perfume', price: 47.50}
        ],
        '1 imported box of chocolates: €10.50<br>1 imported bottle of perfume: €54.65<br>Sales Tax: €7.65<br>Total: €65.15'
    ],
    [
        [
            {product_name: 'imported bottle of perfume', price: 27.99}, 
            {product_name: 'bottle of perfume', price: 18.99}, 
            {product_name: 'packet of headache pills', price: 9.75},
            {product_name: 'imported box of chocolates', price: 11.25}
        ],
        '1 imported bottle of perfume: €32.19<br>1 bottle of perfume: €20.89<br>1 packet of headache pills: €9.75<br>1 imported box of chocolates: €11.85<br>Sales Tax: €6.70<br>Total: €74.68'
    ]
];

// test('the input returns the expected output.', (input,) => {
//     expect(createReceipt(testData)).toEqual('1 book: €12.49<br>1 Chocolate Bar: €0.85<br>1 Music CD: €16.49<br>Sales Tax: €1.50<br>total: €29.83');
// });

test.each(testData)('check if tax get calculated correctly', (input, output) => {
    expect(createReceipt(input)).toEqual(output);
})