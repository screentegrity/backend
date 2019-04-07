const { PubSub } = require("apollo-server");

const something = require('../models/something')
const candidate = require('../models/candidates')

const pubsub = new PubSub();

const SOMETHING_ADDED = 'SOMETHING_ADDED';

const resolvers = {
  Query: {
    hello: () => 'world',
    candidates: async (root, args, context) => {
      const result = await candidate.all(args)
      return result
    }
  },
  Mutation: {
    createSomething: async (root, args, context) => {
      
      const result = await something.create(args)
      pubsub.publish(SOMETHING_ADDED, {somethingAdded: result})
      return result
    },
    addCandidate: async (root, args, context) => {
      const result = await candidate.create(args)
      return result
    },
  },
  Subscription: {
    somethingAdded: {
      subscribe: () => pubsub.asyncIterator([SOMETHING_ADDED])
    }
  }
}

module.exports = { resolvers }