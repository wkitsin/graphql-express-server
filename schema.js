export default `

type Suggestion {
  id: Int!
  content: String!
  creator: User!
  board: Board!
}

type Board {
  id: Int!
  name: String!
  suggestions: [Suggestion!]!
  owner: Int!
}

type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  createdAt: String!
  updatedAt: String!
  boards: [Board!]!
  suggestions: [Suggestion!]!
}

type Subscription {
  userAdded: User!
}

type Query {
  me: User
  allUsers: [User!]!

  userBoards(owner: Int!): [Board!]!

  userSuggestions(creatorId: Int!): [Suggestion!]!

}

type Mutation {
  createUser(username: String!): User
  updateUser(username: String!, newUsername: String!): [Int!]!
  deleteUser(username: String!): Int!

  createBoard(name: String!, owner: Int!): Board!

  createSuggestion(text: String!, creatorId: Int!, boardId: Int!): Suggestion!

  register(username: String!, password: String!, email: String!): User!
  login(email: String!, password: String!): String!
}


schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
