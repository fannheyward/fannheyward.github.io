---
layout: post
title: "Retain Cycle in Blocks"
date: 2013-04-17 22:20
---

> 个人笔记，可能会有理解不够透彻而错误。 @fannheyward

Objective-C 是基于引用计数(retainCount)来做内存管理，ClassA 用到 ClassB 的时候，通过 alloc/retain/copy 等将 objectB.retainCount+1，不需要的时候通过 release/autorelease 将 objectB.retainCount-1. retainCount 归零后对象 objectB 被释放。假如 objectA retain objectB，objectB 反过来也 retain objectA，结果就是两者 retainCount 都无法归零，也就没办法被释放，造成内存泄露。这就是 Retain Cycle。

一般情况下注意避免两个对象互相 retain 就不太会出现 Retain Cycle，但是在用到 Blocks 的时候就要小心，很容易造成 Retain Cycle。这是因为 Blocks 会自动 retain 它引用的对象(block 里的对象)，稍不留神就造成 Retain Cycle。文档: [Object and Block Variables][1]：

> When a block is copied, it creates **strong** references to object variables used **within the block**. If you use a block within the implementation of a method:
> > * If you access an instance variable by reference, a strong reference is made to self;
> > * If you access an instance variable by value, a strong reference is made to the variable.

> To override this behavior for a particular object variable, you can mark it with the **__block** storage type modifier.

#### MRC

一个简单的例子，Xcode 会报 Retain Cycle warning：

``` objc
UIImageView *imgView = [[UIImageView alloc] initWithFrame:rect];
[imgView setImageWithURL:url completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType) {
    // ...
    imgView.image = image; // warning: Capturing 'imgView' strongly in this block is likely to lead to a retain cycle
}];
```

block 也是一个对象，[imgView setImageWithURL:completed:] 的时候 retain 了这个 block；而 block 又自动的 retain 了 imgView，所以就造成了 Retain Cycle。解决方法就是用 `__block` 告诉 block 不要 retain 引用的对象:

``` objc
__block UIImageView *imgView = [[UIImageView alloc] initWithFrame:rect];
[imgView setImageWithURL:url completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType) {
    // ...
    imgView.image = image;
}];
```

还有一种情况，block 里引用的对象是 self 或者 self.property，解决方法同理:

``` objc
__block MyClass *myClass = self;
operation.completeBlock = ^(NSInteger index) {
    [myClass doOther];
};

self.imgView = [[UIImageView alloc] initWithFrame:rect];
__block UIImageView *tmpView = _imgView;
[_imgView setImageWithURL:url completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType) {
    tmpView.image = image;
}];
}
```

#### ARC

在 ARC 下不能用 `__block` 关键字，取而代之的是 `__weak` 或者 `__unsafe_unretained`。其中 `__weak` 只能 iOS 5+ 使用，`__unsafe_unretained` 支持 iOS 4。如果 App 不需要考虑 4.x 用 `__weak` 会更好一些，`__weak` 修饰的对象释放后会被设置为 nil，而 `__unsafe_unretained` 会继续指向原来的内存。

``` objc
__block MyClass *myClass = self;              // MRC
__weak MyClass *myClass = self;               // ARC & iOS 5+
__unsafe_unretained MyClass *myClass = self;  // ARC & iOS 4.
```

一些参考文章:

* [iOS blocks - 三個會造成retain cycle的anti patterns](http://popcornylu.blogspot.jp/2012/02/3-anti-patterns-which-lead-memory-leaks.html)
* [Friday Q&A 2010-04-30: Dealing with Retain Cycles](http://www.mikeash.com/pyblog/friday-qa-2010-04-30-dealing-with-retain-cycles.html)
* [ASIHTTPRequest Using blocks](http://allseeing-i.com/ASIHTTPRequest/How-to-use#using_blocks)
* [ARC - The meaning of __unsafe_unretained?](http://stackoverflow.com/a/8593731/380774)
* [IOS中的block和retain cycle](http://lcwangchao.github.io/IOS/2012/07/16/block_retain_cycle/)

[1]:https://developer.apple.com/library/ios/documentation/cocoa/Conceptual/Blocks/Articles/bxVariables.html#//apple_ref/doc/uid/TP40007502-CH6-SW4

