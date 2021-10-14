
# nginx

centos7.9 

* yum install nginx -y
```
/usr/sbin/nginx
/etc/nginx/nginx.conf


./nginx -s stop
./nginx -s quit nginx进程处理完任务再进行停止
./nginx -s reload 重新加载配置文件

```

* 修改nginx.conf
```
root /usr/share/nginx/html
改成
root	/usr/share/nginx/myweb;
try_files $uri $uri/ /index.html;

下面加上反向代理
location /api {
	proxy_pass http://127.0.0.1:8888;
}

```