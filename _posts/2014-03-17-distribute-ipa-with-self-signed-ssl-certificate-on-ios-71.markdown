---
layout: post
title: "通过自签名 SSL 证书分发安装 IPA"
date: 2014-03-17 23:21:09 +0800
categories: [Dev]
---

iOS 7.1 通过 `itms-services://` 安装 IPA 时要求 `ipa.plist` 必须 HTTPS 环境，不然会提示证书错误而无法安装。简单解决可以把 ipa.plist 放在 Dropbox 等支持 HTTPS 访问的地方，不过这样就不方便一键打包部署。其实可以通过自签名的 SSL 证书来解决这个问题。

1.创建自签名 CA 根证书，方便自动信任该 CA 所签发的证书：

```
openssl genrsa -out CA.key 2048
openssl req -x509 -new -key CA.key -out CA.cer -days 730 -subj /CN="Custom CA"
```

2.将 `CA.cer` 通过邮件等分发安装到设备作为信任证书。

3.创建 HTTPS URL 需要的密钥和证书:

```
openssl genrsa -out ipa.key 2048
openssl req -new -out ipa.req -key ipa.key -subj /CN=ipa.site.com
openssl x509 -req -in ipa.req -out ipa.cer -CAkey CA.key -CA CA.cer -days 365 -CAcreateserial -CAserial serial
```

4.上传 `ipa.cer` 和 `ipa.key` 到服务器，比如 `/etc/nginx/ssl` 目录下。

5.设置 Nginx 使用自签名证书:

```
server {
    listen  443;
    server_name  ipa.site.com;

    ssl on;
    ssl_certificate /etc/nginx/ssl/ipa.cer;
    ssl_certificate_key /etc/nginx/ssl/ipa.key;

    location / {
        root /home/fannheyward/ipas;
        index  index.html index.htm index.php;
    }

    gzip on;
}
```

6.注意修改脚本里 ipa.plist 地址和 ipa 地址为 HTTPS.

