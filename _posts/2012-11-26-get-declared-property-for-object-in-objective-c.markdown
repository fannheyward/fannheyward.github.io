---
layout: post
title: "Get declared property for object"
date: 2012-11-26 10:49
---

获取对象的 property 属性列表:

``` objc
objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount)
objc_property_t *protocol_copyPropertyList(Protocol *proto, unsigned int *outCount)
```

sample, via [Declared Properties][1]:

``` objc
#import <objc/runtime.h>

id LenderClass = objc_getClass("Lender");

unsigned int outCount, i;
objc_property_t *properties = class_copyPropertyList(LenderClass, &outCount);

for (i = 0; i < outCount; i++)
{
    objc_property_t property = properties[i];
    fprintf(stdout, "%s %s\n", property_getName(property), property_getAttributes(property));
}
free(properties);
```

拿到 property 列表就可以很方便做一些东西，比如 [autodescribe][2]，根据列表取值然后组装成对象 description。再比如配合 NSCoder 做 NSObject 的[序列化][3]：

``` objc
- (id)initWithCoder:(NSCoder *)decoder
{
    self = [super init]
    if (self)
    {
        Class clazz = [self class];
        NSUInteger count;

        objc_property_t *properties = class_copyPropertyList(clazz, &count);
        NSMutableArray *propertyArray = [NSMutableArray arrayWithCapacity:count];
        for (int i = 0; i < count ; i++)
        {
            objc_property_t property = properties[i];
            const char *propertyName = property_getName(property);
            [propertyArray addObject:[NSString stringWithCString:propertyName encoding:NSUTF8StringEncoding]];
        }
        free(properties);

        for (NSString *name in propertyArray)
        {
            id value = [decoder decodeObjectForKey:name];
            [self setValue:value forKey:name];
        }
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder
{
    Class clazz = [self class];
    NSUInteger count;

    objc_property_t *properties = class_copyPropertyList(clazz, &count);
    NSMutableArray *propertyArray = [NSMutableArray arrayWithCapacity:count];
    for (int i = 0; i < count ; i++)
    {
        objc_property_t property = properties[i];
        const char *propertyName = property_getName(property);
        [propertyArray addObject:[NSString stringWithCString:propertyName encoding:NSUTF8StringEncoding]];
    }
    free(properties);

    for (NSString *name in propertyArray)
    {
        id value = [self valueForKey:name];
        [coder encodeObject:value forKey:name];
    }
}
```

也可以拿到成员变量列表: `class_copyIvarList(Class cls, unsigned int *outCount)`. [Objective-C Runtime][4] 有很多东西可以学习的。

[1]:https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtPropertyIntrospection.html
[2]:https://github.com/neoneye/autodescribe
[3]:http://www.cnblogs.com/likwo/archive/2011/05/26/2058134.html
[4]:https://developer.apple.com/library/mac/#documentation/Cocoa/Reference/ObjCRuntimeRef/Reference/reference.html

