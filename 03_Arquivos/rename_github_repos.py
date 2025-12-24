import os
import subprocess

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PROJECTS_DIR = "/home/felipe/O mestre/MestreJSNodeJs/01_Projetos"

def rename_repos():
    print("Starting GitHub Repository Renaming...")
    print("Ensure you are logged in with 'gh auth login' first!\n")
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        p_path = os.path.join(PROJECTS_DIR, project)
        if not os.path.isdir(p_path): continue
        if not os.path.exists(os.path.join(p_path, ".git")): continue
        
        try:
            # 1. Get current remote
            res = subprocess.run(["git", "remote", "get-url", "origin"], cwd=p_path, capture_output=True, text=True)
            if res.returncode != 0:
                print(f"[{project}] No remote found. Skipping.")
                continue
            
            remote_url = res.stdout.strip()
            # Parse user/repo from URL
            # git@github.com:User/Repo.git or https://github.com/User/Repo.git
            
            if "github.com" not in remote_url:
                print(f"[{project}] Not a GitHub remote ({remote_url}). Skipping.")
                continue
                
            parts = remote_url.replace(".git", "").split("/")
            repo_name = parts[-1]
            user = parts[-2].split(":")[-1] # Handle git@github.com:User case
            
            full_repo = f"{user}/{repo_name}"
            target_name = project # The local folder name (PascalCase)
            
            if repo_name == target_name:
                print(f"[{project}] Already named correctly ({repo_name}).")
                continue
                
            print(f"[{project}] Renaming {full_repo} -> {target_name}...")
            
            # 2. Rename via gh CLI
            # gh repo rename <new-name> --repo <user>/<old-name> --yes
            cmd = ["gh", "repo", "rename", target_name, "--repo", full_repo, "--yes"]
            gh_res = subprocess.run(cmd, capture_output=True, text=True)
            
            if gh_res.returncode == 0:
                print(f"  ✅ Renamed on GitHub!")
                # 3. Update local remote
                # GitHub handles redirects, but let's be clean
                new_url = remote_url.replace(repo_name, target_name)
                subprocess.run(["git", "remote", "set-url", "origin", new_url], cwd=p_path, check=True)
                print(f"  ✅ Updated local remote to {new_url}")
            else:
                print(f"  ❌ Error renaming: {gh_res.stderr.strip()}")
                
        except Exception as e:
            print(f"Error processing {project}: {e}")

if __name__ == "__main__":
    rename_repos()
