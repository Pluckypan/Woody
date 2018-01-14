### API
#### Get a single gist
> GET /gists/:id

``` javascript
$.ajax({url:"https://api.github.com/gists/6dcc0f2b41c1641ed3e0fa81b04c3a5d",
        success:function(result){
            $("#output").JSONView(result, { collapsed: false });
}});
```

#### Edit a gist
> PATCH /gists/:id

``` javascript

```

|Name|Type|Description|
| :---: | ---- | :---- |
|description|string|A description of the gist.|
|files|object|Files that make up this gist.|
|content|string|Updated file contents.|
|filename|string|New name for this file.|

``` json
{
  "description": "the description for this gist",
  "files": {
    "file1.txt": {
      "content": "updated file contents"
    },
    "old_name.txt": {
      "filename": "new_name.txt",
      "content": "modified contents"
    },
    "new_file.txt": {
      "content": "a new file"
    },
    "delete_this_file.txt": null
  }
}
```
