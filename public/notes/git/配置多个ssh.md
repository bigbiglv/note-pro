# 配置多个`ssh`
* 同一个电脑生成的ssh只能对应一个git账号
* 默认识别`id_rsa`私钥，`id_rsa.pub`私钥
# 生成 `ssh`
1. `cd ~/.ssh/` 到`.ssh`目录下
   * 没有`.ssh`目录先新建 `mkdir ~/.ssh`
2. 新建第一个`ssh`
```
# 此处生成的密钥名称默认是rsa
ssh-keygen -t rsa -C "xxxxx@qq.com"

# 可以指定密钥名称
ssh-keygen -t rsa -f ~/.ssh/id_rsa_first -C "xxxxx@qq.com"
```
3. 然后到`c`盘用户文件夹下面的`.ssh`文件中找到`id_rsa_first.pub`文件，使用记事本打开复制全部内容，添加到`git`账号的`ssh`列表中

4. 重复以上步骤生成第二个密钥`id_rsa_sec`

# 将密钥添加到`SSH agent`
1. 默认读取`id_rsa`密钥
2. 让`ssh`识别新的私钥
   * 报错`Could not open a connection to your authentication agent`
   * 执行先`ssh-agent bash`再添加
```
ssh-add ~/.ssh/id_rsa_first
ssh-add ~/.ssh/id_rsa_sec
```
# 配置密钥
1. 在`.ssh`文件夹下新建`config`文件
2. 使用记事本打开文件,此处以`gitlab`账号为例

* `Host`: `github`别名来识别密钥
* `HostName`: `ssh`链接中@符和:中间的内容 
* `port`: 端口
* `IdentityFile`: 密钥绝对路径
* `User`: 默认`git`

```
#第一个密钥
Host gitlab_first
HostName gitlab.com 
port xxxx
IdentityFile ~/.ssh/id_rsa_first
# PreferredAuthentications publickey
User git


#第二个密钥
Host gitlab_sec
HostName gitlab.com
port xxxx
IdentityFile ~/.ssh/id_rsa_sec
User git
```

# 测试

```
# 使用config中的HostName验证
ssh -T git@gitlab_first
# 带端口号
ssh -T git@gitlab_first -p xxxx
```

# 克隆代码
* 不能直接使用原本的`ssh`链接`clone`了
* 将`ssh://git@github.com:`中的`ssh://git@`后的内容`:`号前的内容替换位`config`中`Host`的值