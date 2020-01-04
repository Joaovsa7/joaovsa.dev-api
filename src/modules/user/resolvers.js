const resolvers = {
	Query: {
		async users(_, { limit }, { loaders, getFields }, ast) {
			const fields = getFields(ast);
			return loaders.user.getAll.load({ limit, fields });
		},
		async user(_, { id }, { loaders, getFields }, ast) {
			const fields = getFields(ast);
			const userResult = await loaders.user.getUserById.load({ id, fields });
			return userResult;
		},
	},
	Mutation: {
		async createUser(_, { user }, { datasource }) {
			const userResponse = await datasource.user.createUser(user);
			if (userResponse.errors) {
				throw userResponse.errors;
			}
			return userResponse;
		},

		async updateUser(_, { id, user }, { datasource }) {
			const userResponse = await datasource.user.updateUser({ id, user });
			if (userResponse.errors) {
				throw userResponse.errors;
			}
			return userResponse;
		},

		async inactiveUser(_, { id }, { datasource }) {
			const deletedUser = await datasource.user.inactiveUser(id);
			if (deletedUser.errors) {
				throw deletedUser.errors;
			}
			return deletedUser;
		},
	},
};

module.exports = resolvers;
