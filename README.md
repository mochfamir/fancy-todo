# fancy-todo

| Route         | Method | Header(s) |                 Body                           | Description   |
|---------------|------|-----------|------------------------------------------------|---------------|
| /users/register | POST | none      | username:String, email:String, password:String | Sign up with new user info |
| /users/login | POST | none      | email:String, password:String                  | Sign In and get an access token based on credentials |
| /users/social | POST | none | none | Sign In with Google/Twitter/Facebook account |
| /todos | POST | token | name:String, description:String, dueDate:String | Create To-Do |
| /todos | GET | token | none | Get all todos |
| /todos/:id | GET | token | none | Get todo |
| /todos/:id | PUT | token | name:String, description:String, dueDate:String | Update todo |
| /todos/:id | REMOVE | token | none | Remove todo |
| /projects | POST | token | name:String | Add project |
| /projects | GET | token | none | Get all projects |
| /projects/:id | GET | token | none | Get project |
| /projects/:name | PUT | token | none | Add todo on project |