# --- ⚡ MestreJS Productivity Aliases ---

# Git
alias g="git"
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --decorate"

# Docker
alias d="docker"
alias dc="docker-compose"
alias dps="docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
alias dlogs="docker-compose logs -f"

# Projetos (MestreJS Hub)
alias cdp="cd '/home/felipe/O mestre/MestreJSNodeJs/01_Projetos'"
alias ptasks="cat '/home/felipe/O mestre/MestreJSNodeJs/PENDING_TASKS.md'"

# Utils
alias cls="clear"
alias reload="source ~/.zshrc"
alias myip="curl ifconfig.me"

# Scaffolding (MestreCLI)
alias mcli="/home/felipe/O mestre/MestreJSNodeJs/01_Projetos/MestreCLI/mcli"
