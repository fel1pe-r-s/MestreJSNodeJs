import os
import datetime
import re
import subprocess

ROOT_DIR = "/home/felipe/O mestre/MestreJSNodeJs"
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")
AREAS_DIR = os.path.join(ROOT_DIR, "02_Areas")
README_PATH = os.path.join(ROOT_DIR, "README.md")

def get_total_commits():
    try:
        # Get total commits in the current repo
        output = subprocess.check_output(["git", "rev-list", "--count", "HEAD"], cwd=ROOT_DIR).decode().strip()
        return output
    except:
        return "0"

def generate_dashboard():
    # 1. Metrics
    total_projects = len([d for d in os.listdir(PROJECTS_DIR) if os.path.isdir(os.path.join(PROJECTS_DIR, d))])
    
    total_notes = 0
    for root, _, files in os.walk(AREAS_DIR):
        total_notes += len([f for f in files if f.endswith(".md")])
        
    total_commits = get_total_commits()
    last_update = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

    # 2. Gamification / Stats Bar
    # Uses shields.io style or just emoji + text
    dashboard = f"""
<!-- DASHBOARD_START -->
<div align="center">

![Projects](https://img.shields.io/badge/Projetos-{total_projects}-blue?style=for-the-badge&logo=github)
![Notes](https://img.shields.io/badge/Notas_de_Estudo-{total_notes}-green?style=for-the-badge&logo=obsidian)
![Commits](https://img.shields.io/badge/Commits_Totais-{total_commits}-orange?style=for-the-badge&logo=git)
![Last Update](https://img.shields.io/badge/Atualizado_em-{last_update.replace(' ', '_')}-lightgrey?style=for-the-badge)

</div>
<!-- DASHBOARD_END -->
"""
    
    # 3. Inject into README
    if not os.path.exists(README_PATH):
        print("README.md not found.")
        return

    with open(README_PATH, 'r') as f:
        content = f.read()

    # Check if dashboard exists
    if "<!-- DASHBOARD_START -->" in content:
        content = re.sub(
            r"<!-- DASHBOARD_START -->.*?<!-- DASHBOARD_END -->",
            dashboard.strip(),
            content,
            flags=re.DOTALL
        )
    else:
        # Insert after header
        # Assuming header ends at line 3 or so, or looks for "# MestreJSNodeJs..."
        lines = content.split('\n')
        # Insert after the first header
        insert_idx = 0
        for i, line in enumerate(lines):
            if line.startswith("# "):
                insert_idx = i + 1
                break
        
        lines.insert(insert_idx, "\n" + dashboard.strip() + "\n")
        content = "\n".join(lines)

    with open(README_PATH, 'w') as f:
        f.write(content)
    
    print("Dashboard updated successfully.")

if __name__ == "__main__":
    generate_dashboard()
