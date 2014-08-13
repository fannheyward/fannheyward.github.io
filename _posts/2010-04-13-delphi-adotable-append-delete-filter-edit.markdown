---
layout: post
title: "Delphi ADOTable 增删查改"
---

//添加记录

```
ADOTable1.AppendRecord([val1,val2]);
```

//删除记录

```
 ADOTable1.Filter :='SaleID='''+text+'''';
 ADOTable1.Filtered := true;
 if ADOTable1.RecordCount = 0 then
      begin
          ADOTable1.Filtered := false;
      end;
 else
      begin
          ADOTable1.Filtered := true;
          ADOTable1.Delete;
          ADOTable1.Filtered := false;
      end;
```

//查找记录

```
ADOTable1.Filter := 'SaleID='''+text+'''' ;
ADOTable1.Filtered :=True;
```

//更新记录

```
ADOTable1.Edit;
ADOTable1.FieldByName('SaleID').Asstring := text;
ADOTable1.Post;
```

