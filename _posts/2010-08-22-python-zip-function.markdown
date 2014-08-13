---
layout: post
title: "Python zip function"
---

The built-in zip function can be used, well, to zip lists together. It returns a list of tuples, where the nth tuple contains the nth item from each of the passed in lists.

```
letters = ['a', 'b', 'c']
numbers = [1, 2, 3]
squares = [1, 4, 9]

zipped_list = zip(letters, numbers, squares)
# zipped_list contains [('a', 1, 1), ('b', 2, 4), ('c', 3, 9)]
```

via [Combining Multiple Lists, Item by Item](http://www.siafoo.net/article/52#combining-multiple-lists-item-by-item)

