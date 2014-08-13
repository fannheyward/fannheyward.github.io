---
layout: post
title: "Delphi ADOQuery查询、插入、删除、修改"
---


//查询记录

```
with ADOQuery do begin
    Close;
    SQL.Clear;
    SQL.Add('Select * From Table');
    Open;
end;
```

//插入记录

```
with ADOQuery do begin
    Close;
    SQL.Clear;
    SQL.Add('Insert Into Table(val1,val2) values(:val1,:val2)');
    Parameters.ParamByName('val1').Value := Trim(Edit1.Text);
    Parameters.ParamByName('val2').Value := Trim(Edit2.Text);
    ExecSQL;
end;
```

//删除记录

```
with ADOQuery do begin
    Close;
    SQL.Clear;
    SQL.Add('Delete from TABLE where val1=:val1'); // =: 前后都不可有空格；
    Parameters.ParamByName('val1').Value := Trim(Edit1.Text);
    ExecSQL;
end;
```

//修改记录

```
with ADOQuery do begin
    Close;
    SQL.Clear;
    SQL.Add('Update TABLE Set Key=:val1');
    Parameters.ParamByName('val1').Value := Trim(Edit1.Text);
    ExecSQL;
end;
```

Open 有记录集返回，ExecSQL 没有记录集返回；Select 常用 Open，Delete/Insert/Update 常用 ExecSQL。

