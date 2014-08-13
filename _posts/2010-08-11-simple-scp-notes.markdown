---
layout: post
title: "Simple SCP notes"
---

SCP: Copies files over the network securely; uses ssh for data transfer, using the same authentication and providing the same security as ssh.

Using:

> `scp [-p] [-v] [-r] [[username@]host:] file_or_dir [[username@]host:]file_or_dir`

- Putting:

> scp mydata.dat myname@myhost.com:Newname.dat

> scp -r FileFolder myname@myhost.com:/home/

- Gettiing:

> scp myname@myhost.com:remote.data /home/local.dat

> scp -r myname@myhost.com:FileFolder /home/

