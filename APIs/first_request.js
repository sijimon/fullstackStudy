/*var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/
/*var request = require("request");
var weatherUrl = 'https://jsonplaceholder.typicode.com/users/2';
request(weatherUrl,function(error,response,body){
    if(error){
        console.log("Somthing went wrong");
        console.log(error);
        
    }else{
        if(response.statusCode==200){
            console.log(body);
        }
    }
});*/

const request = require("request");
var weatherUrl = 'https://jsonplaceholder.typicode.com/users/2';
request(weatherUrl,(error,response,body)=>{
 //   eval(require("locus"));
    if(!error && response.statusCode == 200){
        const parsedData = JSON.parse(body);
       // console.log(parsedData.name +"lives in "+ parsedData.address.city);
        console.log(`${parsedData.name} lives in ${parsedData.address.city}`);

    }
});

