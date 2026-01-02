#!/bin/bash

# --- 🚀 MestreJS Setup Script ---
# Este script automatiza a instalação do seu ambiente.

set -e

echo "🔍 Detectando Sistema Operacional..."
OS="$(uname)"

install_linux() {
    echo "🐧 Configurando Linux (Debian/Ubuntu)..."
    sudo apt update
    sudo apt install -y curl git build-essential zsh
}

install_mac() {
    echo "🍎 Configurando macOS..."
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install gh docker node pnpm bun go
}

install_common() {
    echo "📦 Instalando Oh-My-Zsh..."
    if [ ! -d "$HOME/.oh-my-zsh" ]; then
        sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    fi

    echo "🐙 Instalando GitHub CLI plugins..."
    gh extension install cli/gh-copilot || true
}

case "$OS" in
    Linux*) install_linux ;;
    Darwin*) install_mac ;;
    *) echo "Sistema não suportado: $OS"; exit 1 ;;
esac

install_common

echo "✅ Setup concluído! Lembre-se de vincular seus dotfiles."
