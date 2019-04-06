const something = require('../models/something')

const resolvers = {
  Query: {
    hello: () => 'world'
  },
  Mutation: {
    createSomething: async (root, args, context) => {
      return await something.create(args)
    }
  }
}

module.exports = { resolvers }