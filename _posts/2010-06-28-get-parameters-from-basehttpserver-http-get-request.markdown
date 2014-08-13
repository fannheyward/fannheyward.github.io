---
layout: post
title: "Get parameters from BaseHTTPServer http GET request"
---

BaseHTTPHandler from the BaseHTTPServer module doesn't seem to provide any convenient way to access http request parameters. What is the best way to parse the GET parameters from the path, and the POST parameters from the request body?

Right now, I'm using this for GET:

```
parsed_path = urlparse.urlparse(self.path)
try:
    params = dict([p.split('=') for p in parsed_path[4].split('&')])
except:
    params = {}
```

