---
layout: post
title: "Key Value Coding and Key Value Observing Notes"
date: 2012-03-08 09:43
categories: [Dev]
---

KVO(Key Value Obersving) 的基础是 KVC(Key Value Coding)，现在我对 KVC 的理解还非常粗浅，对 KVO 只是使用阶段，下面这些是我的一些笔记，可能会有一些误差，后续有更多理解后会持续更新。

### KVC

KVC 的全称是 `NSKeyValueCoding`，文档：

> The NSKeyValueCoding informal protocol defines a mechanism by which you can access the properties of an object indirectly by name (or key), rather than directly through invocation of an accessor method or as instance variables.

KVC 是一种通过 name 或 key 间接访问对象属性(property)的机制。用 `setValue:forKey:` 设置 key 所指定属性的值，`valueForKey:` 对应来取值。

Code：

```objc
@interface Person : NSObject

@property (nonatomic, retain) NSString *name;
@property (nonatomic) int age;

@end

@implementation Person

@synthesize name;
@synthesize age;

@end

int main(int argc, char *argv[]) {
    @autoreleasepool {
        Person *person = [[Person alloc] init];
        person.name = @"fannheyward";
        // equal to
        //[person setName:@"fannheyward"];
        // equal to
        //[person setValue:@"fannheyward" forKey:@"name"];

        person.age = 24;
        // equal to
        //[person setAge:24];
        // equal to
        //[person setValue:[NSNumber numberWithInt:24] forKey:@"age"];

        NSLog(@"name:%@, age:%d", person.name, person.age);
        NSLog(@"name:%@, age:%d", [person valueForKey:@"name"], [[person valueForKey:@"age"] intValue]);

        [person release];
    }
}
```

### KVO

KVO 的全称是 `NSKeyValueObserving`，文档：

> The NSKeyValueObserving (KVO) informal protocol defines a mechanism that allows objects to be notified of changes to the specified properties of other objects.

简单的说 KVO 提供了一个观察者机制，当被观察的对象属性变化时自动通知相应的观察者对象。KVO 就是通过 KVC 的 `setValue:forKey` 和 `valueForKey:` 来监察属性变化。KVO 的使用分为三个步骤，注册观察者，实现变化回调方法，取消观察者。

注册观察者：

```objc
- (void)addObserver:(NSObject *)anObserver forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context
```

其中 `keyPath` 就是要观察的属性值，`options` 是属性变化的选择，`context` 可以用来传递额外的数据等。

实现变化回调方法：

```objc
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
```

`keyPath` 注册里的相对应，用来区分不同的被观察属性，`change` 包含了变化前后的数据。

取消观察者：

```objc
- (void)removeObserver:(NSObject *)anObserver forKeyPath:(NSString *)keyPath
```

一般放在 `- (void)dealloc` 方法里面。

### Demo

Demo：一个列表 `listTableView`，数据存储在 `NSMutableArray *cellArray` 里面，`cellArray` 的数据发生变化时候刷新列表展示，比如滑动到 table 下部时自动后台 load 更多数据然后更新列表。

添加一个 `@property (nonatomic) NSInteger cellCount` 作为被观察者，为啥不直接用 `cellArray`作为被观察者？因为 NSArray 不能被注册为观察者，参考 `NSArray(NSKeyValueObserverRegistration)` in `NSKeyValueObserving.h`：

> NSArrays are not observable, so these methods raise exceptions when invoked on NSArrays. Instead of observing an array, observe the ordered to-many relationship for which the array is the collection of related objects.

```objc
- (void)viewDidLoad
{
    [super viewDidLoad];

    [self addObserver:self forKeyPath:@"cellCount" options:NSKeyValueObservingOptionNew context:nil];
}

- (void)loadCellArrayInBackground
{
    // ...
    self.cellCount = [cellArray count]; //change cellCount value.
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if ([keyPath isEqualToString:@"cellCount"]) {
        // check change if nessary.
        [listTableView reloadData];
    } else {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

- (void)dealloc
{
    [self removeObserver:self forKeyPath:@"cellCount"];

    [super dealloc];
}
```

以上就是一个简单的 KVO 实现。

----

PS. NSArray 也有方法注册观察者，`[[self mutableArrayValueForKey:@"cellArray"] addObject:@"test"];` 就可以被观察到 `cellArray` 变化。`mutableArrayValueForKey` 返回的不是 cellArray 本身而是一个 proxy，而 proxy 是支持 KVO 的。不过这种方法感觉有点浪费，没必要每添加、删除一个数据就刷新列表，尤其大部分时候我们都是批量更新数据源，用 cellCount 这种方式反而会更好一点。参考 [Key Value Observing NSArray and NSDictionary][1]

---

PPS. 其实 KVO 的实现是比较笨重的，比如注册时候没有办法指定一个响应 selector，都需要在回调实现里面根据 `keyPath` 来区分不同的被观察者。[Key-Value Observing Done Right][2] 分析了 KVO 的一些缺点并给出了解决方案: [MAKVONotificationCenter][3]，找个机会在项目中实际运用一下。

[1]:http://streetsaheadllc.com/article/key-value-observing-nsarray-and-nsdictionary
[2]:http://www.mikeash.com/pyblog/key-value-observing-done-right.html
[3]:https://github.com/mikeash/MAKVONotificationCenter

