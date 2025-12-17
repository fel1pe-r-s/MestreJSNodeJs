#Docker


``` c
// verifica informações do conteiner
docker inspect <nome_ou_id_do_container>
// roda uma imagem docker
docker run
// roda o conteiner em segundo plano
-d
// define a porta 
-p 127.0.0.1:5002:5002
// juntando os dois comando
-dp
// lista os conteiner que estão em execução
docker ps
// lista as imagem docker
docker image ls
//lista os volumes
docker volume ls
// nomea o conteiner
--name <nome-do-contêiner>
// cria uma imagem apartir de um dockerfile e dar o nome a imagem
docker build -t <nome-da-imagem>
// para o conteiner
docker stop <id-conteinet>
//inicia o conteiner
docker start <id-conteinet>
// remove o conteiner
docker rm <id-conteinet>
// remove image
docker image rm <nome-do-volume>
// remove volumes
docker 
//cria um network
docker network create <nome-do-network>
// adiciona o conteiner a uma network
--network <nome-do-network>
//execultar console dentro de um conteiner
docker exec -it <id-conteiner> /bin/bash 