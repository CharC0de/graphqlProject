export const typeDefs = `#graphql
type  Game {
    _id:ID
    title:String!
    platform: [String!]!
    reviews: [Review!]
}
type Review {
    _id: ID
    rating: Int!
    content: String!
    author:Author!
    game:Game!
}
type Author{
    _id: ID
    name: String!
    verified: Boolean!
    reviews: [Review!]!
}
type User {
    _id: ID
    username: String!
    age: Int!
    email: String!
    address:String!

}
type Query {
     reviews: [Review]
     games:[Game]
     authors:[Author]
     users:[User]
     user(id:ID!):User
     review(id:ID!):Review
     game(id:ID!):Game
     author(id:ID!):Author
}
type Mutation {
    addGame(game:AddGameInput!):Game
    addAuthor(author:AddAuthorInput!):Author
    addReview(review:AddReviewInput!):Review
    addUser(user:AddUserInput!):User

    deleteGame(id:ID!):[Game]
    deleteReview(id:ID!):[Review]
    deleteAuthor(id:ID!):[Author]
    deleteUser(id:ID!):[User]

    updateGame(id:ID!,game:UpdateGameInput):Game
    updateAuthor(id:ID!,author:UpdateAuthorInput):Author
    updateReview(id:ID!,review:UpdateReviewInput):Review
    updateUser(id:ID!,user:UpdateUserInput):User
}

input AddReviewInput {
    rating: Int!
    content: String!
    game_id: String!
    author_id:String!
}
input AddGameInput {
    title:String!
    platform:[String!]!
}
input AddAuthorInput {
    name: String!
    verified: Boolean!
}
input AddUserInput {
    username: String!
    age: Int!
    email: String!
    address:String!
}

input UpdateReviewInput {
    rating: Int
    content: String
    game_id: String
    author_id:String
}
input UpdateGameInput {
    title:String
    platform:[String]
}
input UpdateAuthorInput {
    name: String
    verified: Boolean
}
input UpdateUserInput {
    username: String
    age: Int
    email: String
    address:String
}
`;
