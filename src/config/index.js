const {
	DB_HOST = '',
	DB_PORT = '',
	DB_USER = '',
	DB_PASSWORD = '',
	DB_NAME = '',
	REDIS_HOST = '',
	REDIS_PORT = 6379,
} = process.env;

module.exports = {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
};
