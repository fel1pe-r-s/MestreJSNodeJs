# 🗂️ Git & GitHub

**Tags**: `#Git` `#GitHub` `#VersionControl`
**Links Relacionados**: [[Git - CI CD]], [[Git - GitHub Actions]], [[Git - Monorepo]]

---

## 💡 Estados do Git
* **Modificado** (modified)
* **Preparado** (staged/index)
* **Consolidado** (committed)

---

## 📜 Cheat Sheet de Comandos

### Configuração
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --list
```

### Repositório Local
```bash
git init
git status
git add .
git commit -m "mensagem"
git log --oneline --graph --all
```

### Desfazendo Alterações
```bash
# Desfazer no working directory
git checkout -- arquivo.txt

# Desfazer no staging area
git reset HEAD arquivo.txt

# Alterar último commit
git commit --amend -m "nova mensagem"
```

### Branches & Stash
```bash
git branch <nome>
git checkout -b <novo-branch>
git merge <branch>
git stash  # Salva alterações temporariamente
git stash pop # Recupera alterações
```

### Repositório Remoto
```bash
git remote add origin <url>
git push -u origin master
git pull
git clone <url>
```

---

## 🛠 Projects applying this concept
- [DesignSystem_Lib](../../01_Projetos/DesignSystem_Lib)
- [DevStore_Ecom](../../01_Projetos/DevStore_Ecom)
- [FelipeRS_Profile](../../01_Projetos/FelipeRS_Profile)
- [GymPass_App](../../01_Projetos/GymPass_App)
- [ServerlessTesting](../../01_Projetos/ServerlessTesting)
