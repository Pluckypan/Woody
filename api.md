### `Ajax` 调用 `Github` `API`
> `Woody` 的数据同步主要依赖于 `Github` `Gist`,`Github` 提供了相应的 `API` ,`Woody` 使用的是 [Github Rest API V3](https://developer.github.com/v3/).在使用的过程中遇到了一些列问题，这里记录下。

### `Gist API Error`
##### 一、 [Gist API 地址](https://developer.github.com/v3/gists/)
##### 二、 Error: 404 Not Found
> 出现这个错误的原因是Github授权失败，授权的方式有三种，具体参见 [链接](https://developer.github.com/v3/#authentication)，这里使用 `header` 的形式。

``` javascript
$.ajax({
  //在 `beforeSend` 设置请求 `Header`
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", "token $your_token");
  }
});
```

##### 三、 Error: Problems parsing JSON
> 遇到这个错误，怀疑以下三点：1.`data` 中 `key` 或者 `value` 有问题 2.存在特殊字符 3.**空格** 或者 **双引号** . 但是三项一一排除后还是存在问题。最终解决的方式是：**data 传 json 字符串**

``` javascript
var _data = {
  'description': 'AAA',
  'files': {
    'A.md': {
      'content': 'AAAA' + new Date()
    }
  }
};
$.ajax({
  //重点是 `data` 传的参数必须是 **JSON字符串**
  data:JSON.stringify(_data)
});
```

##### 四、 Error: Invalid request For 'links/1/schema', nil is not an object.
> 这个问题出现在调用 [Edit Gist](https://developer.github.com/v3/gists/#edit-a-gist) 这个API.API使用 `PATCH` 方式调用，可以采用这种方式却出错，换成 `POST` 竟然成功了，**意不意外，惊不惊喜**.还没找到原因。


### 示例接口
##### 一、获取指定 `id` **Gist**
> GET /gists/:id

``` javascript
var _id = "********* your gist id *********";
var _token = "token " + "******* your token ********";

$.ajax({
  url: "https://api.github.com/gists/" + _id,
  type: 'GET',
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", _token);
    xhr.setRequestHeader("Accept", "application/vnd.github.v3.raw+json");
  },
  success: function(result) {
    console.log(result);
  }
});

```

##### 二、编辑指定 `id` **Gist**
> PATCH /gists/:id  (需使用POST)

``` javascript
var _id = "********* your gist id *********";
var _token = "token " + "******* your token ********";

var _data = {
  'description': '《咏柳》贺知章',
  'public':false,
  'files': {
    'lovely-spring.md': {
      'content': '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。'
    }
  }
};

$.ajax({
  url: 'https://api.github.com/gists/' + _id,
  type: 'POST',
  data: JSON.stringify(_data),
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", _token);
    xhr.setRequestHeader("Accept", "application/vnd.github.v3.raw+json");
  },
  success: function(result) {
    console.log(result);
  }
});

```

|字段名|类型|说明|
| :---: | ---- | :---- |
|description|string|针对Gist的描述.|
|public|boolean|是否公开: true=公开 false=私密.|
|files|object|该Gist下的文件.|
|content|string|文件内容.|
|filename|string|文件名(含后缀).|

``` json
{
  "description": "Woody数据结构",
  "files": {
    "file1.txt": {
      "content": "这种形式可以更新 files1.txt 的内容"
    },
    "old_name.txt": {
      "filename": "new_name.txt",
      "content": "这种形式可以重命名 old_name.txt "
    },
    "new_file.txt": {
      "content": "这种形式可以添加新文件 new_file.txt "
    },
    "delete_this_file.txt": null
  }
}

```
`"delete_this_file.txt": null` 可以作为删除文件用.
