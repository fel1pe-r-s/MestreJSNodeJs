import os
import json
from datetime import date

PROJECTS_DIR = "/home/felipe/MestreJSNodeJs/01_Projetos"
ENTRADA_DIR = "/home/felipe/MestreJSNodeJs/00_Entrada"

def detect_stack(package_json):
    deps = package_json.get('dependencies', {})
    dev_deps = package_json.get('devDependencies', {})
    all_deps = {**deps, **dev_deps}
    
    stack = []
    
    # Frameworks
    if '@nestjs/core' in all_deps: stack.append("NestJS")
    if 'next' in all_deps: stack.append("NextJS")
    if 'react' in all_deps: stack.append("React")
    if 'vue' in all_deps: stack.append("Vue")
    if 'express' in all_deps: stack.append("Express")
    if 'fastify' in all_deps: stack.append("Fastify")
    
    # Languages
    if 'typescript' in all_deps: stack.append("TypeScript")
    else: stack.append("JavaScript")

    # Database
    if 'prisma' in all_deps: stack.append("Prisma")
    if 'mongoose' in all_deps: stack.append("Mongoose")
    if 'typeorm' in all_deps: stack.append("TypeORM")
    if 'pg' in all_deps: stack.append("Postgres")
    
    # Css
    if 'tailwindcss' in all_deps: stack.append("Tailwind")
    if 'sass' in all_deps: stack.append("Sass")
    if 'styled-components' in all_deps: stack.append("StyledComponents")

    return stack

def create_card(project_name, package_path):
    try:
        with open(package_path, 'r') as f:
            data = json.load(f)
            
        stack = detect_stack(data)
        description = data.get('description', 'Sem descrição no package.json')
        
        stack_tags = " ".join([f"#{t}" for t in stack])
        stack_list = "\n".join([f"- {t}" for t in stack])
        today = date.today().isoformat()
        
        content = f"""# Análise: {project_name}

**Tags**: `#Inbox/Project` {stack_tags}
**Data**: {today}
**Status**: `#ToReview`
**Path**: `[[../../01_Projetos/{project_name}]]`

---

## 💡 Sobre o Projeto
{description}

## 🛠 Stack Detectada
{stack_list}

## 🔍 Pontos de Melhoria (Sugestões)
- [ ] **Documentação**: Verificar se o README.md explica como rodar.
- [ ] **Docker**: Criar Dockerfile e docker-compose.yml.
- [ ] **Arquitetura**: Revisar se segue Clean Architecture / SOLID.
- [ ] **Testes**: Adicionar testes unitários (Vitest/Jest).
- [ ] **CI/CD**: Criar pipeline básica de build/test.
"""
        
        output_path = os.path.join(ENTRADA_DIR, f"Analise_{project_name}.md")
        # Don't overwrite if exists (preserves manual edits), or overwrite? 
        # Requirement said to add notes, probably safety to not overwrite if I did this before. 
        # But for this run, assuming fresh batch.
        with open(output_path, 'w') as f:
            f.write(content)
        
        print(f"Created card for {project_name}")

    except Exception as e:
        print(f"Error processing {project_name}: {e}")

def main():
    if not os.path.exists(ENTRADA_DIR):
        os.makedirs(ENTRADA_DIR)

    for project in os.listdir(PROJECTS_DIR):
        project_path = os.path.join(PROJECTS_DIR, project)
        if os.path.isdir(project_path):
            # Check for package.json directly
            pkg_path = os.path.join(project_path, "package.json")
            if os.path.exists(pkg_path):
                create_card(project, pkg_path)
            else:
                # Recursively check one level deep (for monorepos like find-you-duo)
                # But simplistic approach for now: if no package.json, maybe skip or tag generic
                pass

if __name__ == "__main__":
    main()
