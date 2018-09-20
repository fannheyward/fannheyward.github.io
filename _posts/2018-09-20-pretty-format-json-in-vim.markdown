---
layout: post
title: Pretty format JSON in Vim
date: 2018-09-20 17:40:52 +0800
---

```
command! PrettyJSON %!python -m json.tool
```

or, [coc.nvim][1] + [coc-prettier][2], which can format JavaScript/TypeScript/HTML/JSON using [Prettier][3].

[1]: https://github.com/neoclide/coc.nvim
[2]: https://github.com/neoclide/coc-prettier
[3]: https://github.com/prettier/prettier