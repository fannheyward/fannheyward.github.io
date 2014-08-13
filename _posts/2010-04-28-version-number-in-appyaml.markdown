---
layout: post
title: "GAE app.yaml version number"
---

> If you don't change the version number in app.yaml,your changes will be made live immediately.When you are developing your application and are not formally in production,it is good practice to leave the version number unchanged when you upload new version.

一直都有个疑惑，在 GAE 上部署 App 新版本的时候，app.yaml 里面 version 该怎么设置，为求保险，之前都是依次递增。看到上面这一段明白了，如果不修改，那么会完全覆盖掉 GAE 上当前版本，新版本立即生效，这在进行实时开发的时候非常方便。如果在当前稳定版本的基础上测试新功能开发，最好修改 version number，这样对外跑一个稳定版本，测试版本可以单独跑，互不耽误。测试通过后可以在 versions 设置哪一个作为默认应用版本。

