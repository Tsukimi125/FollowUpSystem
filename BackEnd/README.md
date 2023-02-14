## 基于脓毒症的随访系统后端
### 运行guide
> 在执行以下指令前，确保你已经安装了jdk 11和最新版本的maven
* 拉取代码，进入当前目录，执行`mvn package`
* 进入target目录`cd target`
* 执行jar文件启动服务`java -jar ./tongji_follow_up-0.0.1-SNAPSHOT.jar`
> 注意，启动服务时可能会报error，这是由于你没有配置mysql，请在`resource/config/application-dev.yaml`中配置数据库的地址、用户名、密码，并在你部署的数据库中执行`depoly`文件夹下的所有sql脚本后，再次尝试启动服务
### 接口文档
* 有关接口文档的信息详见：[接口文档](http://27.17.30.150:20104/project/664/interface/api)
