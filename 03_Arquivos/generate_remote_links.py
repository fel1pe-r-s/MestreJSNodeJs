import os
import subprocess
import re

ROOT_DIR = "/home/felipe/O mestre/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")

def get_remote_url(project_path):
    try:
        url = subprocess.check_output(
            ["git", "remote", "get-url", "origin"],
            cwd=project_path,
            stderr=subprocess.DEVNULL
        ).decode("utf-8").strip()
        
        # Convert SSH to HTTPS for clickable links if preferred, or keep SSH.
        # GitHub renders SSH links somewhat, but HTTPS is safer for browsers.
        # git@github.com:User/Repo.git -> https://github.com/User/Repo
        if url.startswith("git@github.com:"):
            url = url.replace("git@github.com:", "https://github.com/")
            if url.endswith(".git"):
                url = url[:-4]
        return url
    except:
        return None

def update_root_readme():
    readme_path = os.path.join(ROOT_DIR, "README.md")
    if not os.path.exists(readme_path): return

    with open(readme_path, 'r') as f:
        content = f.read()
    
    # We want to replace the lines in 01_Projetos section.
    # Pattern: * **[ProjectName](01_Projetos/ProjectName/README.md)**...
    
    # It's easier to rebuild the list like semantic_tagger does using the same logic.
    # Let's check which projects are in 01_Projetos.
    
    projects = sorted([d for d in os.listdir(PROJECTS_DIR) if os.path.isdir(os.path.join(PROJECTS_DIR, d))])
    
    new_lines = []
    
    for p in projects:
        p_path = os.path.join(PROJECTS_DIR, p)
        remote = get_remote_url(p_path)
        
        # Base link
        line = f"* **[{p}](01_Projetos/{p}/README.md)**"
        
        if remote:
            line += f" ☁️ [GitHub]({remote})"
        
        new_lines.append(line)
        
    proj_block = "\n".join(new_lines)
    
    # Inject into README
    # 1. 01_Projetos Section
    content = re.sub(
        r"(### \[01_Projetos\].*?\n)(.*?)(\n### \[02_Areas\])",
        r"\1" + proj_block + r"\3",
        content,
        flags=re.DOTALL
    )
    
    # 2. Overview Section
    header = "## 🚀 Projetos (Overview)"
    if header in content:
        overview_lines = []
        for p in projects:
            p_path = os.path.join(PROJECTS_DIR, p)
            remote = get_remote_url(p_path)
            line = f"- **[{p}](01_Projetos/{p}/README.md)**"
            if remote:
                 line += f" ☁️ [Remote]({remote})"
            overview_lines.append(line)
            
        overview_block = f"\n\n{header}\n" + "\n".join(overview_lines) + "\n"
        
        parts = content.split(header)
        pre = parts[0]
        # find end of section
        post = parts[1]
        lines = post.split('\n')
        next_idx = -1
        for i, line in enumerate(lines):
             if line.startswith("---") or (line.startswith("#") and i > 0):
                 next_idx = i
                 break
        if next_idx != -1:
             content = pre + header + "\n" + "\n".join(overview_lines) + "\n" + "\n".join(lines[next_idx:])
        else:
             content = pre + header + "\n" + "\n".join(overview_lines) + "\n"

    with open(readme_path, 'w') as f:
        f.write(content)
    print("Updated README with Remote Links.")

if __name__ == "__main__":
    update_root_readme()
