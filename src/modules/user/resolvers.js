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
	},
};

module.exports = resolvers;
