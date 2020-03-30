---
layout: post
title: Golang sync.WaitGroup
date: 2017-04-26 22:21:52 +0800
---

`sync.WaitGroup` waits for a collection of goroutines to finish. 类似一个计数器，添加任务加一，完成任务减一，非零即阻塞。

- Add(x) 添加到计数器，需要注意的是必须在 main goroutine 执行
- Done() 计数器减一
- Wait() 阻塞 main goroutine 执行，直到所有 goroutine 执行完成。

```go
var wg sync.WaitGroup
var urls = []string{
    "http://www.google.com/",
    "http://fann.im/",
}
var errChan = make(chan error, len(urls))

for _, url := range urls {
    wg.Add(1)

    go func(url string) {
        defer wg.Done()

        resp, err := http.Get(url)
        if err != nil {
            errChan <- err
        }
        defer resp.Body.Close()
    }(url)
}

wg.Wait()
close(errChan)

for err := range errChan {
    if err != nil {
        log.Println(err.Error())
    }
}
```

`errgroup` 提供了类似的功能:

```go
var g errgroup.Group
var urls = []string{
    "http://www.golang.org/",
    "http://www.google.com/",
}

for _, url := range urls {
 // Launch a goroutine to fetch the URL.
    url := url // https://golang.org/doc/faq#closures_and_goroutines
    g.Go(func() error {
        // Fetch the URL.
        resp, err := http.Get(url)
        if err == nil {
            resp.Body.Close()
        }
        return err
    })
}
// Wait for all HTTP fetches to complete.
if err := g.Wait(); err == nil {
    fmt.Println("Successfully fetched all URLs.")
}
```

