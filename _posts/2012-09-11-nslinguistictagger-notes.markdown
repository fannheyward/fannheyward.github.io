---
layout: post
title: "NSLinguisticTagger Notes"
date: 2012-09-11 11:52
---

NSLinguisticTagger 是 iOS 5+/OS X 10.7+ 引入的自然语言智能分析类。一个简单的 sample：

```
NSString *text = @"The iPhone is a line of smartphones designed and marketed by Apple Inc. The iPhone runs Apple's iOS mobile operating system, originally named iPhone OS. The first iPhone was unveiled by then CEO of Apple Steve Jobs on January 9, 2007, and released on June 29, 2007. The most recent iPhone, the 5th generation iPhone 4S, was released in October 2011. iPhone是苹果公司旗下的一个智能手机系列，此系列手机搭载苹果公司研发的iOS手机操作系统。第一代iPhone于2007年1月9日由时任苹果公司CEO的史蒂夫·乔布斯发布，并在6月29日正式发售；最新的iPhone 4s于2011年10月4日发布，并于同年10月14日正式发售。"; // text from Wikipedia.

NSArray *schemes = [NSArray arrayWithObject:NSLinguisticTagSchemeNameTypeOrLexicalClass];
NSLinguisticTagger *tagger = [[NSLinguisticTagger alloc] initWithTagSchemes:schemes options:0];
tagger.string = text;
[tagger enumerateTagsInRange:NSMakeRange(0, text.length)
                      scheme:NSLinguisticTagSchemeNameTypeOrLexicalClass
                     options:NSLinguisticTaggerOmitWhitespace | NSLinguisticTaggerOmitPunctuation // 忽略空格和标点
                  usingBlock:^(NSString *tag, NSRange tokenRange, NSRange sentenceRange, BOOL *stop) {
                      NSLog(@"%@ is a %@", [text substringWithRange:tokenRange], tag);
                  }];

// OR

[text enumerateLinguisticTagsInRange:NSMakeRange(0, text.length)
                              scheme:NSLinguisticTagSchemeNameTypeOrLexicalClass
                             options:NSLinguisticTaggerOmitWhitespace | NSLinguisticTaggerOmitPunctuation
                         orthography:nil
                          usingBlock:^(NSString *tag, NSRange tokenRange, NSRange sentenceRange, BOOL *stop) {
                              NSLog(@"%@ is a %@", [text substringWithRange:tokenRange], tag);
                    }];
```

结果输出：

```
2012-09-11 11:56:45.192 LinguisticTaggerSample[3342:c07] The is a Determiner
2012-09-11 11:56:45.193 LinguisticTaggerSample[3342:c07] iPhone is a Noun
2012-09-11 11:56:45.193 LinguisticTaggerSample[3342:c07] is is a Verb
2012-09-11 11:56:45.193 LinguisticTaggerSample[3342:c07] a is a Determiner
2012-09-11 11:56:45.194 LinguisticTaggerSample[3342:c07] line is a Noun
2012-09-11 11:56:45.194 LinguisticTaggerSample[3342:c07] of is a Preposition
2012-09-11 11:56:45.194 LinguisticTaggerSample[3342:c07] smartphones is a Adverb
2012-09-11 11:56:45.194 LinguisticTaggerSample[3342:c07] designed is a Verb
2012-09-11 11:56:45.195 LinguisticTaggerSample[3342:c07] and is a Conjunction
2012-09-11 11:56:45.195 LinguisticTaggerSample[3342:c07] marketed is a Verb
2012-09-11 11:56:45.195 LinguisticTaggerSample[3342:c07] by is a Preposition
2012-09-11 11:56:45.196 LinguisticTaggerSample[3342:c07] Apple is a OrganizationName
2012-09-11 11:56:45.196 LinguisticTaggerSample[3342:c07] Inc is a OrganizationName
...
2012-09-11 11:56:45.203 LinguisticTaggerSample[3342:c07] Steve is a PersonalName
2012-09-11 11:56:45.203 LinguisticTaggerSample[3342:c07] Jobs is a PersonalName
...
2012-09-11 11:56:45.222 LinguisticTaggerSample[3342:c07] iPhone is a Noun
2012-09-11 11:56:45.223 LinguisticTaggerSample[3342:c07] 是 is a Particle
2012-09-11 11:56:45.223 LinguisticTaggerSample[3342:c07] 苹果 is a Verb
2012-09-11 11:56:45.223 LinguisticTaggerSample[3342:c07] 公司 is a Particle
2012-09-11 11:56:45.224 LinguisticTaggerSample[3342:c07] 旗下 is a Verb
2012-09-11 11:56:45.224 LinguisticTaggerSample[3342:c07] 的 is a Particle
2012-09-11 11:56:45.224 LinguisticTaggerSample[3342:c07] 一 is a Verb
2012-09-11 11:56:45.288 LinguisticTaggerSample[3342:c07] 个 is a Particle
2012-09-11 11:56:45.288 LinguisticTaggerSample[3342:c07] 智能 is a Verb
2012-09-11 11:56:45.289 LinguisticTaggerSample[3342:c07] 手机 is a Particle
2012-09-11 11:56:45.289 LinguisticTaggerSample[3342:c07] 系列 is a Verb
...
2012-09-11 11:56:45.310 LinguisticTaggerSample[3342:c07] 史 is a Verb
2012-09-11 11:56:45.311 LinguisticTaggerSample[3342:c07] 蒂 is a Particle
2012-09-11 11:56:45.311 LinguisticTaggerSample[3342:c07] 夫 is a Verb
2012-09-11 11:56:45.311 LinguisticTaggerSample[3342:c07] 乔 is a Particle
2012-09-11 11:56:45.312 LinguisticTaggerSample[3342:c07] 布 is a Verb
2012-09-11 11:56:45.312 LinguisticTaggerSample[3342:c07] 斯 is a Particle
```

对英文的分析要好于中文。不同的 scheme 有不同的返回结果，包括文本语言等。详细文档 [NSLinguisticTagger Class Reference][1].

PS：可以用这个做一个微博关键词分析，罗列出自己微博最多的关键词。

[1]:https://developer.apple.com/library/ios/#DOCUMENTATION/Cocoa/Reference/NSLinguisticTagger_Class/Reference/Reference.html

