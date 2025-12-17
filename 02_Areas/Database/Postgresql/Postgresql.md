#Database


https://www.postgresql.org/docs/current/
# Como instalar o PostgreSQL e pgAdmin4 no Ubuntu

# Como instalar o PostgreSQL e pgAdmin4 no Ubuntu

1. **Atualize os pacotes do Ubuntu:**
   ```bash
   sudo apt update
   ```

2. **Instale o PostgreSQL:**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

3. **Inicie o PostgreSQL:**
   ```bash
   sudo systemctl start postgresql
   ```
      ```bash
   sudo systemctl enable postgresql
   ```

4. **Confirme se o PostgreSQL foi instalado corretamente e está rodando:**
   ```bash
   psql --version
   ```
    ```bash
   sudo systemctl status postgresql
   ```

5. **Instale o pgAdmin4:**
    - Siga as instruções do site oficial: [Download pgAdmin4](https://www.pgadmin.org/download/pgadmin-4-apt/)
        - a) Instale a chave pública para o repositório:
           ```bash
           curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
           ```
        - b) Crie o arquivo de configuração do repositório:
           ```bash
           echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://www.pgadmin.org/download/pgadmin4/apt/focal pgadmin4 main" | sudo tee /etc/apt/sources.list.d/pgadmin4.list
           ```
        - c) Se você não tiver o `curl` instalado, execute estes comandos primeiro:
           ```bash
           sudo apt update
           ```
          ```bash
           sudo apt install curl
           ```
          ```bash
           curl --version
           ```
        - d) Escolha a versão desejada e instale:
            - Instale ambas as versões Web e Desktop:
              ```bash
              sudo apt install pgadmin4
              ```
            - Instale apenas a versão Desktop:
              ```bash
              sudo apt install pgadmin4-desktop
              ```
            - Instale apenas a versão Web:
              ```bash
              sudo apt install pgadmin4-web
              ```
            - Configure o servidor web (apenas se instalou a versão Web):
              ```bash
              sudo /usr/pgadmin4/bin/setup-web.sh
              ```

6. **Configure uma senha para o usuário "postgres" se não foi solicitado durante a instalação:**
   ```bash
   sudo -u postgres psql
   ```
    ```bash
   ALTER USER postgres WITH PASSWORD 'senha_que_voce_deseja';
   ```
    ```bash
   \q
   ```

7. **Acesse o pgAdmin4 e conecte-se ao Servidor do PostgreSQL e crie seu Banco de Dados.**



---