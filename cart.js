const { test, expect } = require('@jest/globals');

function calculateTax(price, tax){
    // calculates the tax in the following order: price gets multiplied by tax/100. Then we multiply this by 20 and round up to the nearest number. After that,
    // we divide the end result by 20, making it round to the closest 0.05.
    return ((Math.ceil(((price*(tax/100))*20)))/20);
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
    newprice = (Math.round(newprice*100)/100);
    newprice = parseFloat(newprice).toFixed(2);
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
        // each iteration creates a new rule in the output. Future TODO would be to replace 1 with amount and calculate price with that number!
        output = output + `1 ${data[x]['product_name']}: €${parseFloat(data[x]['taxedprice']).toFixed(2)}<br>`;
    }
    // rounding tax and total again because of IEEE. (I wanna get 16.50, not 16.500000000000000002)
    var tax = (Math.round(tax*100)/100).toFixed(2);
    var total = (Math.round(total*100)/100).toFixed(2);
    output = output + `Sales Tax: €${tax}<br>Total: €${total}`;
    return output;
}

module.exports = createReceipt