---
layout: post
title: "Picky to Octopress"
date: 2011-11-30 15:13
categories: [Octopress]
---

**不敢保证转换过程万无一失，请注意备份**

前提条件：之前大多数文章已经是用 Markdown 格式。

1. 仿照 AtomFeedHandler 新增 RSSOutHandler

```python
class RSSOutHandler(webapp.RequestHandler):
  def get(self):
    site_domain = Datum.get('site_domain')
    site_name = Datum.get('site_name')
    site_author = Datum.get('site_author')
    site_slogan = Datum.get('site_slogan')
    site_analytics = Datum.get('site_analytics')
    site_updated = Datum.get('site_updated')
    if site_updated is None:
      site_updated = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    feed_url = Datum.get('feed_url')
    if feed_url is None:
      feed_url = '/index.xml'
    else:
      if len(feed_url) == 0:
        feed_url = '/index.xml'

    template_values = {
      'site_domain' : site_domain,
      'site_name' : site_name,
      'site_author' : site_author,
      'site_slogan' : site_slogan,
      'feed_url' : feed_url
    }

    articles = db.GqlQuery("SELECT * FROM Article WHERE is_page = FALSE ORDER BY created DESC")
    template_values['articles'] = articles
    template_values['articles_total'] = articles.count()
    template_values['site_updated'] = site_updated
    path = os.path.join(os.path.dirname(__file__), 'tpl', 'shared', 'out.xml')
    output = template.render(path, template_values)
    self.response.headers['Content-type'] = 'text/xml; charset=UTF-8'
    self.response.out.write(output)
```

2. 在 `main.py - main()` 添加

```
('/out.xml', RSSOutHandler),
```

3. 仿照 `index.xml` 添加 `out.xml` 模版
4. 参考 [Import XML of Wordpress to Octopress][1] 造一个 Picky2Octopress

```ruby
# -*- coding: utf-8 -*-
require 'fileutils'
require 'date'
require 'yaml'
require 'uri'
require 'rexml/document'
include REXML

doc = Document.new File.new(ARGV[0])

FileUtils.mkdir_p "_posts"

doc.elements.each("feed/entry") do |e|
    post = e.elements
    slug = post['slug'].text
    date = DateTime.parse(post['published'].text)
    name = "%02d-%02d-%02d-%s.markdown" % [date.year, date.month, date.day, slug]

    content = post['content'].text
    puts content

    content = content.gsub(/<code>(.*?)<\/code>/, '`\1`')

    ## 追加
    content = content.gsub(/<pre lang="([^"]*)">(.*?)<\/pre>/m, '<div class="bogus-wrapper"><notextile><figure class="code"><figcaption><span>lang:\1 </span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">1</span></pre></td><td class="code"><pre><code class=''><span class="line">\2</span></code></pre></td></tr></table></div></figure></notextile></div>')

    (1..3).each do |i|
    content = content.gsub(/<h#{i}>([^<]*)<\/h#{i}>/, ('#'*i) + ' \1')
    end

    File.open("_posts/#{name}", "w") do |f|
    f.puts "---"
    #f.puts data
    f.puts "layout: post"
    f.puts "comment: true"
    f.puts "title: \"#{post['title'].text}\""
    f.puts "---"
    f.puts content
    end
end
```

如果内容较少 (<100)，可以直接手动修改 index.xml 格式然后进行转换。

**最后，不敢保证转换过程万无一失，请注意备份**。

[1]: https://gist.github.com/1366971
