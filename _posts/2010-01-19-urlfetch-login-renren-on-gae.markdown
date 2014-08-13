---
layout: post
title: "GAE urlfetch 登陆人人"
---

其实 Python 中一般都是直接用 urllib.urlopen() 来抓取网页内容或者模拟登陆等操作，但是 GAE 出于安全考虑不可以用 urlopen 操作，取而代之的就是 urlfetch.fetch()。fetch() 函数参数: `fetch(url, payload=None, method=GET, headers={}, allow_truncated=False, follow_redirects=True, deadline=None)`

```python
def login_renren(self):
    login_url = 'http://passport.renren.com/PLogin.do'
    login_data = urllib.urlencode(
        {
         'domain':'renren.com',
         'email':  renren_username,
         'password': renren_passwd,
         'origURL':'http://home.renren.com/Home.do',
         })
    result = urlfetch.fetch(
        url = login_url,
        payload = login_data,
        method = urlfetch.POST,
        headers = {'Cookie':make_cookie_header(cookie),
                   'Content-Type':'application/x-www-form-urlencoded',
                   'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6' },
        follow_redirects = False)
```

继续学习 GAE。

