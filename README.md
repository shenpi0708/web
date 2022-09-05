# WEB
### docker build

```bash
$ cd docker
$ . build-dokcer-image.bash
```
### docker run
```bash 
$ cd docker
$ . run-docker-container.bash
```
### ssl

```bash
$ cd node/ssl
$ openssl genrsa -des3 -out key.pem 2048
$ openssl req -new -key key.pem -out cert.csr
$ openssl req -new -x509 -key server-key.pem -out server-cert.pem -days 1095
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

### mysql
```bash
$ sudo pg_ctlcluster 12 main start
$ sudo -u postgres psql
```

```sql
CREATE USER $(USER) WITH PASSWORD 'aa';  
CREATE DATABASE web OWNER $(USER);
#ctrl+d 
```

### web
```bash
$ psql -d web -f src/web/SQL/start.sql
$ sudo /etc/init.d/nginx start

```

```bash
# $ catkin_make
$ .  devel/setup.bash
$ roslaunch roswebnode web.launch 
#########################
$ roscore
$ rosrun roswebnode app.js
or
$ rosrun roswebnode app_arm.js
```
### camera image

web catch topuc: /camera/image_raw

### system pub
```bash
$ rostopic pub /chat std_msgs/String "data: ('system','i am ok')"
```
