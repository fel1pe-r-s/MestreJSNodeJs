#Entrada

[doc](https://github.com/redis/ioredis#readme)

`export class RedisService extends Redis implements OnModuleDestroy {`
	`constructor(envService: EnvService) {`
		`super({`
			`host: envService.get('REDIS_HOST'),`
			`port: envService.get('REDIS_PORT'),`
			`db: envService.get('REDIS_DB'),`
			`})`
		`}`
		`onModuleDestroy() {`
			`return this.disconnect()`
		`}`
	`}`
depois de configurar o cache, podemos configurar um container doker da bitname/redis|   |
docker-compose.yml

```yml:
version: '3.8'  

services:
	redis:
		container_name: redis
		image: bitnami/redis:latest
	
		ports:
			- 6379:6379
		volumes:
	      - /path/to/redis-persistence:/bitnami/redis/data
```
```console
docker-compose up -d
```


