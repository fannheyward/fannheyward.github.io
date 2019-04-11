---
layout: post
title: Druid Query in JSON
date: 2019-04-11 17:30:08 +0800
---

Druid 可以在 Superset SQL 查询，除此之外可以通过 HTTP+JSON 查询:

```sh
curl -X POST '<host:<port>/druid/v2/?pretty' -H 'Content-Type:application/json' -H 'Accept:application/json' -d @query.json
```
```json
{
  "queryType": "timeseries",
  "dataSource": "cpm_log",
  "granularity": "hour",
  "aggregations": [
    {
      "type": "longSum",
      "name": "requests",
      "fieldName": "req_count_raw"
    },
    {
      "type": "longSum",
      "name": "impressions",
      "fieldName": "win_count"
    },
    {
      "type": "floatSum",
      "name": "revenues",
      "fieldName": "win_price"
    }
  ],
  "postAggregations": [
    {
      "type":"arithmetic",
      "name": "ecpm",
      "fn": "/",
      "fields": [
        {
          "type": "fieldAccess",
          "name": "postAgg_rev",
          "fieldName": "revenues"
        },
        {
          "type": "fieldAccess",
          "name": "postAgg_imps",
          "fieldName": "impressions"
        }
      ]
    }
  ],
  "filter": {
    "type": "and",
    "fields": [
      {
        "type": "selector",
        "dimension": "device_os",
        "value": "android"
      },
      {
        "type": "in",
        "dimension": "req_ad_type",
        "values": ["banner"]
      }
    ]
  },
  "context": {
    "grandTotal": true
  },
  "intervals": [
    "2019-04-09T00:00:00+08:00/2019-04-09T23:00:00+08:00"
  ]
}
```

1. queryType 有 `timeseries`, `topN`, `groupBy`, `search`, `timeBoundary` 等
1. 尽量少用 groupBy 查询，效率不高
1. topN 查询是通过 `metric` 来排序
1. `context` 可以指定 `queryId`，这样可以通过 `DELETE /druid/v2/{queryId}` 取消查询
1. 去重: `{"type": "cardinality", "name": "distinct_pid", "fields": ["ad_pid"]}`

[RTFM](http://druid.io/docs/latest/querying/querying.html), [godruid](https://godoc.org/github.com/fannheyward/godruid)