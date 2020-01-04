const db = require('../../services/database');

const userDataSource = {
	async getById({ id, fields }) {
		return db
			.connection()
			.select(fields)
			.from('users')
			.where('id', id);
	},

	async getAll({ limit, fields }) {
		return db
			.connection()
			.select(fields)
			.limit(limit)
			.from('users')
			.where('deleted_at', null);
	},
	async createUser(data) {
		const { email, firstName, lastName, userName, password } = data;

		const user = {
			firstName,
			lastName,
			userName,
			email,
			password,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null,
		};

		try {
			const [id = null] = await db
				.connection()
				.insert(user)
				.table('users');

			return {
				id,
				...user,
			};
		} catch (err) {
			return { errors: err.sqlMessage };
		}
	},

	async updateUser({ id, user: userData }) {
		const [actualUser] = await db
			.connection()
			.select('*')
			.from('users')
			.where('id', id);

		if (!actualUser) {
			throw 'This user does not exists in database';
		}

		const user = {
			...actualUser,
			...userData,
			updated_at: new Date(),
		};

		try {
			const wasUpdated = await db
				.connection()
				.from('users')
				.where('id', id)
				.update(user);

			return wasUpdated
				? user
				: {
						errors: 'an error has ocurred during update of this user',
				  };
		} catch (err) {
			return { errors: err.sqlMessage };
		}
	},

	async inactiveUser(id) {
		const [userToBeDeleted = null] = await db
			.connection()
			.select('*')
			.from('users')
			.where('id', id);

		if (!userToBeDeleted) {
			throw 'This user does not exists in database';
		}

		if (userToBeDeleted.deleted_at) {
			throw 'This user is already deleted';
		}

		const user = {
			...userToBeDeleted,
			deleted_at: new Date(),
		};

		try {
			const deletedUser = await db
				.connection()
				.from('users')
				.where('id', id)
				.update(user);

			return deletedUser
				? user
				: {
						errors: 'an error has ocurred during this process',
				  };
		} catch (err) {
			return { errors: err.sqlMessage };
		}
	},
};

module.exports = userDataSource;
