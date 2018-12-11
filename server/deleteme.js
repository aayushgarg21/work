var bcrypt = require('bcryptjs');
var password = "Aayush";
var hash = bcrypt.hashSync(password, 8);
console.log(hash);
var result = bcrypt.compareSync(password, hash);
console.log(result);
