# 使用`cherry-pick`复制`commit`

* 复制（其他分支）的`commit`过来
* 因为是复制的所以`commit id`会改变，分支合并也会有两条修改一样的记录，但是时间还是保留原先的时间
* 比如在`master`分支提交一个`commit`修复了某个`bug`，当前`dev`的分支也需要这个`commit`就可以使用`cherry-pick`复制过来

## 复制一条
```
git cherry-pick <commit id>
```

## 复制多条
```
# 空格隔开
git cherry-pick <commit1> <commit2>
# 多条且连续
git cherry-pick <commit1>^..<commit9>
```
## 代码冲突
* 复制过来的时候可能会出现代码冲突的情况
* 此时复制会停止，需要解决冲突后继续复制
* 继续执行复制
```
git cherry-pick --continue
```
* 放弃(后续)复制
```
git cherry-pick --abort
```
* 退出复制 回到最初
```
git cherry-pick --quit
```