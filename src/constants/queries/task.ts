// All the graphql queries and mutations for the task module

export const GET_ALL_TASKS = `
query getAllTasks($input: GetAllTasksInput!){
    getAllTasks(input:$input){
        tasks {
            _id
            content
            user{
                name
                email
            }
            createdAt
            updatedAt
            status
        }
        total
    }
}
`

export const CREATE_TASK = `
mutation createTask ($content: String!){
    createTask(content: $content){
        _id
        content
        createdAt
        updatedAt
        user {
            name
            email
        }
        status
    }
}
`

export const UPDATE_TASK = `
mutation updateTask ($input: UpdateTaskInput!){
    updateTask(input: $input){
        _id
        content
        createdAt
        updatedAt
        user{
            name
        }
        status
    }
}`

export const DELETE_TASK = `
mutation deleteTask ($id: String!){
    deleteTask(id: $id)
 }`
