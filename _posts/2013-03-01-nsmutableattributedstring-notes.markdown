---
layout: post
title: "NSMutableAttributedString Notes"
date: 2013-03-01 11:48
---

Core Text 针对文本段落支持的样式属性：

``` objc
typedef CF_ENUM(uint32_t, CTParagraphStyleSpecifier) {
    kCTParagraphStyleSpecifierAlignment = 0,
    kCTParagraphStyleSpecifierFirstLineHeadIndent = 1,
    kCTParagraphStyleSpecifierHeadIndent = 2,
    kCTParagraphStyleSpecifierTailIndent = 3,
    kCTParagraphStyleSpecifierTabStops = 4,
    kCTParagraphStyleSpecifierDefaultTabInterval = 5,
    kCTParagraphStyleSpecifierLineBreakMode = 6,
    kCTParagraphStyleSpecifierLineHeightMultiple = 7,
    kCTParagraphStyleSpecifierMaximumLineHeight = 8,
    kCTParagraphStyleSpecifierMinimumLineHeight = 9,
    kCTParagraphStyleSpecifierLineSpacing = 10, /* deprecated */
    kCTParagraphStyleSpecifierParagraphSpacing = 11,
    kCTParagraphStyleSpecifierParagraphSpacingBefore = 12,
    kCTParagraphStyleSpecifierBaseWritingDirection = 13,
    kCTParagraphStyleSpecifierMaximumLineSpacing = 14,
    kCTParagraphStyleSpecifierMinimumLineSpacing = 15,
    kCTParagraphStyleSpecifierLineSpacingAdjustment = 16,
    kCTParagraphStyleSpecifierLineBoundsOptions = 17,

    kCTParagraphStyleSpecifierCount
};
```

使用方法：新建一个样式 `CTParagraphStyleSetting`，设置样式属性和相关值，然后添加到 NSAttributedString.

``` objc
NSMutableAttributedString *attriStr = [[NSMutableAttributedString alloc] initWithString:string];
// 样式1: 两端对齐
CTTextAlignment alignment = kCTJustifiedTextAlignment;
CTParagraphStyleSetting alignmentStyle;
alignmentStyle.spec = kCTParagraphStyleSpecifierAlignment;//对齐属性
alignmentStyle.valueSize = sizeof(alignment);
alignmentStyle.value = &alignment;

// 样式2：行间距
CGFloat lineSpaceMax = 4.0f;
CTParagraphStyleSetting lineSpaceStyleMax;
lineSpaceStyleMax.spec = kCTParagraphStyleSpecifierMaximumLineSpacing;//最大行间距属性
lineSpaceStyleMax.valueSize = sizeof(lineSpaceMax);
lineSpaceStyleMax.value = &lineSpaceMax;

CGFloat lineSpaceMin = 1.0f;
CTParagraphStyleSetting lineSpaceStyleMin;
lineSpaceStyleMin.spec = kCTParagraphStyleSpecifierMinimumLineSpacing;//最小行间距属性
lineSpaceStyleMin.valueSize = sizeof(lineSpaceMin);
lineSpaceStyleMin.value = &lineSpaceMin;

CGFloat lineSpaceAdjust = 2.0f;
CTParagraphStyleSetting lineSpaceStyleAdjust;
lineSpaceStyleAdjust.spec = kCTParagraphStyleSpecifierLineSpacingAdjustment;
lineSpaceStyleAdjust.valueSize = sizeof(lineSpaceAdjust);
lineSpaceStyleAdjust.value = &lineSpaceAdjust;

// 样式3：最大行高
CGFloat lineHeightMax = 18.0f;
CTParagraphStyleSetting lineHeightMaxStyle;
lineHeightMaxStyle.spec = kCTParagraphStyleSpecifierMaximumLineHeight;//最大行高属性
lineHeightMaxStyle.valueSize = sizeof(lineHeightMax);
lineHeightMaxStyle.value = &lineHeightMax;

// 样式数组
CTParagraphStyleSetting settings[]={
    alignmentStyle, lineSpaceStyleMax, lineSpaceStyleMin, lineSpaceStyleAdjust, lineHeightMaxStyle
};
CTParagraphStyleRef paragraphStyle = CTParagraphStyleCreate(settings, 5);
[attriStr addAttribute:(id)kCTParagraphStyleAttributeName
                 value:(__bridge id)paragraphStyle
                 range:NSMakeRange(0, [attriStr length])];
CFRelease(paragraphStyle);

// Emoji、中文、英文混排
NSDictionary *fontAttributes = @{
    (id)kCTFontFamilyNameAttribute  : @"Helvetica",
    (id)kCTFontCascadeListAttribute : @[
        (__bridge id)CTFontDescriptorCreateWithNameAndSize(CFSTR("AppleColorEmoji"), 0),
        (__bridge id)CTFontDescriptorCreateWithNameAndSize(CFSTR("ZapfDingbatsITC"), 0),
    ]
};
CTFontDescriptorRef descriptor = CTFontDescriptorCreateWithAttributes((__bridge CFDictionaryRef)(fontAttributes));
CTFontRef font = CTFontCreateWithFontDescriptor(descriptor, FONT_SIZE, 0);

[attriStr addAttribute:(id)kCTFontAttributeName
                 value:(__bridge id)font
                 range:NSMakeRange(0, [attriStr length])];
CFRelease(font);

// 字体颜色
[attriStr addAttribute:(id)kCTForegroundColorAttributeName
                 value:(id)FONT_COLOR.CGColor
                 range:NSMakeRange(0, [attriStr length])];
```

