## Mocker

Mocker is a Docker image with th purpose of helping create mockup Docker topologies.

## Examples and Installation

To build the image:
```shell script
docker build -t mocker .
```


To start a mocker server:
```shell script
# default port 8080
docker run --rm --name mocker8080 -v /var/run/docker.sock:/var/run/docker.sock mocker

# other ports
docker run --rm --name mocker8888 -v /var/run/docker.sock:/var/run/docker.sock mocker node server 8888

# with startup delay (10 seconds)
docker run --rm --name mocker8888 -v /var/run/docker.sock:/var/run/docker.sock mocker node server 8888 10000

```

To get information or test commands in a mocker server:
```shell script
docker exec mocker8080 node info
docker exec mocker8888 node hello-world
docker exec mocker8888 node http http://ifconfig.co/json
```
## License

A short snippet describing the license (MIT, Apache, etc.)