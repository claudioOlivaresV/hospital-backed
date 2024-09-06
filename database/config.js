const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB conect')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error', error)
        
    }

}

module.exports = {
    dbConnection
}