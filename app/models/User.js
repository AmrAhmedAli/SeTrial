var cassandra = require('cassandra-driver');


var userSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type: String,
            default: 'Admin'
        }
    }
)


var Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
