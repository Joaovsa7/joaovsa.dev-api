const { gql } = require('apollo-server-express');

const typeDefs = gql`
	extend type Query {
		user(id: Int): User
		users(limit: Int): [User]
	}

	extend type Mutation {
		createUser(user: UserData): CreateUserResponse
		updateUser(id: Int!, user: UserData): User
		deleteUser(id: Int!): User
	}

	type User {
		id: Int
		firstName: String
		lastName: String
		userName: String
		password: String
		email: String
		created_at: DateTime
		updated_at: DateTime
		deleted_at: DateTime
	}

	input UserData {
		firstName: String
		lastName: String
		userName: String
		password: String
		email: String
	}

	input UpdateUser {
		firstName: String
		lastName: String
		userName: String
		password: String
		email: String
	}

	input DeleteUser {
		id: Int
	}

	type CreateUserResponse {
		id: Int
		firstName: String
		lastName: String
		email: String
		token: String
	}
`;

module.exports = typeDefs;
