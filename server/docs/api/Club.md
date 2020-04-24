# Activity

### GET `/club`
Return list of clubs
#### Response
```
[
    {
        "id": ...,
        "name": ...,
        "description": ...,
        "createdAt": ...,
        "updatedAt": ...
    }
]
```

### GET `/club?uid`
Return list of clubs created by user with id `uid`
#### Response
```
[
    {
        "id": ...,
        "name": ...,
        "description": ...,
        "createdAt": ...,
        "updatedAt": ...
    }
]
```


### POST `/club?uid`
Create a club for user with id `uid`
#### Request
Body:
```
{
    "name": ...,
    "description": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### PUT `/activity?uid`
Update a club description with club id `id` created by user with id `uid`
#### Request
Body:
```
{
    "id": ...,
    "description": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### POST `/activity/join?uid`
User with id `uid` request to join an activity with activity id `id`
#### Request
Body:
```
{
    "id": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### POST `club/join?uid`
User with id `uid` cancel request to join activity with activity id `id`
#### Request
Body:
```
{
    "id": ...,
    "reason": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```



### GET `/activity/pending?uid&aid`
Return list of users who signed up for activity with activity creator id `uid` and activity id `aid`
#### Response
```
[
    {
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
    }
]
```

### GET `/club/join?uid`
Return list of clubs that user with id `uid` has joined
#### Response
```
[
    {
        "id": ...,
        "name": ...,
        "description": ...,
        "createdAt": ...,
        "deletedAt": ...
    }
]
```

### GET `/club/pending?uid&cid`
Return list of pending join club request for club with id `cid` and club creator with id `uid`
#### Response
```
[
    {
        "id": ...,
        "firstName": ...,
        "lastName": ...,
        "email": ...,
        "password": ...,
        "college": ...,
        "major": ...,
        "gender": ...,
        "about": ...,
        "createdAt": ...,
        "updatedAt": ...,
        "reason": ...
    }
]
```

### POST `/club/reject?uid`
User with id `uid` accept join club request from user with user id `userId` with club id `clubId`
#### Request
Body:
```
{
    "userId": ...,
    "clubId": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### POST `/club/accept?uid`
User with id `uid` reject join club request from user with user id `userId` with club id `clubId`
#### Request
Body:
```
{
    "userId": ...,
    "clubId": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### GET `/club?id`
Return list of users in club with id `id`
#### Response
```
[
    {
        "id": ...,
        "userId": ...,
        "clubId": ...,
        "hasJoined": ...,
        "reason": ...,
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
        }
    },
]
```