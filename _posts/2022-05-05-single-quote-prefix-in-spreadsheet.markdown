---
layout: post
title: Single Quote Prefix in Google Spreadsheet
date: 2022-05-05 15:58:15 +0800
---

When adding/updating cells in Google Spreadsheet, a single quote (`'`) was prefixed to the value.

> '2022-05-01

This can be fixed by changing the `valueInputOption` to `USER_ENTERED`. There're two options:

- `RAW`: The values the user has entered will not be parsed and will be stored as-is.
- `USER_ENTERED`: The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but **strings may be converted to numbers, dates, etc**.

If you're using <https://github.com/burnash/gspread>, change the `value_input_option`.

- <https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption>
- <https://github.com/burnash/gspread/issues/524>
