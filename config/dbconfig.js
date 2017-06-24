var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

switch(env) {
    case 'development':
        process.env.PORT = 3000;

        var dbconfig = {
            connectionLimit : 100,
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'playground',
            debug    :  false
        };
        break;
    case "test":
        // to do
        break;
    default:
        var dbconfig = {
            connectionLimit : 100,
            host     : 'us-cdbr-iron-east-03.cleardb.net',
            user     : 'be06fea7c0b0ce',
            password : '051c2e19',
            database : 'heroku_0571341e1415f9f',
            debug    :  false
        };
}

module.exports = dbconfig;
