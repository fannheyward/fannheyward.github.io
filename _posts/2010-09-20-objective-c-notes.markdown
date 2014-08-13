---
layout: post
title: "Objective-C Notes"
---


//string1 将被自动释放

> `NSString* string1 = [NSString string];`

//必须在用完后手工释放

> `NSString* string2 = [[NSString alloc] init]; [string2 release];`

-------------

Typically, each class gets two files: a header file that contains the @interface for the class and a dot-m file that holds the @implementation.

类的接口(interface)通常存放在类似ClassName.h的文件中,在这里,我们定义实例变量和公用(public)方法。

类的实现存放在ClassName.m这样的文件中,它包含了这些方法的实际实现代码。它通常还定义了客户类不能访问的私有(private)方法。

------------------

方法名字前面的单个减号(-)表明该方法是一个实例方法。如果方法名字前面是一个加号(+),则表明该方法是一个类(static)方法。

---------

dealloc方法在一个对象从内存中删除时被调用。通常在这个方法里面释放所有对象里的实例变量。

Objective-C的内存管理是基于引用计数的。

一个实例变量的设置器(setter)会自动释放(autorelease)原来引用的对象,同时保留(retain)新的。你只需要保证在dealloc函数中释放 (release)了它就行了。

+ When you create an object using new, alloc, or copy, the object has a retain count of 1. You are responsible for sending the object a release or autorelease message when you’re done with it. That way, it gets cleaned up when its useful life is over.
+ When you get hold of an object via any other mechanism, assume it has a retain count of 1 and that it has already been autoreleased. You don’t need to do any further work to make sure it gets cleaned up. If you’re going to hang on to the object for any length of time, retain it and make sure to release it when you’re done.
+ If you retain an object, you need to (eventually) release or autorelease it. Balance these retains and releases.

如果过你通过alloc或者copy创建了一个对象,在函数结尾的地方给它发送一个release或者autorelease消息就行了。如果你是通过其它方式创建的对象,就什么也别做。“If I get it from new, alloc, or copy, I have to release or autorelease it.”

-----------------

类目允许你为一个已存在的类添加一些方法而不用子类化该类,也不需要你了解该类的实现细节。

`@property (retain) NSString* caption;`

@property 是Objective-C语言的一个指令,通过它声明属性。带括号的"retain"指示设置器(setter)要保留输入值,该行后面的是指定属性的类型以及名称。

@synthesize 指令为我们主动生成了setter和getter.

-----------

@class sets up a forward reference. This is a way to tell the compiler, "Trust me; you’ll learn eventually what this class is, but for now, this is all you need to know."

-------------------

The colored boxes next to the name indicate what the symbol is: E for an enumerated symbol, f for a function, # for a #define, m for a method, C for a class, and so on.

Chose **File-Make Snapshot** (or its handy shortcut, Command-Control-S) and Xcode will remember the state of your project.

