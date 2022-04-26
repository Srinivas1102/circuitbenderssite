const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const config = require("./config/keys");
const https = require("https");
require("es6-promise").polyfill()
require("isomorphic-fetch")
const ngrok = require('ngrok');
const fs = require('fs').promises;

app.use(express.json());


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
connectDB();
app.use('/api/dialogflow', require('./routes/dialogflow'));
app.use('/api/', require('./routes/paymentRoute'));
app.use('/api/products', productRoutes);


(async function() {
  const url = await ngrok.connect(5001);
  const api = ngrok.getApi();
  // const tunnels = await api.listTunnels();
  let data = await api.listTunnels();
  console.log(data);
  // data = JSON.parse(data);
  let dict ={}
  let ngrokUrl=''
  if(data.tunnels[0].proto == 'https'){
   dict = {'domain': data.tunnels[0].public_url}
   ngrokUrl = data.tunnels[1].public_url
   console.log(data.tunnels[0].proto)
  }
  else{
   dict = {'domain': data.tunnels[1].public_url}
   ngrokUrl = data.tunnels[1].public_url
  }
  await fs.writeFile("../../frontend/src/ngrokconfig.json", JSON.stringify(dict));
  await fs.writeFile("./ngrokconfig.json", JSON.stringify(dict));
  console.log("saved " + ngrokUrl);
})();


app.post('/api/auth',(req,res) => {
  console.log("working")
  async function validate(){
  if(req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null)
    {
      return res.json({"success": false, "msg": "Please select captcha"})
    }
    const secretKey='6LcUw0McAAAAAD2MZCGXUvMDpvZHUdv96iDGI_jJ';
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`
    const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `secret=${secretKey}&response=${req.body.captcha}`
    })
      .then(res => res.json())
      .then((google_response) => {
        if (google_response.success == true) {
          console.log("success")
          //   if captcha is verified
          return res.send({ response: "Successful" });
        } else {
          console.log("fail")
          // if captcha is not verified
          return res.send({ response: "Failed" });
        }
      })
      .catch(err => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      })
    if (req.body.captcha === null || !isHuman) {
      throw new Error(`YOU ARE NOT A HUMAN.`)
    }
    // request(verifyUrl, (err, res, body) => {
    //   body = JSON.parse(body);
    //   console.log(err)
    //   if(body.success !== undefined && !body.success){
    //     console.log("failed")
    //     return res.json({"success": false, "msg": "Failed captcha"})
    //   }
    //   console.log("success")
    //   return res.json({"success": false, "msg": "Success captcha"})
    // })
  }
  validate();
})
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
})
