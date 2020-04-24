# USER

### PUT `/user/pwd?uid`
User with id `uid` change password
#### Request
```
{
    "password": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```

### PUT `/user/about?uid`
User with id `uid` change `About Me` field
#### Request
```
{
    "about": ...
}
```
#### Response
```
{
    "message": ...,
    "status": ...
}
```