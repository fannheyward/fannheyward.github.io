---
layout: post
title: dmidecode
date: 2018-05-15 15:48:28 +0800
---

You can use `dmidecode` to display server **physical** info, for example RAM max capacity.

```
dmidecode -t 16

Handle 0x0032, DMI type 16, 15 bytes
Physical Memory Array
	Location: System Board Or Motherboard
	Use: System Memory
	Error Correction Type: Multi-bit ECC
	Maximum Capacity: 48 GB
	Error Information Handle: Not Provided
	Number Of Devices: 6
```