const { test, expect } = require('@jest/globals');

function calculateTax(price, tax){
    // rounds price to the closest 0.05 by multiplying the number by 20, rounding it, and then dividing by 20 again. then adds the tax to the number to get an accurate tax figure.
    return ((Math.ceil(price*20)/20).toFixed(2)) * (tax/100);
}

function addToCart(product_name, price){
    // make sure that a capital I will be caught for imported products
    product_name = product_name.toString().toLowerCase();
    // make sure price gets recognised as a float at all times.
    price = parseFloat(price);
    // make an array of goods not to be taxed, then check isTaxedGoods to see if the product name is NOT in the list of excluded products
    let notTaxedGoods = ['chocolate', 'pill', 'book'];
    isTaxedGoods = notTaxedGoods.findIndex(element=>product_name.includes(element)) == -1;
    // nested if statement to check if product is imported AND sales taxed, OR only imported
    // not sure if a switch statement would work better for this? possible todo in the future
    if(product_name.includes('imported')){
        if(isTaxedGoods){
            taxprice = calculateTax(price, 15);
            newprice = price + taxprice;
        }
        else{
            taxprice = calculateTax(price, 5);
            newprice = price + taxprice;
        }
    }else if(isTaxedGoods){
        taxprice = calculateTax(price, 10);
        newprice = price + taxprice;
    }else{
        newprice = price;
    }
    // I have to round the end result for the newprice to 2 digits due to IEEE754.
    newprice = (Math.round(newprice*100)/100).toFixed(2);
    newprice = parseFloat(newprice);
    
    return newprice
}

function createReceipt(data){
    // create 3 empty variables: an empty tax variable to count how much tax is paid, 
    // a total variable to count the total price, 
    // and an empty output variable to push our output into
    var tax = 0;
    var output = '';
    var total = 0;
    // runs through the array ONCE to fill in all the data (so o(n) time). 
    for(x=0;x<data.length;x++){
        // calls upon the earlier written function to calculate the tax. I could have made this in a single function but I think this is easier to oversee
        data[x]['taxedprice'] = addToCart(data[x]['product_name'], data[x]['price']);
        tax = tax + (data[x]['taxedprice'] - data[x]['price']);
        total = total + data[x]['taxedprice'];
        output = output + `1 ${data[x]['product_name']}: €${data[x]['taxedprice']}<br>`;
    }
    var tax = (Math.round(tax*100)/100).toFixed(2);
    var total = (Math.round(total*100)/100).toFixed(2);
    output = output + `Sales Tax: €${tax}<br>total: €${total}`;
    return output;
}

module.exports = addToCart, createReceipt