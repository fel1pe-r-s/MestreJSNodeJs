import os
import subprocess
import json
import re

# Configuration
GITHUB_USER = "fel1pe-r-s"
PROJECTS_DIR = "/home/felipe/O mestre/MestreJSNodeJs/01_Projetos"
EXCLUDED_REPOS = ["MestreJSNodeJs", "MestreJSNodeJs", "fel1pe-r-s"] # Exclude self/profile

def to_pascal_case(kebab_str):
    """Converts kebab-case or snake_case to PascalCase."""
    # Remove special chars and split
    words = re.split(r'[-_]', kebab_str)
    # Capitalize first letter of each word
    return "".join(w.capitalize() for w in words)

def get_repos():
    """Fetches list of repositories from GitHub CLI."""
    print("Fetching repository list from GitHub...")
    try:
        # Get repos with name, description, and url
        result = subprocess.run(
            ["gh", "repo", "list", GITHUB_USER, "--limit", "100", "--json", "name,sshUrl,description"],
            capture_output=True, text=True, check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error fetching repos: {e}. Make sure 'gh' is installed and authenticated.")
        return []

def clone_and_rename():
    if not os.path.exists(PROJECTS_DIR):
        os.makedirs(PROJECTS_DIR)

    repos = get_repos()
    print(f"Found {len(repos)} repositories.")

    for repo in repos:
        repo_name = repo['name']
        ssh_url = repo['sshUrl']
        
        if repo_name in EXCLUDED_REPOS:
            print(f"Skipping excluded repo: {repo_name}")
            continue

        # Determine target folder name (PascalCase)
        target_name = to_pascal_case(repo_name)
        target_path = os.path.join(PROJECTS_DIR, target_name)
        
        # Check if folder specifically exists (or maybe under the original name?)
        # Let's check for both to avoid duplicates
        original_path = os.path.join(PROJECTS_DIR, repo_name)
        
        if os.path.exists(target_path):
            print(f"[{target_name}] Already exists. Skipping clone.")
            # Optional: git pull?
            continue
        
        if os.path.exists(original_path):
            print(f"[{repo_name}] Exists with old name. Renaming to {target_name}...")
            os.rename(original_path, target_path)
            continue

        print(f"Cloning {repo_name} to {target_name}...")
        try:
            subprocess.run(["git", "clone", ssh_url, target_path], check=True)
            print(f"[{target_name}] Cloned successfully.")
        except subprocess.CalledProcessError as e:
            print(f"Error cloning {repo_name}: {e}")

if __name__ == "__main__":
    clone_and_rename()
