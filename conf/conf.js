var conf = {
    ip: process.env.OPENSHIFT_NODEJS_IP,
    puerto: process.env.OPENSHIFT_NODEJS_PORT,
    strConexion: 'mongodb://admin:4yTVnNjE77wt@'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/elep', 
    strConexionE0:'mongodb://el0-ca23sere.c9users.io'+':8080/E'
    //strConexionE0:'mongodb://104.197.33.159'+':27017/E'
	
}

console.log(conf);

module.exports.conf = conf;