// All the Graphql queries and mutations for the auth module

export const GET_USER = `
query getUser($token: String!){
    getUser(token: $token){
        name
        createdAt
        email
    }
}
`

export const SIGN_IN = `
query login($input: LoginInput!){
    login(input: $input) {
        token
        user {
            name
            email
        }
    }
}
`

export const LOG_OUT = `
mutation logout{
    logout
}
`

export const SIGN_UP = `
mutation signup($input: RegisterInput!){
    signup(input: $input){
        name
        email
        password
        createdAt
    }
}`
