const express = require('express');
const cors = require('cors');
const graphqlFields = require('graphql-fields');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers, loaders, datasource } = require('./schema');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		loaders,
		datasource,
		getFields: ast => Object.keys(graphqlFields(ast)),
	},
	playground: {
		endpoint: 'http://localhost:8000/graphql',
		settings: {
			'editor.theme': 'dark',
		},
	},
});

const app = express();
app.use(cors('*'));
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => console.log(`🚀 Server ready at http://localhost:8080/graphql`));
