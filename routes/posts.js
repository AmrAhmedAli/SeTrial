var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
//var con = new Connection({host:'cassandra-host', port:9160, keyspace:'users'});
const options = {
    contactPoints: ['127.0.0.1']
};
const client = new cassandra.Client(options);
client.connect(function(err,result){
console.log("cassandra connected");
});
/* GET users listing. */
router.get('/', function(req, res, next) {
if(req.user){
client.execute('SELECT * FROM users.posts',[],function(err,result){
	if(err){
		res.status(404).send({msg: err});
	}else{
		
		res.render('posts', { user: req.user , quotation:result.rows});	
	}
});
  
	
}else{
res.render('index', { title: 'Express' });
}
});


/*
function deleteUser() {
    var cassandra = require('cassandra-driver');
const options = {
    contactPoints: ['127.0.0.1']
};
const client = new cassandra.Client(options);
client.connect(function(err,result){
client.execute('DELETE FROM users.posts where id = ?',[document.getElementById("submit").value],function(err,result){
console.log(err);
location.reload();
});
}*/

router.delete('/:id',function(req,res){
	client.execute('DELETE FROM users.posts where id = ?',[req.body.id],function(err,result){
	
	res.send(null);
});
});

module.exports = router;
