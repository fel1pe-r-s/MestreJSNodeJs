# --- 🛠️ MestreJS Modular Config ---
# Adicione a linha abaixo no seu ~/.zshrc para carregar estas configs:
# source "/home/felipe/O mestre/MestreJSNodeJs/dotfiles/zshrc_modular.zsh"

# Path do Monorepo
export MESTRE_HUB="/home/felipe/O mestre/MestreJSNodeJs"

# Carregar Aliases
if [ -f "$MESTRE_HUB/dotfiles/aliases.sh" ]; then
    source "$MESTRE_HUB/dotfiles/aliases.sh"
fi

# Configurações Adicionais
export EDITOR="code" # VS Code como editor padrão
export HISTSIZE=10000
export SAVEHIST=10000
setopt APPEND_HISTORY
setopt SHARE_HISTORY

echo "🚀 Ambiente MestreJS Carregado!"
