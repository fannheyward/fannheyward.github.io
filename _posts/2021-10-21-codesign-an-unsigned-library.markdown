---
layout: post
title: codesign an unsigned library
date: 2021-10-21 09:22:14 +0800
---

Some Python modules are not signed, will raise ImportError on M1 macOS:

```sh
ImportError: dlopen(/tmp/test/.venv/lib/python3.9/site-packages/regex/_regex.cpython-39-darwin.so, 2): no suitable image found.  Did find:
	/tmp/test/.venv/lib/python3.9/site-packages/regex/_regex.cpython-39-darwin.so: code signature in (/tmp/test/.venv/lib/python3.9/site-packages/regex/_regex.cpython-39-darwin.so) not valid for use in process using Library Validation: Trying to load an unsigned library
```

You can use `xcrun codesign` to sign the library so: `xcrun codesign -s - <path>`. Here is:

`xcrun codesign --sign - /tmp/test/.venv/lib/python3.9/site-packages/regex/_regex.cpython-39-darwin.so`

