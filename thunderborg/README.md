### test i2c
`docker run --rm -it --privileged -v /dev/i2c-1:/dev/i2c-1 lojzik/rpi-i2c i2cdetect -y 1`
