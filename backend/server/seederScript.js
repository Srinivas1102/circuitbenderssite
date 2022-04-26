require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/db')
const Product = require('./models/Product')

connectDB();

const importData = async () => {
    try{
        console.log(Product)
        await Product.deleteMany({});
        await Product.insertMany(productsData);
        console.log("data imported succes");
        process.exit();
    } catch(error){
        console.log(error)
        console.error("Error with data import");
        process.exit(1);
    }
}
importData();