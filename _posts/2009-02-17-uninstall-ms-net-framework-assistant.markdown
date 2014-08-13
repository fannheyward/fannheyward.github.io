---
layout: post
title: "卸载Microsoft .NET Framework Assistant扩展"
---

备份Firefox配置时候发现Microsoft .NET Framework Assistant扩展，自己都不知道啥时候MS给我装上的，Google了一下，可能是自动更新 .NET 3.5 Framework SP1时候装上的，居然一点提示都没有，够流氓，更流氓的是常规卸载Fx扩展的方式居然不能卸载，Addons里面卸载按钮不可用，杀之。以下是Google到的[卸载方法](http://www.dedoimedo.com/computers/ms-dotnet-firefox.html):

1. 备份Fx配置文件，安全第一。然后关掉Fx。
2. 删除 `C:\Windows\Microsoft.NET\Framework\v3.5\Windows Presentation Foundation\DotNetAssistantExtension` 下所有文件，不放心的话可以先备份再删除。
3. Fx地址栏打开 `about:config`，搜索 `general.useragent`，重置 `general.useragent.extra.microsoftdotnet`。
4. 打开注册表编辑器（开始-运行-regedit），定位到 `HKEY_LOCAL_MACHINE\SOFTWARE\Mozilla\Firefox\extensions`，删除对应项。Done.

最后鄙视一下MS这种强盗流氓做法。

Update：发现还有一个 `Windows Presentation Foundation` 插件，在 `about:config` 里面重置 `microsoft.CLR.clickonce.autolaunch` 即可。
