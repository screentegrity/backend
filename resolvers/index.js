const { PubSub } = require("apollo-server");

const something = require('../models/something')
const candidate = require('../models/candidates')
const candidates_answers = require('../models/candidates_answers')

const pubsub = new PubSub();

const SOMETHING_ADDED = 'SOMETHING_ADDED';

const resolvers = {
  Query: {
    hello: () => 'world',
    candidates: (root, args, context) => {
      const result = candidate.all(args)
      return result
    },
    getUnscoredAnswers: (root, args, context) => {
      const result = candidates_answers.getUnscoredAnswers(args)
      return result
    }
  },
  Mutation: {
    createSomething: (root, args, context) => {
      const result = something.create(args)
      pubsub.publish(SOMETHING_ADDED, {somethingAdded: result})
      return result
    },
    addCandidate: (root, args, context) => {
      const result = candidate.create(args)
      return result
    },
    setCandidateStatusPending: (root, args, context) => {
      const result = candidate.update({...args, review_status: 'PENDING', previous_status: 'NEW'})
      return result
    },
    setCandidateStatusCompleted: (root, args, context) => {
      const result = candidate.update({...args, review_status: 'COMPLETED', previous_status: 'PENDING'})
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