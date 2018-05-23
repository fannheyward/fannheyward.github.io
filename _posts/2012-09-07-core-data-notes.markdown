---
layout: post
title: "Core Data Notes"
date: 2012-09-07 18:38
---

两篇很不错的 Core Data Tutorial, [Getting Started][1]，[How to use NSFetchedResultsController][2]。

NSPersistentStoreCoordinator 是持久化存储， NSManagedObjectModel 指明存储数据结构和关系，NSManagedObjectContext 来读取、存储操作。

``` objc
- (NSManagedObjectContext *)managedObjectContext
{
    if (_managedObjectContext != nil) {
        return _managedObjectContext;
    }

    NSPersistentStoreCoordinator *coordinator = [self persistentStoreCoordinator];
    if (coordinator != nil) {
        _managedObjectContext = [[NSManagedObjectContext alloc] init];
        [_managedObjectContext setPersistentStoreCoordinator:coordinator];
    }
    return _managedObjectContext;
}

- (NSManagedObjectModel *)managedObjectModel
{
    if (_managedObjectModel != nil) {
        return _managedObjectModel;
    }
    NSURL *modelURL = [[NSBundle mainBundle] URLForResource:@"CDTest" withExtension:@"momd"];
    _managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
    return _managedObjectModel;
}

- (NSPersistentStoreCoordinator *)persistentStoreCoordinator
{
    if (_persistentStoreCoordinator != nil) {
        return _persistentStoreCoordinator;
    }

    NSURL *storeURL = [[self applicationDocumentsDirectory] URLByAppendingPathComponent:@"CDTest.sqlite"];

    NSError *error = nil;
    _persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:[self managedObjectModel]];
    if (![_persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeURL options:nil error:&error]) {
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
    }

    return _persistentStoreCoordinator;
}
```

新增数据：

```objc
Person *person = [NSEntityDescription insertNewObjectForEntityForName:@"Person"
                                               inManagedObjectContext:_managedObjectContext];
person.name = @"fannheyward";
person.age = [NSNumber numberWithInt:25];
[_managedObjectContext save:NULL];
```

通过 NSFetchRequest 查找，配合 NSPredicate 对数据进行过滤判断：

```objc
NSFetchRequest *request = [[NSFetchRequest alloc] initWithEntityName:@"Person"];
request.predicate = [NSPredicate predicateWithFormat:@"age == %@", age];;
NSArray *arr = [_managedObjectContext executeFetchRequest:request error:NULL];
for (NSManagedObject *obj in arr) {
    //...
}
```

NSFetchedResultsController 和 UITableView 做了很好的整合，可以根据 tableView 位置进行动态查询取数据。比如一共 100 个 cell，传统方式需要一次性全部拿到 DataSource 数据到内存，数据量过大的话会占用不少内存；用 NSFetchedResultsController 可以设置一次取数据的大小，然后根据滑动位置动态读取数据。

```objc
- (NSFetchedResultsController *)fetchController
{
    if (_fetchController != nil) {
        return _fetchController;
    }

    NSFetchRequest *request = [[NSFetchRequest alloc] init];
    NSEntityDescription *entity = [NSEntityDescription entityForName:@"Place"
                                              inManagedObjectContext:_managedContext];
    request.entity = entity;
    request.fetchBatchSize = 15;

    NSSortDescriptor *sort = [[NSSortDescriptor alloc] initWithKey:@"date" ascending:NO];
    request.sortDescriptors = [NSArray arrayWithObject:sort];

    _fetchController = [[NSFetchedResultsController alloc] initWithFetchRequest:request
                                                           managedObjectContext:_managedContext
                                                             sectionNameKeyPath:nil
                                                                      cacheName:@"Place"];
    _fetchController.delegate = self;

    NSError *error = nil;
    if (![_fetchController performFetch:&error]) {
        DLog(@"fetch error: %@", [error description]);
        abort();
    }

    return _fetchController;
}
```

和 UITableView 的整合：

```objc
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    id <NSFetchedResultsSectionInfo> info = [[_fetchController sections] objectAtIndex:section];
    return [info numberOfObjects];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    //...
    Place *place = [_fetchController objectAtIndexPath:indexPath];

    return cell;
}
```

[1]:http://www.raywenderlich.com/934/core-data-on-ios-5-tutorial-getting-started
[2]:http://www.raywenderlich.com/999/core-data-tutorial-how-to-use-nsfetchedresultscontroller

