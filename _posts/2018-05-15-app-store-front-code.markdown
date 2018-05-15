---
layout: post
title: App Store Front Code
date: 2018-05-15 15:40:02 +0800
---

`X-Apple-Store-Front` header is needed to scrape in App Store.

```
CN 143465-19,29
US 143441-1,29
JP 143462-9,29
KR 143466-13,29
HK 143463-18,29
AU 143460,29
TW 143470-18,29
CA 143455-6,29
```

App info:

```
curl -H 'x-apple-store-front: 143465-19,29' 'https://itunes.apple.com/cn/app/id1318151064?mt=8'
```

Top Free iPhone Apps:

```
curl -H 'x-apple-store-front: 143465-0,9' 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/topChartFragmentData?=&popId=27&pageNumbers=0&pageSize=1000'

curl -H 'x-apple-store-front: 143465-19,29' 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewTop?id=25204&popId=27&genreId=36'
```