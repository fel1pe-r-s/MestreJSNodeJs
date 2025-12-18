import os

PROJECTS_DIR = "/home/felipe/MestreJSNodeJs/01_Projetos"

def find_untagged():
    untagged_count = 0
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        readme = os.path.join(p_path, "README.md")
        has_tags = False
        
        if os.path.exists(readme):
            try:
                with open(readme, 'r') as f:
                    content = f.read()
                    if "**Tags**:" in content or "Tags:" in content:
                        has_tags = True
            except: pass
        
        if not has_tags:
            print(f"- {project} (No tags found)")
            untagged_count += 1
            
    if untagged_count == 0:
        print("All projects appear to have tags!")
    else:
        print(f"\nTotal untagged: {untagged_count}")

if __name__ == "__main__":
    find_untagged()
