
const mongoose=require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect("mongodb://localhost:27017/yoga-data") 
        console.log('Mongodb connected')
    } catch(error) {
        console.log(error);
    }
}
module.exports=connectDB