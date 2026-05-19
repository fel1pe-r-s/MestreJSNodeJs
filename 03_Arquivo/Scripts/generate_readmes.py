import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")

TEMPLATE = """# {project_name}

## 🔗 Repository Reference
**Internal Path**: `01_Projetos/{project_name}`

> [!NOTE]
> This project is part of the `MestreJSNodeJs` monorepo.

## 🚀 Quick Start
### Docker (Recommended)
This project includes a Docker setup for easy execution.

```bash
# Start the application
docker-compose up
```
*(Check `docker-compose.yml` for specific ports)*

### Manual
If you prefer running locally without Docker:
```bash
npm install
npm run dev
# or
npm run start
```

## 📝 Documentation
*Add specific project documentation here.*
"""

def generate_readmes():
    for project in sorted(os.listdir(PROJECTS_DIR)):
        project_path = os.path.join(PROJECTS_DIR, project)
        if os.path.isdir(project_path):
            readme_path = os.path.join(project_path, "README.md")
            
            # Only create if it doesn't exist to avoid overwriting custom docs
            # OR overwrite if it's empty/small? 
            # User said "quiero que tenha um arquivo de treferencia...".
            # Safest is to append if exists, or create if not. 
            # Or rename old to README_OLD.md?
            # Let's check size.
            
            if os.path.exists(readme_path):
                size = os.path.getsize(readme_path)
                if size > 100: 
                    print(f"Skipping {project} (README exists and > 100 bytes)")
                    # We might want to inject the "Repository Reference" section though.
                    # But simpler is safer.
                    continue
            
            with open(readme_path, "w") as f:
                f.write(TEMPLATE.format(project_name=project))
            print(f"Generated README for {project}")

if __name__ == "__main__":
    generate_readmes()
