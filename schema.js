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
  createdAt: String!
  updatedAt: String!
  boards: [Board!]!
  suggestions: [Suggestion!]!
}

type Query {
  getUser(username: String!): User
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
}
`;
