# Activity

### GET `/activity`
Return list of ongoing activities
#### Response
```
{
    "activities": [
        {
            "id": ...,
            "name": ...,
            "description": ...,
            "activityDate": ...,
            "maxParticipants": ...,
            "minParticipants": ...,
            "type": ...,
            "createdAt": ...,
            "updatedAt": ...,
            "deletedAt": ...
        }
    ]
}
```

### GET `/activity?uid`
Return list of ongoing activities created by user with id `uid`
#### Response
```
{
    "activities": [
        {
            "id": ...,
            "name": ...,
            "description": ...,
            "activityDate": ...,
            "maxParticipants": ...,
            "minParticipants": ...,
            "type": ...,
            "createdAt": ...,
            "updatedAt": ...,
            "deletedAt": ...
        }
    ]
}
```

### GET `/activity/past`
Return list of past activities
#### Response
```
{
    "activities": [
        {
            "id": ...,
            "name": ...,
            "description": ...,
            "activityDate": ...,
            "maxParticipants": ...,
            "minParticipants": ...,
            "type": ...,
            "createdAt": ...,
            "updatedAt": ...,
            "deletedAt": ...
        }
    ]
}
```

### GET `/activity/past?uid`
Return list of past activities created by user with id `uid`
#### Response
```
{
    "activities": [
        {
            "id": ...,
            "name": ...,
            "description": ...,
            "activityDate": ...,
            "maxParticipants": ...,
            "minParticipants": ...,
            "type": ...,
            "createdAt": ...,
            "updatedAt": ...,
            "deletedAt": ...
        }
    ]
}
```

### POST `/activity?uid`
Create an activity for user with id `uid`
#### Request
Body:
```
{
    "name": ...,
    "description": ...,
    "activityDate": ...,
    "maxParticipants": ...,
    "minParticipants": ...,
    "type": ...
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
Update an activity description with activity id `id` created by user with id `uid`
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

### POST `activity/join/cancel?uid`
User with id `uid` cancel request to join activity with activity id `id`
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

### GET `/activity/join?uid`
Return list of joined activities from user with id `uid`
#### Response
```
[
    {
        "id": ...,
        "name": ...,
        "description": ...,
        "activityDate": ...,
        "maxParticipants": ...,
        "minParticipants": ...,
        "participantsCount": ...,
        "type": ...,
        "createdAt": ...,
        "updatedAt": ...,
        "deletedAt": ...
    }
]
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

### POST `/activity/reject?uid`
User with id `uid` reject join activity request from user with user id `userId` with activity id `activityId`
#### Request
Body:
```
{
    "userId": ...,
    "activityId": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### POST `activity/join/cancel?uid`
User with id `uid` cancel request to join activity with activity id `id`
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

### GET `/activity/join?uid`
Return list of joined activities from user with id `uid`
#### Response
```
[
    {
        "id": ...,
        "name": ...,
        "description": ...,
        "activityDate": ...,
        "maxParticipants": ...,
        "minParticipants": ...,
        "participantsCount": ...,
        "type": ...,
        "createdAt": ...,
        "updatedAt": ...,
        "deletedAt": ...
    }
]
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

### POST `/activity/accept?uid`
User with id `uid` accept join activity request from user with user id `userId` with activity id `activityId`
#### Request
Body:
```
{
    "userId": ...,
    "activityId": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```