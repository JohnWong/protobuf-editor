Protobuf Editor
=============================
一个简单易用的Protobuf编辑器。功能全部在前端完成，后端只需要任意一个HTTP服务器。

# 安装

### Node.js Server

1. Set up dependencies: `npm install`
2. Run: `node server.js`

### Other Server

Host folder www and open in browser.

# 使用

将Protobuf的定义文件拖放到左侧编辑器区域，或者手动选择文件。然后在下拉框中选择要使用的类。可以在这里修改数据，点击导出来下载修改后的数据文件。

将Protobu的数据文件拖放到右侧的JSON输出区域，或者手动选择文件。此时会按照上一步选择的类来解析数据文件，以JSON格式展示出来。可以在这里直接修改JSON文件，点击导出按钮来下载修改后的数据文件。也可以点击更新到编辑器将数据更新到左侧的编辑器。


