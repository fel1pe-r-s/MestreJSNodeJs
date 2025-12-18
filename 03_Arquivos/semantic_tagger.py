import os
import json

ROOT_DIR = "/home/felipe/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")
AREAS_DIR = os.path.join(ROOT_DIR, "02_Areas")

def load_concepts():
    """Scans 02_Areas to find concept keywords"""
    concepts = {}
    for root, _, files in os.walk(AREAS_DIR):
        for file in files:
            if file.endswith(".md"):
                # Keyword is the filename without extension (e.g. "Zod", "Nest-js")
                key = file.replace(".md", "")
                # Normalize key for matching (lowercase) -> Real Case
                concepts[key.lower()] = key
    
    # Add manual mappings for common variations
    concepts['react'] = 'React'
    concepts['reactjs'] = 'React'
    concepts['next'] = 'Nextjs'
    concepts['nextjs'] = 'Nextjs'
    concepts['nestjs'] = 'Nest-js'
    concepts['@nestjs/core'] = 'Nest-js'
    concepts['express'] = 'Express'
    concepts['fastify'] = 'Fastify'
    concepts['prisma'] = 'Prisma'
    concepts['zod'] = 'Zod'
    concepts['docker'] = 'Docker'
    concepts['typescript'] = 'TypeScript'
    concepts['tailwindcss'] = 'tailwind' # In pagina statica/tailwind.md
    concepts['vitest'] = 'vitest'
    concepts['jest'] = 'Tests' # Map jest to generic Tests
    concepts['cypress'] = 'cypress'
    
    return concepts

def add_tag(file_path, tags):
    if not tags: return
    
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Tags to add
        new_tags = []
        for tag in tags:
            tag_str = f"#{tag}"
            if tag_str not in content:
                new_tags.append(tag_str)
        
        if not new_tags:
            return

        tag_line = " ".join(new_tags)
        print(f"Adding {tag_line} to {os.path.basename(file_path)}")
        
        # Insert at top or append to existing string?
        # If file starts with # Title, maybe insert after?
        # Or just prepend. Simple is robust.
        # Check if already has tags line?
        
        lines = content.split('\n')
        # Heuristic: Find line starting with **Tags**: or just insert at line 2
        
        modified = False
        for i, line in enumerate(lines):
            if line.strip().startswith("**Tags**:") or line.strip().startswith("Tags:"):
                lines[i] = line.strip() + " " + tag_line
                modified = True
                break
        
        if not modified:
             # Just prepend to the file, after potential title
             if lines[0].startswith("# "):
                 lines.insert(1, f"\n**Tags**: {tag_line}")
             else:
                 lines.insert(0, f"**Tags**: {tag_line}\n")
        
        with open(file_path, 'w') as f:
            f.write("\n".join(lines))
            
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def main():
    concepts = load_concepts()
    
    for project in os.listdir(PROJECTS_DIR):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        # 1. Detect Stack
        detected = set()
        pkg_json = os.path.join(p_path, "package.json")
        
        if os.path.exists(pkg_json):
            try:
                with open(pkg_json) as f:
                    data = json.load(f)
                    deps = {**data.get('dependencies', {}), **data.get('devDependencies', {})}
                    
                    for dep in deps:
                        # Direct match (e.g. "zod")
                        if dep in concepts:
                            detected.add(concepts[dep])
                        # Partial match (e.g. "@nestjs/core" mapped manually)
                        
                        # Heurostics for known libs
                        if 'react' in dep and 'React' not in detected: detected.add('React')
                        if 'redux' in dep: detected.add('redux')
                        if 'date-fns' in dep: detected.add('Date-fns')
                        
            except: pass
        
        # Check for Docker
        if os.path.exists(os.path.join(p_path, "Dockerfile")):
            detected.add("Docker")
            
        # 2. Tag README.md
        readme = os.path.join(p_path, "README.md")
        if os.path.exists(readme):
            add_tag(readme, detected)
            
        # 3. Tag Analysis Card (in 00_Entrada)
        card = os.path.join(ROOT_DIR, "00_Entrada", f"Analise_{project}.md")
        if os.path.exists(card):
            add_tag(card, detected)
            
        # 4. Special manual tags requested by user (Clean Arch)
        # Scan for folder structure clues?
        if os.path.exists(os.path.join(p_path, "src/domain")) or os.path.exists(os.path.join(p_path, "src/core")):
            add_tag(readme, ["Clean Architecture"])
            if os.path.exists(card): add_tag(card, ["Clean Architecture"])


if __name__ == "__main__":
    main()
