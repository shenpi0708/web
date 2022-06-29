# WEB
### docker build

```bash
$ . build-dokcer-image.bash
```
### docker run
```bash
$ . run-docker-container.bash
```
### ssl

```bash
$ cd work/src/webdata/node/ssl
$ openssl genrsa -des3 -out key.pem 2048
$ openssl req -new -key key.pem -out cert.csr
$ openssl req -new -x509 -key server-key.pem -out server-cert.pem -days 1095
```

### mysql
```bash
$ cd work
$ sudo pg_ctlcluster 12 main start
$ sudo -u postgres psql
```

```sql
CREATE USER $(USER) WITH PASSWORD 'aa';  
CREATE DATABASE web OWNER $(USER);
#ctrl+d 離開
```

```bash
$ cd work
$ psql -d web -f src/webdata/SQL/start.sql
$ catkin_make
$ .  devel/setup.bash
$ rosrun roswebnode app.js
```


### web

```sql
$ .  devel/setup.bash
$ rosrun roswebnode app.js
```

