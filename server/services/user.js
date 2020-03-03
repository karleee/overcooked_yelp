const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const userSeedData = [
    { firstName: 'Todd', lastName: 'Chavez', email: 'todd@chavez.com', password: 'hunter12', zipCode: '91601' },
    { firstName: 'Princess', lastName: 'Carolyn', email: 'princess@carolyn.com', password: 'hunter12', zipCode: '91801' },
    { firstName: 'Russ', lastName: 'Hanneman', email: 'russ@hanneman.com', password: 'hunter12', zipCode: '90031' },
    { firstName: 'Eric', lastName: 'Cartman', email: 'eric@cartman.com', password: 'hunter12', zipCode: '94015' },
    { firstName: 'Jian', lastName: 'Yang', email: 'jian@yang.com', password: 'hunter12', zipCode: '94080' },
];
const seedDb = async () => {
    await User.deleteMany({});
    userSeedData.forEach(async user => {
        let newUser = new User(user);
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
    });
    return { '_id': 'Successful Seed' }
}



module.exports = { seedDb }