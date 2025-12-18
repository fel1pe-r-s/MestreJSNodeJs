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
    "JTW": {"deps": ["jsonwebtoken"]},
    "Next-Auth": {"deps": ["next-auth"]},
    
    # LIBS
    "Zod": {"deps": ["zod"]},
    "React-Hook-Form": {"deps": ["react-hook-form"]},
    "Redux": {"deps": ["redux", "@reduxjs/toolkit"]},
    "Tailwind": {"deps": ["tailwindcss"], "files": ["tailwind.config.js", "tailwind.config.ts"]},
    "Docker": {"files": ["Dockerfile", "docker-compose.yml", "docker-compose.yaml"]},
    "GitHub Actions": {"folders": [".github/workflows"]},
    "Git": {"folders": [".git"]}
}

def scan_project(project_path):
    detected_tags = set()
    
    # cache file list for speed
    all_files = []
    for root, dirs, files in os.walk(project_path):
        # Skip node_modules for file searching to save time/noise
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        if ".git" in dirs:
            dirs.remove(".git")
            
        rel_root = os.path.relpath(root, project_path)
        
        # Check Folders
        for d in dirs:
            rel_folder = os.path.join(rel_root, d)
            if rel_root == ".": rel_folder = d
            
            # Simple check: does any concept require this folder?
            for tag, rules in CONCEPTS.items():
                if "folders" in rules:
                    for req_folder in rules["folders"]:
                        if req_folder in rel_folder: # Partial match e.g. src/domain matched by src/domain
                            detected_tags.add(tag)

        # Check Files and Extensions
        for f in files:
            all_files.append(f)
            _, ext = os.path.splitext(f)
            
            for tag, rules in CONCEPTS.items():
                # Check Extensions
                if "ext" in rules:
                    if ext in rules["ext"]:
                        detected_tags.add(tag)
                
                # Check Filenames (Glob-ish)
                if "files" in rules:
                    for req_file in rules["files"]:
                        if req_file == f: # Exact match
                            detected_tags.add(tag)
                        elif req_file.startswith("*") and f.endswith(req_file[1:]): # Suffix match
                            detected_tags.add(tag)

    # Check Dependencies (package.json)
    pkg_path = os.path.join(project_path, "package.json")
    if os.path.exists(pkg_path):
        try:
            with open(pkg_path) as f:
                data = json.load(f)
                deps = list(data.get("dependencies", {}).keys()) + list(data.get("devDependencies", {}).keys())
                
                for tag, rules in CONCEPTS.items():
                    if "deps" in rules:
                        for req_dep in rules["deps"]:
                            if any(req_dep in d for d in deps): # Substring match for scoped pkgs
                                detected_tags.add(tag)
        except: pass

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
        
        print(f"Updated {os.path.basename(file_path)} with {len(updated_tags)} tags")

    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def main():
    print("Starting Deep Semantic Tagging...")
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        print(f"Scanning {project}...")
        tags = scan_project(p_path)
        
        if tags:
            # Update README
            readme = os.path.join(p_path, "README.md")
            if os.path.exists(readme):
                update_markdown(readme, tags)
            
            # Update Analysis Card
            card = os.path.join(ROOT_DIR, "00_Entrada", f"Analise_{project}.md")
            if os.path.exists(card):
                update_markdown(card, tags)

if __name__ == "__main__":
    main()
