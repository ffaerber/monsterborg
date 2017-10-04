docker rm gpsd && \
docker build -t gpsd . && \
docker run -d \
--volume /home/pi/app:/app \
--name gpsd \
--device /dev/ttyUSB1:/dev/ttyUSB1 \
gpsd



stty –F /dev/ttyUSB0 4800 && \
gpsd /dev/ttyUSB0 -F /var/run/gpsd.sock && \

gpsd /dev/ttyUSB0 -F /var/run/gpsd.sock
dpkg-reconfigure gpsd
cgps -s







docker run -v /home/pi/app:/app --name=gpsd --device=/dev/ttyUSB0:/dev/ttyUSB0 -i -t gpsd /bin/bash
