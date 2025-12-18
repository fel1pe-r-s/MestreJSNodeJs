import os
import subprocess

PROJECTS_DIR = "/home/felipe/MestreJSNodeJs/01_Projetos"

def bulk_commit():
    print("Starting Bulk Commit for Sub-Projects...")
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        
        # Check if it has a .git folder
        if os.path.exists(os.path.join(p_path, ".git")):
            print(f"[{project}] Committing changes...")
            try:
                # git add .
                subprocess.run(["git", "add", "."], cwd=p_path, check=True)
                
                # git commit
                # Check if there are changes to commit first to avoid empty commit errors
                status = subprocess.run(["git", "status", "--porcelain"], cwd=p_path, capture_output=True, text=True)
                if status.stdout.strip():
                    subprocess.run(["git", "commit", "-m", "chore: update documentation, docker config, and semantic tags"], cwd=p_path, check=True)
                    print(f"[{project}] Committed.")
                else:
                    print(f"[{project}] No changes to commit.")
                    
            except subprocess.CalledProcessError as e:
                print(f"[{project}] Error: {e}")
        else:
            print(f"[{project}] Not a git repository, skipping.")

if __name__ == "__main__":
    bulk_commit()
