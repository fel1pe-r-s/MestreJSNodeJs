import os
import subprocess
import json
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")
REPORT_FILE = "/home/felipe/MestreJSNodeJs/00_Entrada/Security_Report.md"

def run_command(command, cwd):
    try:
        result = subprocess.run(
            command, 
            cwd=cwd, 
            shell=True, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True,
            timeout=30 # Timeout per project to avoid hanging
        )
        return result.stdout, result.returncode
    except subprocess.TimeoutExpired:
        return "Timeout", -1
    except Exception as e:
        return str(e), -1

def check_project(project_path, project_name):
    print(f"Checking {project_name}...")
    
    report_section = f"\n## {project_name}\n"
    has_lock = os.path.exists(os.path.join(project_path, "package-lock.json"))
    has_pkg = os.path.exists(os.path.join(project_path, "package.json"))

    if not has_pkg:
        return ""

    # Check Security (Audit)
    if has_lock:
        stdout, code = run_command("npm audit --audit-level=high --json", project_path)
        try:
            audit_data = json.loads(stdout)
            vulns = audit_data.get('metadata', {}).get('vulnerabilities', {})
            total_vulns = sum(vulns.values())
            
            if total_vulns > 0:
                report_section += f"- 🔴 **Security**: Found {total_vulns} vulnerabilities (High: {vulns.get('high', 0)}, Critical: {vulns.get('critical', 0)}).\n"
            else:
                report_section += "- 🟢 **Security**: Clean.\n"
        except json.JSONDecodeError:
             report_section += "- ⚪ **Security**: Could not parse audit output or npm error.\n"
    else:
        report_section += "- ⚪ **Security**: Skipped (No package-lock.json).\n"

    # Check Outdated (Optional - can be slow, enabling simplistic check)
    # logic: only check if node_modules exists, otherwise npm outdated fails/hightraffic
    if os.path.exists(os.path.join(project_path, "node_modules")):
        stdout, code = run_command("npm outdated --json", project_path)
        try:
            outdated = json.loads(stdout)
            count = len(outdated)
            if count > 0:
                report_section += f"- 🟠 **Outdated**: {count} packages can be updated.\n"
                # List top 5
                keys = list(outdated.keys())[:5]
                for k in keys:
                    curr = outdated[k].get('current', '?')
                    latest = outdated[k].get('latest', '?')
                    report_section += f"  - `{k}`: {curr} -> {latest}\n"
            else:
                report_section += "- 🟢 **Dependencies**: Up to date.\n"
        except:
             report_section += "- ⚪ **Outdated**: Check failed.\n"
    else:
        report_section += "- ⚪ **Dependencies**: Skipped (No node_modules).\n"

    return report_section

def main():
    report = f"# Relatório de Segurança e Dependências\n**Data**: {datetime.now().isoformat()}\n\n"
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        path = os.path.join(PROJECTS_DIR, project)
        if os.path.isdir(path):
            # Check root of project
            res = check_project(path, project)
            if res: report += res
            
            # Check subfolders (for mono-repos or organized folders)
            # Simple check: max depth 1
            for sub in os.listdir(path):
                subpath = os.path.join(path, sub)
                if os.path.isdir(subpath) and os.path.exists(os.path.join(subpath, "package.json")):
                    res = check_project(subpath, f"{project}/{sub}")
                    if res: report += res

    with open(REPORT_FILE, "w") as f:
        f.write(report)
    print(f"Report saved to {REPORT_FILE}")

if __name__ == "__main__":
    main()
