import os
import json
import re

ROOT_DIR = "/home/felipe/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")

def get_description_from_readme(readme_path):
    """Attempt to extract a short description from the README."""
    if not os.path.exists(readme_path):
        return None
    try:
        with open(readme_path, 'r') as f:
            content = f.read()
        
        # Match the first paragraph that isn't a header or tags
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if not line: continue
            if line.startswith('#'): continue
            if line.startswith('**Tags**:'): continue
            if line.startswith('![['): continue
            if line.startswith('!['): continue
            
            # If we find a line, take up to 200 characters
            desc = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', line) # Remove markdown links
            return desc[:180] + "..." if len(desc) > 180 else desc
    except:
        pass
    return None

def get_keywords_from_readme(readme_path):
    """Extract tags from the README to use as keywords."""
    if not os.path.exists(readme_path):
        return []
    try:
        with open(readme_path, 'r') as f:
            content = f.read()
        
        # Find Tags line
        match = re.search(r'\*\*Tags\*\*:\s*(.*)', content)
        if match:
            tags_str = match.group(1)
            # Find all words starting with #
            tags = re.findall(r'#(\w+)', tags_str)
            return [t.lower() for t in tags]
    except:
        pass
    return []

def update_package_json():
    print("Updating project metadata in package.json files...")
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        # Find package.json (might be in subfolders for monorepos)
        for root, dirs, files in os.walk(p_path):
            if "node_modules" in dirs: dirs.remove("node_modules")
            if ".git" in dirs: dirs.remove(".git")
            
            if "package.json" in files:
                pkg_path = os.path.join(root, "package.json")
                readme_path = os.path.join(p_path, "README.md") # Always use root README for context
                
                desc = get_description_from_readme(readme_path)
                keywords = get_keywords_from_readme(readme_path)
                
                try:
                    with open(pkg_path, 'r') as f:
                        data = json.load(f)
                    
                    changed = False
                    if desc and (not data.get('description') or 'Next.js project bootstrapped' in data.get('description', '')):
                        data['description'] = desc
                        changed = True
                    
                    if keywords:
                        current_keywords = data.get('keywords', [])
                        if not isinstance(current_keywords, list): current_keywords = []
                        
                        # Merge and de-duplicate
                        new_keywords = list(set(current_keywords + keywords))
                        if len(new_keywords) != len(current_keywords):
                            data['keywords'] = sorted(new_keywords)
                            changed = True
                    
                    if changed:
                        with open(pkg_path, 'w') as f:
                            json.dump(data, f, indent=2)
                        print(f"  ✅ Updated {os.path.relpath(pkg_path, PROJECTS_DIR)}")
                        
                except Exception as e:
                    print(f"  ❌ Error processing {pkg_path}: {e}")

if __name__ == "__main__":
    update_package_json()
