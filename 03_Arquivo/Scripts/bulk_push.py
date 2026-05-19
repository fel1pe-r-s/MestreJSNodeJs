import os
import subprocess

PROJECTS_DIR = "/home/felipe/O mestre/MestreJSNodeJs/01_Projetos"

def bulk_push():
    print("Starting Bulk Push for Sub-Projects...")
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        if not os.path.exists(os.path.join(p_path, ".git")): continue
        
        print(f"[{project}] Pushing...")
        try:
            # git push origin (usually main or master)
            # Find the current branch
            res = subprocess.run(["git", "branch", "--show-current"], cwd=p_path, capture_output=True, text=True)
            branch = res.stdout.strip()
            
            if not branch:
                 print(f"  ⚠️ No current branch? Skipping.")
                 continue
                 
            cmd = ["git", "push", "origin", branch]
            subprocess.run(cmd, cwd=p_path, check=True)
            print(f"  ✅ Pushed {branch} to origin.")
        except subprocess.CalledProcessError as e:
            print(f"  ❌ Error pushing: {e}")
        except Exception as e:
            print(f"  ❌ Unexpected error: {e}")

if __name__ == "__main__":
    bulk_push()
