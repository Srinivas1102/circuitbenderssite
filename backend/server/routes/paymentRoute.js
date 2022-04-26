require('dotenv').config();
const formidable=require('formidable')
const express=require('express')
const http = require('http');
const {v4:uuidv4}=require('uuid')
const https=require('https')
const firebase=require('firebase/app')
const PaytmChecksum=require('paytmchecksum')
const db = require('../firebase')
const ngrokUrls = require('../ngrokconfig');


const router=express.Router()
router.post('/callback',(req,res)=>
{
console.log("patym body received")
console.log(req.body.CHECKSUMHASH)
const form = new formidable.IncomingForm();
console.log("patym form generating")
console.log(form)
form.parse(req,(err,fields,file)=>
{
    console.log("patym form received")
    console.log(fields.CHECKSUMHASH)
const paytmChecksum = fields.CHECKSUMHASH;
delete fields.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(fields, 'KcW9J5H@16hLViPS', paytmChecksum);
if (isVerifySignature) {
    var paytmParams = {};
    paytmParams["MID"]     = fields.MID;
    paytmParams["ORDERID"] = fields.ORDERID;
    
    /*
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(paytmParams, 'KcW9J5H@16hLViPS').then(function(checksum){
        paytmParams["CHECKSUMHASH"] = checksum;
        var post_data = JSON.stringify(paytmParams);
        console.log("patym parms sending")
        var options = {
            /* for Staging */
            hostname: 'securegw-stage.paytm.in',
            /* for Production */
            // hostname: 'securegw.paytm.in',
            port: 443,
            path: '/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
    
        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
                console.log("patym parms received")
                console.log(response)
            });
    
            post_res.on('end', function(){
                         let result=JSON.parse(response)
                         console.log(result)
                        if(result.STATUS==='TXN_SUCCESS')
                        {
                            db.collection('payments').doc('xvJnHNyJDxX2LBhdtbPD').update({paymentHistory:firebase.firestore.FieldValue.arrayUnion(result)})
                            .then(()=>console.log("Update success"))
                            .catch(()=>console.log("Unable to update"))
                        }
                        res.redirect(`https://circuitbenders.in/status/${result.ORDERID}`)
            });
        });
    
        post_req.write(post_data);
        post_req.end();
    });        
} else {
	console.log("Checksum Mismatched");
}
})

})

router.post('/payment',(req,res)=>
{

const{amount,email}=req.body;

    /* import checksum generation utility */
const totalAmount=JSON.stringify(amount);
var params = {};

/* initialize an array */
params['MID'] = 'BbSHhi78454204393835',
params['WEBSITE'] = 'WEBSTAGING',
params['CHANNEL_ID'] = 'WEB',
params['INDUSTRY_TYPE_ID'] = 'Retail',
params['ORDER_ID'] = uuidv4(),
params['CUST_ID'] = 'WEB_USER',
params['TXN_AMOUNT'] = totalAmount,
params['CALLBACK_URL'] = ngrokUrls.domain +'/api/callback',
params['EMAIL'] =email,
params['MOBILE_NO'] = '9876543210'

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(params, 'KcW9J5H@16hLViPS');
paytmChecksum.then(function(checksum){
    let paytmParams={
        ...params,
        "CHECKSUMHASH":checksum
    }
    res.json(paytmParams)
}).catch(function(error){
	console.log(error);
});

})
module.exports = router;