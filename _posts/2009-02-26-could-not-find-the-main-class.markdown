---
layout: post
title: "Could not find the main class问题"
---

因为毕业设计要用到jsp，这两天在准备着搭Java环境。下午把JDK装上，配置好path，classpath和java_home几个环境变量，然后随手用EmEditor中自带的Java模板自动生成了一个hello world函数，测试一下JDK是否装好。

```
hello.java
class Hello {
    public static void main(String args[])
    {
        System.out.println("Hello, world!");
    }
}
```

编译：`javac hello.java`，顺利通过，然后运行：`java hello`，报错：

```
Exception in thread "main" java.lang.NoClassDefFoundError:
……
Could not find the main class: hello.  Program will exit.
```

编译能通过，不能运行，这个报错生生折腾了我两个小时，起初以为是环境变量没设好，改了N次，仍然是报错，气得半死。Google的时候说Java严格区分大小写，就留心了一下，果然是这个问题。类名是calss Hello，大写，文件名却是 hello.java，小写，编译的时候javac不区分大小写，所以编译通过，生成 Hello.class 文件，运行的时候却是java hello，与类名不符，进而 could not find the main class，所以报错。

教训啊，一定要注意，Java里文件名要和main class类名完全一致，大小写严格区分。还有，写程序时候遇见错误一定要心平气和的去debug，越急躁越不行；也要注意写程序的细节问题，细节决定成败。
