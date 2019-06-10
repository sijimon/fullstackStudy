var faker = require('faker');

var iCount = 0;

while(iCount <= 100){
console.log(faker.commerce.productName() + ": $" + faker.commerce.price());
iCount ++;


}