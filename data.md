### Woody数据结构
> 由于 `Github API` 存在访问次数的限制(获取和编辑 **5000次**，新增大概 **50次**)。`Woody` 不采取每个动作都及时调用API同步数据。而是在恰当的时机去拉取数据和推送数据。

1. 拉取完数据后先对本地数据进行清库处理，然后对新拉取的数据进行入库处理
2. 推送数据时直接数据库取数据
3. 添加书签时，进行单条入库
4. 删除书签时，数据库进行单条清除
5. 更新书签时，对数据库进行单条更新
6. 数据的同步 通过 **同步按钮** 来实现
7. url作为唯一标示在 **Bookmark** 和 **Analysis** 中唯一

### 分类结构
> **Category** 构造一个树形结构

|字段|类型|描述|
|:---:|:---:|:--:|
|id|int|分类编码(自增主键)|
|pid|int|父级id|
|name|string|名称|
|desc|string|分类描述|
|icon|string|图标(预留字段)|
|type|int|类型(预留字段)|
|uid|string|用户id(预留字段)|
|uhome|string|用户网站链接(预留字段)|
|create_time|long|创建时间|

### 书签结构
> **Bookmark** 书签数据结构

|字段|类型|描述|
|:---:|:---:|:--:|
|id|int|书签id(自增主键)|
|cid|int|分类id,可隶属于不同分类,用逗号隔开|
|name|string|书签名|
|desc|string|书签描述|
|content|string|内容(预留字段)|
|tag|string|标签,逗号隔开|
|type|int|类型(预留字段)|
|url|string|链接地址|
|icon|string|图标(如果无则自动生成)|
|uid|string|用户id(预留字段)|
|uhome|string|用户网站链接(预留字段)|
|create_time|long|创建时间|

### 统计
> **Analysis** 统计点击热度

|字段|类型|描述|
|:---:|:---:|:--:|
|id|int|书签id(自增主键)|
|bid|int|书签id|
|cid|int|书签分类id|
|bname|string|书签名|
|burl|string|书签地址|
|count|int|点击次数|
|update_time|long|最后点击时间|
