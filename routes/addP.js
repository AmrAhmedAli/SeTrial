var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
//var con = new Connection({host:'cassandra-host', port:9160, keyspace:'users'});
const options = {
    contactPoints: ['127.0.0.1']
};
const client = new cassandra.Client(options);
client.connect(function(err,result){
});
/* GET home page. */
router.post('/', function(req, res, next) {
if(req.user){
var id = cassandra.types.uuid();
var sql = "INSERT INTO users.posts(id, username, post) VALUES (?,?,?)";

client.execute(sql,[id , req.user , req.body.firstname ],function(err,result){
	if(err){
		res.status(404).send({msg: err});
	}else{
		
		res.redirect('/posts');
	}
});
  
	
}else{
res.render('index', { title: 'Express' });
}
	
});

module.exports = router;
