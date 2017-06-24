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
            user     : 'bad064e1d20b44',
            password : '93a2e19e',
            database : 'heroku_4b90ac511e96124',
            debug    :  false
        };
}

module.exports = dbconfig;
