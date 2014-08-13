---
layout: post
title: "Delphi ADODataset 增删查改"
---

//Select/Refresh

```
ADODataset1.Active := false;
ADODataset1.CommandText := 'select *  from Table_1';
ADODataset1.Active := true;
```

//Add

```
ADODataset1.Append;
ADODataset1.Fieldbyname('ID').Value := edit1.Text;
```

//Delete

```
ADODataset1.Delete;
```

//Update

```
ADODataset1.Edit;
ADODataset1.Fieldbyname('ID').Value := edit1.Text;
ADODataset1.Post;
```

