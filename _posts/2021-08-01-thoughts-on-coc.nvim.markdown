---
layout: post
title: Thoughts on coc.nvim
date: 2021-08-01 18:54:23 +0800
---

> 虽然我是 [@neoclide](https://github.com/neoclide) 组织成员, 但以下内容并不是 @neoclide 官方言论，不代表 @neoclide 官方立场，只是我自己在开发使用 coc/extensions 过程中的一些理解和记录。时间节点是 2021-08。

## coc.nvim 是什么？

有很多人在安利 [coc.nvim](https://github.com/neoclide/coc.nvim) 的时候会说：

- coc 是一个自动补全插件，非常智能的补全提示
- coc 是一个 LSP client，支持很多语言
- coc 可以使用类似 VSCode 的插件

也会说：

- coc 依赖 Node.js，太重了，npm 依赖是个无底洞，一个安装吃掉一堆硬盘
- coc 太大了，附带了很多其他插件的功能，不够 KISS，自成一派的插件体系分裂社区

以上都对，也都不全面。在我看了：

> coc.nvim = node-based LSP client + handler + extensions host + auto completion engine + UI

这个顺序基本是从内到外来的：

### node-based LSP client

[LSP](https://microsoft.github.io/language-server-protocol/) 是什么就不解释了，要注意的是 P 是 `protocol`，是协议，有时候会错误的说 “Python LSP 不工作”什么的，这是不准确的。

VSCode 提供了最为完整的 LSP 支持和迭代更新，并且会定期把 VSCode 里的实现更新到 [vscode-languageserver-node](https://github.com/microsoft/vscode-languageserver-node)，包括 Node.js 实现的 server，client，JSON-RPC，protocol definition 等。coc 里的 `language-client` 是基于 `vscode-languageclient` 的~~完全~~移植，目前对应版本是 v7.0.0，完整度在 95%+，缺失的部分是 vim/nvim 端不需要的。因为有 `vscode-languageclient` 加持，可以说 coc 是 vim/nvim 上**几乎最为完整**的 LSP client 实现，可以实现和支持不同 LS 所支持的所有功能。

Note： 这里说的实现是指 API 层的交互，就是 LSP 定义某个功能协议，某个语言的 LS 也实现支持，client 可以完成和 LS 的通信交互，但对应的功能还需要界面交互层来提供给使用者。举例：在 VSCode 中右键重命名文件会把代码中所有 import 这个文件的代码改为新名字。具体的流程是重命名操作触发 `willRename` 事件，通过 LSP `workspace/willRenameFiles` 发送到 LS，LS 实现修改所有 import 并返回，client 接收采用。目前 coc 支持所有 `fileOperations` 请求，但功能上只有 `willRename` 的实现，缺少 `Create/Delete`，原因就是在界面交互上还没有特别好的支撑。

### handler

`src/handler|events|model|services` 等代码我都给归类到 handler，这才是 coc 最为技术含量的东西，@chemzqm 在 [neovim/node-client](https://github.com/neovim/node-client) 基础上实现了 Node.js RPC 对 vim/nvim API 的操作 [neoclide/neovim](https://github.com/neoclide/neovim)，比如创建 buffer，设置 keymap，get/set lines，BufEnter/InsertLeave 等事件监听等等。

有了 handler，就可以把 LSP client 拿到的补全项，document, definitions, rename/formatting 结果进行显示、跳转等操作。更为重要的意义是，coc 把 handler 的功能通过接口暴露出来，这样我们就可以使用 Node.js 来写 vim/nvim 插件。一个不太恰当的例子：[denops.vim](https://github.com/vim-denops/denops.vim) 做的事情就是实现了这个 handler 做的一些事情，让我们可以用 Deno 写 vim/nvim 插件。

我把 `src/services` 也认为是 handler 层面的东西。services 一个重要的功能就是创建、启动、停止某个语言的 client。我们通过 `coc-settings.json - languageserver` 配置对 LS 的访问方式，coc 就可以创建、启动 client，对任何语言的 LS 进行访问和使用。

handler 另一个容易被忽略的功能是：统一了对 LS 的请求和结果返回。比如插件 A 想在 signcolumn 上显示当前位置的 codeAction 或 codeLens，A 可以自己向 LS 请求并展示。插件 B 想在 virtualText 显示，同样可以自己请求 LS，有了 handler 后 A&B 都向 coc 请求需要的信息即可。

### extension host

coc 实现了一整套插件机制，可以加载、执行用 JS 写的插件，可以从 npmjs.com 下载、更新插件。个人把 coc extensions 分成两类：LSP 相关和无关的。

LSP 相关的。虽然 services 已经可以创建、请求 LS，但是有些 LS 会有一些特殊的配置需求，或者有 LSP 不支持的扩展功能，或者某个 LS 返回的结果想进行劫持改写，我们就可以通过 coc extensions 来完成。`coc-rust-analyzer` 实现了很多扩展功能 [LSP Extensions](https://github.com/fannheyward/coc-rust-analyzer/issues/256), `coc-pyright` 可以自动检测 venv 环境，找到当前项目使用的 Python 劫持设置传给 Pyright 使用，不需要先 activated。

这类 extension 有些不是必须的，你完全可以通过 `coc-settings.json` 配置使用 rust-analyzer，只不过不能使用某些锦上添花的扩展功能罢了。但是有些是必须要用，并且是其他 LSP client 无法完美实现和支持的，比如 `coc-tsserver`，TypeScript LS 目前是不符合 LSP 标准的请求、响应，必须要中间层再次解析包装，`theia-ide/typescript-language-server` 可以用但性能功能都不如 `vscode-typescript-language-features` 和 `coc-tsserver`, 类似的还有 [yaegassy/coc-volar](https://github.com/yaegassy/coc-volar).

LSP 无关的，就是用 JS 完成某个功能，然后通过 handler 提供的 API 对 vim/nvim 进行操作。举例几个我觉得好用的这类扩展：

- `coc-git` 我主要使用 coc-git 做 git 信息显示，比如修改状态，blame/commit 等，git 操作更多会在终端
- `coc-explorer` 类 IDE 文件管理方式的文件浏览器，支持文件操作和 diagnostic 状态显示等
- `coc-ecdict` 使用 ECDICT 做中-英翻译，结果通过 `doHover` 展示
- `coc-yank` 跨 vim/nvim 实例的 yank 记录保存，并放到补全项使用
- `coc-nextword` 通过 NLP n-gram 算法做英文输入的智能提示

coc 本身是个插件，又提供了 extension 功能，相当于是插件的插件，这也是很多人觉得 coc 自成一派插件分裂社区，造轮子，像 coc-lists/coc-pairs/coc-snippets 都有对应的第三方插件。我的理解：

1. 有的是因为第三方插件无法达到 coc 的性能和定制化需要。比如 lists 显示，最早时候 coc 是使用 `coc-denite` 把 commands/diagnostics 等交给 `denite.nvim` 展示。但因为 denite 本身是个 Python Remote Plugin，这样绕一圈性能比较差，加上依赖于第三方插件不好做功能扩展，所以有了 `src/list` 内置列表展示。`coc-lists` 只不过是添加了 files/tags 这些列表内容源。我个人在使用上会 `coc-lists + vim-clap + nvim-bqf` 混用：definitions/references 这些用 bqf，fuzzy files 用 clap，extensions 内置源用 lists。
2. 有的是因为第三方插件有功能不支持，比如 snippets，很多 snippets 插件早期是不支持 LSP snippets 格式的，同时 snippets 和补全会有冲突，所以有了 coc-snippets，可以完全由 coc 控制。
3. 有的纯粹是想用 Node.js 写 vim/nvim 插件罢了，比如我写过一个 `coc-ci`，使用 [segmentit](https://www.npmjs.com/package/segmentit) 做中文分词，之后添加 w/b 绑定实现中文分词跳转。（不过这个插件有很长时间没有更新了，因为我发现这是个伪需求，我自己使用率不高导致没啥维护意愿）
4. 这些被抱怨造轮子的插件基本上都是 LSP 无关类型的，随着这些第三方插件的更新和支持，是否需要完全是个人喜好。

我的个人偏好：不太喜欢 Python-based 插件。最早用 vim 的时候要自己编译 `+python | +python3` 支持，后来 nvim 出现让我切换的第一原因就是 remote plugin，只需要 pip neovim/pynvim 即可。但是需要安装到系统 Python 环境：使用系统自带 Python 需要 sudo pip，使用 brew 安装的 Python 在更新后因为路径变化炸过几次，当然也可以创建一个独立的 venv 指定给 nvim 使用，但是这些不好的历史让我最近几年很少使用 Python-based 插件，像 LeaderF 就很好很强大，尝试过几次都没坚持下来。

### auto completion engine

这是 coc 最直观的功能，coc 会异步向所有源发起请求，补全响应速度上取决于最慢的数据源，也有过滤、优先级排序、preselect 等设置来优化补全。我自己会设置 `suggest.defaultSortMethod = none`，使用 LS 和 source 自己的排序，用下来发现这个更为合理一些。

异步请求补全来源是现在所有补全插件都会做的事情，使用下来还是会发现不同插件的补全响应速度有差异，什么原因呢？（后面有我个人的理解对比

### UI

或许应该叫 UI/UX 层，就是显示信息并且进行交互操作，这个是非常个人主观和 workflow 差异。比如有很多人在 issue/gitter 问能不能把 references/definitions 放到 floating 窗口显示，目前 lists 是不支持 floating 的，使用体验感觉就没那么“炫”，尤其是和现在很多 lua 插件对比。

把时间往回拨，在 18/19年 coc 提供这些的时候，floating API 都还不完善，coc 需要自己对显示效果进行完善，最开始只用 floating 做补全项和文档显示，当时这个效果惊艳无比，后来添加了高亮，可以 floating input，有了 dialog 窗口，有了 menu 选择，可以 floating scroll。后来随着 API 的完善，尤其是 nvim built-in LSP 后针对 floating 做了一系列的增强，有了 `open_floating_preview` 统一接口，可以直接设置 fancy_markdown 高亮，可以设置 border，对比 coc 自己实现的 border 原生的看起来好看很多。这些新增的功能让 coc 的界面看起来有点 *outdated*，同时 coc 兼容支持 vim 会有一些取舍限制，UI 层的效果就没那么炫酷了，UI 层的封装就意味着自定义定制的不够灵活，加上个人主观和 workflow 差异，众口难调。好在 coc 可以通过 API 把一些内容输出，比如 coc diagnostics 输出给 quickfix，nvim-bqf 读取显示，也可以用 telescope-coc.nvim 把内容在 telescope.nvim 使用。

还有几个模块没提到，比如 coc 内置的 Task 功能可以进行[自动构建任务](https://www.v2ex.com/t/577212), `coc-cursors-operator` 可以进行多光标操作，`coc-refactor` 和 CocSearch 进行[代码重构](https://zhuanlan.zhihu.com/p/272119909).

## 对比

Thoughts on LSP client for nvim by @justinmk [via](https://gitter.im/neovim/neovim?at=5dd24cf8e75b2d5a19f2aa67):

> there's only really 2 choices: coc or Nvim builtin stuff  
> I wouldn't bother with the others

知乎上有个问题 [能否详细比较一下 nvim-lsp 和 coc.nvim?](https://www.zhihu.com/question/466286911), @chemzqm 的回答在性能上提了一句，其他人的回答更偏重使用体验。我试着从 LSP 补全来做个对比。LSP 在进行输入补全的时候依次是：

> input trigger -> client request `textDocument/completion` -> server response -> client handle -> suggestions popup

- coc：nvim RPC 到 Node.js，coc client 请求 LS，LS 返回结果，coc 处理后显示
- nvim built-in: nvim client and请求 LS，LS 返回结果，nvim 处理后显示

不同语言 LS 的响应时间有很大差异，假定同一个 LS 对不同 client 的补全响应完全一致，因为 nvim 少了一次远程通信，所以理论上性能是好于 coc。这也是很多人（包括我）最直观的认识，毕竟少了一道请求肯定快，这是正确的。

**但是**，这个请求-返回只是整个流程的一环，其他环节带来的差异往往非常大：

1. input trigger，coc 在是否触发请求有个 `suggest.triggerCompletionWait` delay, 避免打字速度带来的影响
2. client handle，或者叫 parser，LSP 是 JSON-RPC 通信协议，假如 LS 返回了 1000 个补全项，那就是类似 `[{}, {},...]` 结构的 JSON string，client 要做非常耗时的序列化和反序列化，这个耗时甚至比 client RPC server 都要大。

作为使用者并不会发现关注这个 JSON 耗时，但是补全插件的作者都知道这个的影响，比如 [nvim-cmp](https://github.com/hrsh7th/nvim-cmp/blob/main/README.md#nvim-cmp-is-slow):

> For example, typescript-language-server will returns 15k items to the client. In such case, the time near the 100ms will be consumed just to parse payloads as JSON.

（题外话 [@hrsh7th](https://twitter.com/hrsh7th) 对 coc 的评价是很高的，同为开发者有过深入实践后感知和对比会更明显，`調べれば調べるほど coc どうなってんだという感想` [via](https://twitter.com/hrsh7th/status/1412822519959093249).

目前 nvim Lua 对 JSON 的处理还不够好，也许后续内置 `c_json` 会有改善。那为什么 nvim built-in 感官上会比 coc 要快？也许是因为 trigger delay，也许是因为 LS 返回的结果比较小。再比如 *Fast as FUCK* 的 `coq_nvim` 一直强调的 1000+ items 补全飞快，就是因为不需要 Lua JSON 处理，加上 in-memory SQLite ~~作弊~~外挂，不快都难。

补全速度只是非常小的一方面，最大的差异就是 embed LuaJIT vs Node.js，毕竟内置还是自己安装，方便程度显而易见。关于这个我的理解：在不方便的环境需要用 LSP 的时候直接 built-in client，但是作为开发者，你吐槽 JS ugly，或者 `node_modules black hole` 我觉得都对都赞成，但以此来 diss Node.js 是一个不好的技术栈，那需要反思一下自己作为开发者的技术素养了。

在使用层面的对比，built-in client 有着更为灵活自由的定制化，尤其是 UI 上，现在有非常多非常炫酷的 Lua 插件出现，coc 有限的配置项很难做到。

未来会怎么样？coc 在 LSP client 有先发优势，extensions 上方便复用 VSCode 资源，兼容 vim/nvim，这些都是优点，nvim built-in client 也在快速迭代改进，我们大家都有光明的前途 :D

> Added in 2021-10

其实是两种软件模型的差异，假设有两个程序 A & B，它们都是单线程，都需要频繁的与第三方程序/服务进行通信，它们都采用 [libuv](https://github.com/libuv/libuv) 的 event-loop 机制进行任务调度。现在有了新需求：两者都需要响应用户操作，都需要根据任务返回的结果进行 UI 更新。A 的方案是在程序内添加 UI 层，内部 function 直接互相调用；B 的方案是新开程序 C，C 只负责 UI 层，通过管道/RPC和 B 通信。

A - nvim, B - Node.js, C - nvim.
