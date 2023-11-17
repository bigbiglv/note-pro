# 修改`commit msg`
## 修改上一条信息
* `git commit --amend`
* 跳转上一条`commit msg`编辑页面

## 修改多次前的信息
* 当前有三次`commit`
* 如果要修改‘dev第二次修改’的话就取他上一次dev第一次修改的`commit id`
* `git rebase -i <commit id>`
* 进入vim编辑器
```
$ git log
commit c753b0814111d899a44b50d852af63b48263f94a (HEAD -> dev)
Author: bigbigking <2845758942@qq.com>
Date:   Fri Oct 21 15:24:52 2022 +0800

    dev第三次修改

commit bb8a2d5ab026a6e9c4e166ba7a90400a768c1565
Author: bigbigking <2845758942@qq.com>
Date:   Fri Oct 21 15:24:35 2022 +0800

    dev第二次修改

commit 162bdca7be53933d407af17c9ffc8350fb400388
Author: bigbigking <2845758942@qq.com>
Date:   Fri Oct 21 15:24:20 2022 +0800

    dev第一次修改

commit 00f46fcf35f401f9b4847866b96ef24b80d3ae76 (origin/dev)
Merge: d4eef01 c037ad2
Author: bigbigking <2845758942@qq.com>
Date:   Fri Oct 21 15:12:14 2022 +0800

# 修改dev第二次修改的commit msg
$ git rebase -i 00f46fcf35f401f9b4847866b96ef24b80d3ae76
```
## 进入`vim`编辑器
* `pick`: 保留该 `commit`
* `reword`: 保留该 `commit`，但我需要修改该`commit`的 `Message`
* `edit`: 保留该 `commit`, 但我要停下来修改该提交(包括修改文件)
* `squash`: 将该 `commit` 和前一个 `commit` 合并
* `fixup`: 将该 `commit` 和前一个 `commit` 合并，但我不要保留该提交的注释信息
* `exec`: 执行 `shell` 命令
* `drop`: 丢弃这个 `commit`
```
pick 162bdca dev第一次修改
pick bb8a2d5 dev第二次修改
pick c753b08 dev第三次修改

# Rebase 00f46fc..c753b08 onto 00f46fc (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
```
* 按o键编辑
* 使用`reword`修改第二次的`msg`
* esc退出编辑
* :wq保存并退出
```
pick 162bdca dev第一次修改
reword bb8a2d5 dev第二次修改
pick c753b08 dev第三次修改

# Rebase 00f46fc..c753b08 onto 00f46fc (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
```
* 编辑器跳到‘dev第二次修改‘的页面
* o键修改 esc退出编辑 :wq保存并退出
```
dev第2次修改

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Fri Oct 21 15:24:35 2022 +0800
#
# interactive rebase in progress; onto 00f46fc
# Last commands done (2 commands done):
#    pick 162bdca dev第一次修改
#    reword 9ed7a75 dev第2次修改
# Next command to do (1 remaining command):
#    pick ae73cc2 dev第三次修改
# You are currently editing a commit while rebasing branch 'dev' on '00f46fc'.
#
# Changes to be committed:
#       modified:   2.txt
```
* 使用`git log`查看结果成功