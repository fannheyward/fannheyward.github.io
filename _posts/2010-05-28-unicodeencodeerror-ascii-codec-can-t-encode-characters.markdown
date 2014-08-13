---
layout: post
title: "UnicodeEncodeError: 'ascii' codec can't encode characters"
---

Problems with non-ASCII characters.

```
import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)
```

[via](http://mgltools.scripps.edu/documentation/faq/unicodeencodeerror-ascii-codec-can-t-encode-characters)

