---
layout: post
title: "Python's module-script utilities"
date: 2024-06-05 19:23:32 +0800
---

The Python standard library offers many module-script utilities that can be used as command-line tools with the `python -m` syntax.

- `python -m webbrowser https://pym.dev/p` open URL in default browser
- `python -m antigravity` open <https://xkcd.com/353/>
- `python -m this` display the Zen of Python (PEP 20)
- `python -m __hello__` print `Hello world!`
- `python -m http.server` start a simple web server
- `python -m json.tool` validate and pretty-print JSON data from stdin or file
- `python -m calendar` display a command-line calendar
- `python -m uuid` generate an UUID string
- `python -m sqlite3` launch sqlite3 shell
- `python -m zipfile/gzip/tarfile` like `zip/unzip` or `gzip/gunzip` or `tar` CLI
- `python -m base64` like `base64` CLI
- `python -m ftplib` like `ftp` CLI
- `python -m pip` run `pip` to install third-party packages
- `python -m venv` create an virtual environment
- `python -m pydoc` show documentation for given string
- `python -m pdb` run Python Debugger
- `python -m unittest` run unittest tests from modules or file
- `python -m timeit` time a Python expression
- `python -m site` display current Python environment info like `sys.path`
- `python -m platform` display OS information
- `python -m encodings.rot_13` encode/decode text by `ROT13` cipher

More utilities and detailed explanation [Python's many command-line utilities](https://www.pythonmorsels.com/cli-tools/)
