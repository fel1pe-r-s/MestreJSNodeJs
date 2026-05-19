
# Install Chocolatey 
abra o PowerShell como administrador
```console 
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
execute
```console
choco
```

# Ferramentas Windows
Baixe
[Notion](https://www.notion.so/pt/download) , [Obsidia](https://obsidian.md/download) , [Arc](https://arc.net/download) , [Google Dive](https://workspace.google.com/products/drive/#download) , [VS Code](https://code.visualstudio.com/download) , [Discord](https://discord.com/)
podendo serem instalados com choco
```console
choco install obsidian
choco install discord
choco install googledrive
choco install vscode
```

# Ambiente dev
Usando o Home dev do Windows crie um ambiente wsl com o ubuntu
Instale o PowerToys
# wsl

atualize o Ubuntu
```wsl
sudo apt-get upda
```

# Curl

```wsl
sudo apt install curl 
```
# Zsh

```wsl
apt install zsh
```

# Ohmyzsh

```wsl
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
# node

instale o Nvm para gerencia a instalação do node
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
execute
```wsl
nvm -v
```

Caso o Nvm não aparecer ou der erro va ao arquivo .zshrc e adicione ao final do arquivo
```zshrc
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

execute altere a versão para a desejada, use o nvm ls para lista as versos node instalada na maquina

```wsl
nvm ls-remote
nvm install v20.17.0
nvm ls
```

# Bun 

```
curl -fsSL https://bun.sh/install | bash
Or
npm install -g bun
```

Install [Docker](00-CAIXA%20DE%20ENTRADA/Docker/Docker.md) 
