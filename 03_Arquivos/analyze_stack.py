import os
import json
import re
import collections

ROOT_DIR = "/home/felipe/O mestre/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")
AREAS_DIR = os.path.join(ROOT_DIR, "02_Areas")

stats = {
    "dependencies": collections.Counter(),
    "devDependencies": collections.Counter(),
    "docker_images": collections.Counter(),
    "languages": collections.Counter()
}

def scan_package_json(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
            if 'dependencies' in data:
                stats['dependencies'].update(data['dependencies'].keys())
            if 'devDependencies' in data:
                stats['devDependencies'].update(data['devDependencies'].keys())
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

def scan_dockerfile(filepath):
    try:
        with open(filepath, 'r') as f:
            for line in f:
                if line.strip().upper().startswith("FROM"):
                    parts = line.split()
                    if len(parts) > 1:
                        image = parts[1].split(':')[0] # Remove version
                        stats['docker_images'][image] += 1
    except Exception:
        pass

def scan_directory(directory):
    for root, dirs, files in os.walk(directory):
        if "node_modules" in root or ".git" in root:
            continue
            
        for file in files:
            filepath = os.path.join(root, file)
            
            if file == "package.json":
                scan_package_json(filepath)
            elif file.lower() == "dockerfile":
                scan_dockerfile(filepath)
            elif file.endswith(".ts"):
                stats['languages']['TypeScript'] += 1
            elif file.endswith(".js"):
                stats['languages']['JavaScript'] += 1
            elif file.endswith(".go"):
                stats['languages']['Go'] += 1
            elif file.endswith(".py"):
                stats['languages']['Python'] += 1
            elif file.endswith(".rs"):
                stats['languages']['Rust'] += 1

def generate_report():
    print("# 📊 Relatório de Tecnologias do Ecossistema")
    print("\n## 🔝 Top 10 Dependências (Produção)")
    for dep, count in stats['dependencies'].most_common(10):
        print(f"- {dep}: {count}")

    print("\n## 🛠️ Top 10 Dependências (Desenv)")
    for dep, count in stats['devDependencies'].most_common(10):
        print(f"- {dep}: {count}")
    
    print("\n## 🐳 Imagens Docker Mais Usadas")
    for img, count in stats['docker_images'].most_common(10):
        print(f"- {img}: {count}")

    print("\n## 💻 Linguagens (por arquivos)")
    for lang, count in stats['languages'].most_common():
        print(f"- {lang}: {count}")

if __name__ == "__main__":
    print("🔍 Analisando 01_Projetos e 02_Areas...")
    scan_directory(PROJECTS_DIR)
    scan_directory(AREAS_DIR)
    print("\n" + "="*40 + "\n")
    generate_report()
