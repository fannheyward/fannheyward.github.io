---
layout: post
title: Verify SSL certificate and key
date: 2017-06-02 18:01:23 +0800
---

You can use `OpenSSL` to verify whether a SSL certificate and a key is matched:

```
openssl x509 -noout -in certificate.crt | openssl md5
openssl rsa -noout -in privateKey.key | openssl md5
openssl req -noout -in CSR.csr | openssl md5
```

If both commands return same hash, the certificate and key is matched.
