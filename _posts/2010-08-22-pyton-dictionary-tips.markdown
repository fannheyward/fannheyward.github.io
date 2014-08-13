---
layout: post
title: "Python Dictionary tips"
---

- Constructing Dictionaries with Keyword Arguments,the simplest way to create a Dict.

```
dict(a=1, b=2, c=3) # returns {'a': 1, 'b': 2, 'c': 3}
```

- Dicts to Lists.

```
dict = {'a': 1, 'b': 2, 'c': 3}
keys_list = dict.keys() #return ['a', 'c', 'b']
values_list = dict.values() #return [1,2,3]
dict_as_list = dict.items() #return [('a', 1), ('b', 2), ('c', 3)]
```

via [Constructing Dictionaries with Keyword Arguments](http://www.siafoo.net/article/52#constructing-dictionaries-with-keyword-arguments)

