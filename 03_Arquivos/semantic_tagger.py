import os
import json
import re

ROOT_DIR = "/home/felipe/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")

# DEFINITION OF CONCEPTS AND HEURISTICS
CONCEPTS = {
    # LANGUAGES
    "TypeScript": {"deps": ["typescript"], "ext": [".ts", ".tsx"]},
    "JavaScript": {"ext": [".js", ".jsx"]},
    "Go": {"ext": [".go"]},
    "C": {"ext": [".c", ".h"]},
    "Bun": {"files": ["bun.lockb"], "deps": ["bun-types"]},
    "Node": {"files": ["package.json"], "deps": ["@types/node"]},
    
    # FRAMEWORKS / RUNTIMES
    "React": {"deps": ["react", "react-dom"]},
    "Nextjs": {"deps": ["next"]},
    "Nest-js": {"deps": ["@nestjs/core"], "files": ["nest-cli.json"]},
    "Express": {"deps": ["express"]},
    "Fastify": {"deps": ["fastify"]},
    "Deno": {"files": ["deno.json", "import_map.json"]},
    
    # DATABASE
    "Database": {"deps": ["pg", "mysql", "mongodb", "sqlite3", "mongoose", "typeorm", "prisma", "sequelize"], "folders": ["database", "db", "migrations"]},
    "Prisma": {"deps": ["prisma", "@prisma/client"], "folders": ["prisma"]},
    "Postgresql": {"deps": ["pg"]},
    
    # TESTING
    "Tests": {"ext": [".spec.ts", ".test.ts", ".spec.js", ".test.js"], "folders": ["__tests__", "test"]},
    "cypress": {"deps": ["cypress"], "folders": ["cypress"]},
    "vitest": {"deps": ["vitest"], "files": ["vitest.config.ts"]},
    "jest": {"deps": ["jest"], "files": ["jest.config.js", "jest.config.ts"]},
    
    # ARCHITECTURE & PATTERNS
    "Clean Architecture": {"folders": ["src/domain", "src/application", "src/infra"]},
    "DDD": {"folders": ["domain/entities", "domain/value-objects"]},
    "Patterns": {"files": ["*Repository.ts", "*Factory.ts", "*Adapter.ts", "*Singleton.ts", "*Strategy.ts"]},
    "Monorepo": {"files": ["turbo.json", "lerna.json", "pnpm-workspace.yaml"]},
    
    # AUTH & SECURITY
    "Autenticação&autorização": {"deps": ["jsonwebtoken", "bcrypt", "passport", "next-auth"]},
    "Permissionamento": {"deps": ["casl"], "files": ["permissions.ts", "abilities.ts", "roles.ts"]},
    "JTW": {"deps": ["jsonwebtoken"]},
    "Next-Auth": {"deps": ["next-auth"]},
    
    # LIBS
    "Zod": {"deps": ["zod"]},
    "React-Hook-Form": {"deps": ["react-hook-form"]},
    "Redux": {"deps": ["redux", "@reduxjs/toolkit"]},
    "Tailwind": {"deps": ["tailwindcss"], "files": ["tailwind.config.js", "tailwind.config.ts"]},
    "Docker": {"files": ["Dockerfile", "docker-compose.yml", "docker-compose.yaml"]},
    "GitHub Actions": {"folders": [".github/workflows"]},
    "Git": {"folders": [".git"]},

    # BUSINESS / DOMAIN
    "SaaS": {"files": ["saas.config.ts"], "deps": ["stripe"], "folders": ["subscriptions", "billing"]},
    "Micro SaaS": {"deps": ["stripe", "lemonsqueezy"]},

    # STATIC / OTHER LANGUAGES
    "Html": {"ext": [".html"]},
    "CSS": {"ext": [".css", ".scss", ".sass"]},
    "Python": {"ext": [".py"], "files": ["requirements.txt", "Pipfile"]},
    "Shell": {"ext": [".sh"]},
    "Markdown": {"ext": [".md"]}
}

def scan_project(project_path):
    detected_tags = set()
    package_jsons = []
    
    for root, dirs, files in os.walk(project_path):
        if "node_modules" in dirs: dirs.remove("node_modules")
        if ".git" in dirs: dirs.remove(".git")
        
        rel_root = os.path.relpath(root, project_path)
        
        # 1. Check Folders
        for d in dirs:
            rel_folder = os.path.join(rel_root, d)
            if rel_root == ".": rel_folder = d
            for tag, rules in CONCEPTS.items():
                if "folders" in rules:
                    for req_folder in rules["folders"]:
                        if req_folder in rel_folder:
                            detected_tags.add(tag)

        # 2. Check Files
        for f in files:
            _, ext = os.path.splitext(f)
            if f == "package.json":
                package_jsons.append(os.path.join(root, f))
            for tag, rules in CONCEPTS.items():
                if "ext" in rules:
                    if ext in rules["ext"]: detected_tags.add(tag)
                if "files" in rules:
                    for req_file in rules["files"]:
                        if req_file == f: detected_tags.add(tag)
                        elif req_file.startswith("*") and f.endswith(req_file[1:]): detected_tags.add(tag)

    # 3. Check Dependencies
    all_deps = set()
    for p_json in package_jsons:
        try:
            with open(p_json) as f:
                data = json.load(f)
                deps = list(data.get("dependencies", {}).keys()) + list(data.get("devDependencies", {}).keys())
                all_deps.update(deps)
        except: pass
    
    for tag, rules in CONCEPTS.items():
        if "deps" in rules:
            for req_dep in rules["deps"]:
                for d in all_deps:
                    if req_dep in d: 
                        detected_tags.add(tag)
                        break

    # 4. Keyword Match
    p_name = os.path.basename(project_path).lower()
    if "saas" in p_name: detected_tags.add("SaaS")
    if "rbac" in p_name: detected_tags.add("Permissionamento")
    if "ecommerce" in p_name or "shop" in p_name or "store" in p_name: detected_tags.add("SaaS")

    return list(detected_tags)

def update_markdown(file_path, new_tags):
    if not new_tags: return
    try:
        with open(file_path, "r") as f:
            content = f.read()
        
        existing_tags = []
        lines = content.split('\n')
        tag_line_idx = -1
        
        for i, line in enumerate(lines):
            if line.strip().startswith("**Tags**:") or line.strip().startswith("Tags:"):
                tag_line_idx = i
                parts = line.split(":")
                if len(parts) > 1:
                    raw = parts[1].strip()
                    existing_tags = [t.strip() for t in raw.split(" ") if t.startswith("#")]
                break
        
        updated_tags = set(existing_tags)
        for t in new_tags:
            tag_str = f"#{t.replace(' ', '')}"
            updated_tags.add(tag_str)
            
        final_tag_str = " ".join(sorted(list(updated_tags)))
        
        if tag_line_idx != -1:
            if lines[tag_line_idx].startswith("**Tags**:"):
                lines[tag_line_idx] = f"**Tags**: {final_tag_str}"
            else:
                lines[tag_line_idx] = f"Tags: {final_tag_str}"
        else:
            if len(lines) > 0 and lines[0].startswith("#"):
                 lines.insert(1, f"\n**Tags**: {final_tag_str}")
            else:
                 lines.insert(0, f"**Tags**: {final_tag_str}\n")
        
        with open(file_path, "w") as f:
            f.write("\n".join(lines))
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def update_concept_file(concept, projects):
    concept_files = []
    for root, _, files in os.walk(os.path.join(ROOT_DIR, "02_Areas")):
        for f in files:
            if f.lower() == f"{concept.lower()}.md":
                concept_files.append(os.path.join(root, f))
    
    if not concept_files:
         return

    for concept_file in concept_files:
        try:
            with open(concept_file, 'r') as f:
                content = f.read()
            header = "## 🛠 Projects applying this concept"
            new_links = []
            for p_name in sorted(projects):
                p_path = os.path.join(PROJECTS_DIR, p_name)
                rel_path = os.path.relpath(p_path, os.path.dirname(concept_file))
                link = f"- [{p_name}]({rel_path})"
                new_links.append(link)
            
            block = f"\n\n{header}\n" + "\n".join(new_links) + "\n"
            
            if header in content:
                parts = content.split(header)
                pre = parts[0]
                post = parts[1]
                lines = post.split('\n')
                next_section_idx = -1
                for i, line in enumerate(lines):
                    if line.startswith("#") and i > 0:
                        next_section_idx = i
                        break
                if next_section_idx != -1:
                    rest = "\n".join(lines[next_section_idx:])
                    new_content = pre + header + "\n" + "\n".join(new_links) + "\n" + rest
                else:
                    new_content = pre + header + "\n" + "\n".join(new_links) + "\n"
            else:
                new_content = content + block
                
            with open(concept_file, 'w') as f:
                f.write(new_content)
            print(f"Linked {len(projects)} projects to {os.path.relpath(concept_file, ROOT_DIR)}")
        except Exception as e:
            print(f"Error linking projects to {concept_file}: {e}")

def update_root_readme(all_projects):
    readme_path = os.path.join(ROOT_DIR, "README.md")
    if not os.path.exists(readme_path): return
    try:
        with open(readme_path, 'r') as f:
            content = f.read()
        header = "## 🚀 Projetos (Overview)"
        links = []
        for p in sorted(all_projects):
            links.append(f"- **[{p}](01_Projetos/{p}/)**")
        block = f"\n\n{header}\n" + "\n".join(links) + "\n"
        if header in content:
             parts = content.split(header)
             pre = parts[0]
             post = parts[1]
             lines = post.split('\n')
             next_section_idx = -1
             for i, line in enumerate(lines):
                 if line.startswith("---") or (line.startswith("#") and i > 0):
                     next_section_idx = i
                     break
             if next_section_idx != -1:
                 rest = "\n".join(lines[next_section_idx:])
                 new_content = pre + header + "\n" + "\n".join(links) + "\n" + rest
             else:
                 new_content = pre + header + "\n" + "\n".join(links) + "\n"
        else:
             if "## Metodologia de Uso" in content:
                 parts = content.split("## Metodologia de Uso")
                 new_content = parts[0] + block + "\n## Metodologia de Uso" + parts[1]
             else:
                 new_content = content + block
        with open(readme_path, 'w') as f:
            f.write(new_content)
        print("Root README.md updated with all projects.")
    except Exception as e:
        print(f"Error updating root README: {e}")

def main():
    print("Starting Deep Semantic Tagging (Bidirectional)...")
    concept_map = {k: [] for k in CONCEPTS.keys()}
    all_projects = []
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        all_projects.append(project)
        
        tags = scan_project(p_path)
        if tags:
            readme = os.path.join(p_path, "README.md")
            if os.path.exists(readme):
                update_markdown(readme, tags)
            for t in tags:
                if t not in concept_map: concept_map[t] = []
                concept_map[t].append(project)

    print("Applying Reverse Links (Study Material -> Projects)...")
    for concept, projects in concept_map.items():
        if projects:
            update_concept_file(concept, projects)
    update_root_readme(all_projects)

if __name__ == "__main__":
    main()
