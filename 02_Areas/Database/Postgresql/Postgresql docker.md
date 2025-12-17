#Database

 [Doc]((https://www.postgresql.org/docs/)
 
 Criando uma imagem postgresql

exemplo com imagem docker da [Postgresql docker](Postgresql%20docker.md)
docker-compose.yml
version: '3.8'

```yml
version: '3.8'  

services:
  postgres:

    container_name: pg

    image: 'bitnami/postgresql:latest'


    ports:
      - 5432:5432

    environment:

      POSTGRES_USER: postgres

      POSTGRES_PASSWORD: docker

      POSTGRES_DB: docker

      PGDATA: /data/postgres

    volumes:   
		- /path/to/postgresql-persistence:/bitnami/postgresql

```
```console
docker-compose up -d
```