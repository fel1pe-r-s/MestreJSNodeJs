import os
import json
import glob

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
    "Autentica\u00e7\u00e3o&autoriza\u00e7\u00e3o": {"deps": ["jsonwebtoken", "bcrypt", "passport", "next-auth"]},
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
    
    # Traverse to find all package.json files (Monorepo support)
    package_jsons = []
    
    for root, dirs, files in os.walk(project_path):
        # Optimization: Skip node_modules and .git
        if "node_modules" in dirs: dirs.remove("node_modules")
        if ".git" in dirs: dirs.remove(".git")
        
        rel_root = os.path.relpath(root, project_path)
        
        # 1. Check Folders (Architecture/Patterns)
        for d in dirs:
            rel_folder = os.path.join(rel_root, d)
            if rel_root == ".": rel_folder = d
            
            for tag, rules in CONCEPTS.items():
                if "folders" in rules:
                    for req_folder in rules["folders"]:
                        if req_folder in rel_folder:
                            detected_tags.add(tag)

        # 2. Check Files (Exts, Filenames, Package.json)
        for f in files:
            _, ext = os.path.splitext(f)
            
            # Map package.json for later check
            if f == "package.json":
                package_jsons.append(os.path.join(root, f))
            
            for tag, rules in CONCEPTS.items():
                if "ext" in rules:
                    if ext in rules["ext"]: detected_tags.add(tag)
                if "files" in rules:
                    for req_file in rules["files"]:
                        if req_file == f: detected_tags.add(tag)
                        elif req_file.startswith("*") and f.endswith(req_file[1:]): detected_tags.add(tag)

    # 3. Check Dependencies (Merged from ALL package.jsons found)
    all_deps = set()
    for p_json in package_jsons:
        try:
            with open(p_json) as f:
                data = json.load(f)
                deps = list(data.get("dependencies", {}).keys()) + list(data.get("devDependencies", {}).keys())
                all_deps.update(deps)
        except: pass
    
    # Heuristics on deps
    for tag, rules in CONCEPTS.items():
        if "deps" in rules:
            for req_dep in rules["deps"]:
                # Check for substring match (e.g. 'react' matches 'react-dom' if lenient, but better exact or known list)
                # Let's do partial match for robustness
                for d in all_deps:
                    if req_dep in d: 
                        detected_tags.add(tag)
                        break

    # 4. Keyword Match in Project Name (Final fallback)
    p_name = os.path.basename(project_path).lower()
    if "saas" in p_name: detected_tags.add("SaaS")
    if "rbac" in p_name: detected_tags.add("Permissionamento")
    if "ecommerce" in p_name or "shop" in p_name or "store" in p_name: detected_tags.add("SaaS") # Generic business

    return list(detected_tags)

def update_markdown(file_path, new_tags):
    if not new_tags: return
    try:
        with open(file_path, "r") as f:
            content = f.read()
        
        existing_tags = []
        lines = content.split('\n')
        tag_line_idx = -1
        
        # Parse existing tags
        for i, line in enumerate(lines):
            if line.strip().startswith("**Tags**:") or line.strip().startswith("Tags:"):
                tag_line_idx = i
                # Extract existing tags
                parts = line.split(":")
                if len(parts) > 1:
                    raw = parts[1].strip()
                    existing_tags = [t.strip() for t in raw.split(" ") if t.startswith("#")]
                break
        
        # Merge tags
        updated_tags = set(existing_tags)
        for t in new_tags:
            tag_str = f"#{t.replace(' ', '')}" # Ensure no spaces in hash tags
            updated_tags.add(tag_str)
            
        final_tag_str = " ".join(sorted(list(updated_tags)))
        
        if tag_line_idx != -1:
            if lines[tag_line_idx].startswith("**Tags**:"):
                lines[tag_line_idx] = f"**Tags**: {final_tag_str}"
            else:
                lines[tag_line_idx] = f"Tags: {final_tag_str}"
        else:
            # Insert new line
            if len(lines) > 0 and lines[0].startswith("#"):
                 lines.insert(1, f"\n**Tags**: {final_tag_str}")
            else:
                 lines.insert(0, f"**Tags**: {final_tag_str}\n")
        
        with open(file_path, "w") as f:
            f.write("\n".join(lines))
        
        # print(f"Updated {os.path.basename(file_path)} with {len(updated_tags)} tags")

    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def update_concept_file(concept, projects):
    """Updates the Concept MD file with a list of projects using it."""
    # 1. Find the file for this concept
    concept_file = None
    for root, _, files in os.walk(os.path.join(ROOT_DIR, "02_Areas")):
        for f in files:
            # Match filename (e.g. "React.md" matches concept "React")
            if f.lower() == f"{concept.lower()}.md":
                concept_file = os.path.join(root, f)
                break
            # Handle variations if needed?
        if concept_file: break
    
    if not concept_file:
         # print(f"Warning: No study note found for concept '{concept}'")
         return

    try:
        with open(concept_file, 'r') as f:
            content = f.read()
            
        # 2. Append/Update "Projects applying this concept" section
        header = "## 🛠 Projects applying this concept"
        
        # Build the list of links
        # Format: - [ProjectName](../../01_Projetos/ProjectName)
        new_links = []
        for p_name in sorted(projects):
            # Calculate relative path from concept file to project dir
            # But simpler: use absolute path or consistent relative path?
            # Obsidian prefers [[Link]] or relative standard links.
            # Let's try standard relative links.
            
            p_path = os.path.join(PROJECTS_DIR, p_name)
            rel_path = os.path.relpath(p_path, os.path.dirname(concept_file))
            
            link = f"- [{p_name}]({rel_path})"
            new_links.append(link)
            
        block = f"\n\n{header}\n" + "\n".join(new_links) + "\n"
        
        if header in content:
            # Replace existing section
            # Heuristic: Find header, read until next header or EOF
            parts = content.split(header)
            pre = parts[0]
            
            # Find start of next section in post
            post = parts[1]
            next_section_idx = -1
            lines = post.split('\n')
            
            # Skip first empty lines
            for i, line in enumerate(lines):
                if line.startswith("#") and i > 0: # Next header
                    next_section_idx = i
                    break
            
            if next_section_idx != -1:
                # Keep the rest
                rest = "\n".join(lines[next_section_idx:])
                new_content = pre + header + "\n" + "\n".join(new_links) + "\n" + rest
            else:
                # EOF
                new_content = pre + header + "\n" + "\n".join(new_links) + "\n"
        else:
            # Append to end
            new_content = content + block
            
        with open(concept_file, 'w') as f:
            f.write(new_content)
        print(f"Linked {len(projects)} projects to {os.path.basename(concept_file)}")
            
    except Exception as e:
        print(f"Error linking projects to {concept}: {e}")

def main():
    print("Starting Deep Semantic Tagging (Bidirectional)...")
    
    # Store reverse map: Concept -> List[ProjectName]
    concept_map = {k: [] for k in CONCEPTS.keys()}
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        # print(f"Scanning {project}...")
        tags = scan_project(p_path)
        
        if tags:
            # 1. Forward Tagging (Project -> Concept)
            readme = os.path.join(p_path, "README.md")
            if os.path.exists(readme):
                update_markdown(readme, tags)
            
            card = os.path.join(ROOT_DIR, "00_Entrada", f"Analise_{project}.md")
            if os.path.exists(card):
                update_markdown(card, tags)
                
            # 2. Collect for Reverse Tagging (Concept -> Project)
            for t in tags:
                if t not in concept_map: concept_map[t] = []
                concept_map[t].append(project)

    # 3. Apply Reverse Linking
    print("Applying Reverse Links (Study Material -> Projects)...")
    for concept, projects in concept_map.items():
        if projects:
            update_concept_file(concept, projects)

if __name__ == "__main__":
    main()
