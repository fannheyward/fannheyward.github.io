Local test with Docker.

1. `docker build --rm=true --tag="blog:0.0.2" .`
1. `docker run --rm -p 4000:4000 -v /ABSOLUTE/PATH:/blog blog:0.0.2`
1. `boot2docker ip` then `http://IP:4000`
1. OR `docker run --rm -v /ABSOLUTE/PATH:/blog blog:0.0.2 build`

