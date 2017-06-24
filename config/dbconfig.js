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
            user     : 'be910e2a600c1a',
            password : 'bc20dbc5',
            database : 'heroku_6b75c71f60eab19',
            debug    :  false
        };
}

module.exports = dbconfig;
