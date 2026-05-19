import os
import json
import re

ROOT_DIR = "/home/felipe/O mestre/MestreJSNodeJs"
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

def generate_areas_tree(base_path, rel_path=""):
    """Recursively build a markdown tree for 02_Areas."""
    tree = []
    full_path = os.path.join(base_path, rel_path)
    
    # Get immediate children
    items = sorted(os.listdir(full_path))
    
    # Files first, then folders? Or just mixed?
    # Let's do: list files in this folder, then subfolders.
    files = [f for f in items if os.path.isfile(os.path.join(full_path, f)) and f.endswith(".md")]
    dirs = [d for d in items if os.path.isdir(os.path.join(full_path, d)) and not d.startswith(".")]
    
    for f in files:
        name = f.replace(".md", "")
        path = os.path.join("02_Areas", rel_path, f)
        tree.append(f"- [{name}]({path})")
        
    for d in dirs:
        sub_rel = os.path.join(rel_path, d)
        sub_tree = generate_areas_tree(base_path, sub_rel)
        if sub_tree:
            tree.append(f"- **{d}**")
            for line in sub_tree:
                tree.append(f"    {line}")
                
    return tree

def update_root_readme(all_projects):
    """Updates the root README.md with direct file links for Projects and Areas."""
    readme_path = os.path.join(ROOT_DIR, "README.md")
    if not os.path.exists(readme_path): return
    
    try:
        with open(readme_path, 'r') as f:
            content = f.read()
            
        # 1. Update 01_Projetos Section
        proj_lines = []
        for p in sorted(all_projects):
            proj_lines.append(f"* **[{p}](01_Projetos/{p}/README.md)**")
        proj_block = "\n".join(proj_lines)
        
        # Regex replacement to find the section and swap content
        content = re.sub(
            r"(### \[01_Projetos\].*?\n)(.*?)(\n### \[02_Areas\])",
            r"\1" + proj_block + r"\3",
            content,
            flags=re.DOTALL
        )
        
        # 2. Update 02_Areas Section
        areas_base = os.path.join(ROOT_DIR, "02_Areas")
        areas_tree = generate_areas_tree(areas_base)
        areas_block = "\n".join(areas_tree)
        
        content = re.sub(
            r"(### \[02_Areas\].*?\n)(.*?)(\n### \[03_Arquivos\])",
            r"\1" + areas_block + r"\3",
            content,
            flags=re.DOTALL
        )
        
        # 3. Handle the Overview at the bottom (if exists)
        header = "## 🚀 Projetos (Overview)"
        if header in content:
            overview_links = [f"- **[{p}](01_Projetos/{p}/README.md)**" for p in sorted(all_projects)]
            overview_block = f"\n\n{header}\n" + "\n".join(overview_links) + "\n"
            
            parts = content.split(header)
            pre = parts[0]
            rest = parts[1]
            lines = rest.split('\n')
            next_idx = -1
            for i, line in enumerate(lines):
                if line.startswith("---") or (line.startswith("#") and i > 0):
                    next_idx = i
                    break
            if next_idx != -1:
                content = pre + header + "\n" + "\n".join(overview_links) + "\n" + "\n".join(lines[next_idx:])
            else:
                content = pre + header + "\n" + "\n".join(overview_links) + "\n"

        with open(readme_path, 'w') as f:
            f.write(content)
        print("Root README.md synchronized with direct file links.")
        
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
