# Activity

### POST `/auth/register`
Handle user registration
### Request
Body:
```
{
	"firstName": ...,
	"lastName": ...,
	"email": ...,
	"password": ...,
	"college": ...,
	"major": ...,
	"gender": ...
}
```
#### Response
```
{
    "user": {
        "id": ...,
        "firstName": ...,
        "lastName": ...,
        "email": ...,
        "password": "",
        "college": ...,
        "major": ...,
        "gender": ...,
        "about": ...,
        "createdAt": ...,
        "updatedAt": ...
    },
    "accessToken": ...
}
```

### POST `/auth/login`
Handle user login
### Request
Body:
```
{
	"email": ...,
	"password": ...
}
```
#### Response
```
{
    "user": {
        "id": ...,
        "firstName": ...,
        "lastName": ...,
        "email": ...,
        "password": "",
        "college": ...,
        "major": ...,
        "gender": ...,
        "about": ...,
        "createdAt": ...,
        "updatedAt": ...
    },
    "accessToken": ...
}
```

### POST `/auth/logout`
Handle user logout
#### Request
```
{}
```
#### Response
```
{}
```