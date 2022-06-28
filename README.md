# 啟動

### 安裝ssl

```bash
$ cd work/src/webdata/node/ssl
$ openssl genrsa -des3 -out key.pem 2048
$ openssl req -new -key key.pem -out cert.csr
$ openssl req -new -x509 -key server-key.pem -out server-cert.pem -days 1095
```

### 啟動資料庫
```bash
$ cd work
$ sudo pg_ctlcluster 12 main start
$ sudo -u postgres psql
```
### 資料庫生成

```sql
	CREATE USER $(USER) WITH PASSWORD 'aa';  
	CREATE DATABASE web OWNER $(USER);
    #ctrl+d 離開
```
### 資料庫初始化

```bash
$ cd work
$ psql -d web -f src/webdata/SQL/start.sql
$ catkin_make
$ .  devel/setup.bash
$ rosrun roswebnode app.js
```


### 啟動網頁

```sql
$ .  devel/setup.bash
$ rosrun roswebnode app.js
```

