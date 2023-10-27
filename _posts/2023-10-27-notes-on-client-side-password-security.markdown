---
layout: post
title: Notes on 前端密码加密
date: 2023-10-27 10:34:17 +0800
---

> https://blog.huli.tw/2023/01/10/security-of-encrypt-or-hash-password-in-client-side/

1. HTTPS must
2. 无加密的问题：
    1. 可能被 MITM 等方式看到明文密码，继而「撞库」等
    2. 可能被错误 logging 记录明文密码
    3. 加密可以规避上述问题
3. hash 解决了被看到「明文密码」，避免被撞库，但弱 hash 可通过彩虹表得到明文密码
4. hash 无法解决被直接使用，比如通过 MITM/logging 等拿到 hash 后可以直接访问
5. 端侧 public key 加密，服务端 private key 解密，也是同样的问题
6. SRP (Secure Remote Password protocol) 是更好的解决方案
7. 或者 Passkeys
