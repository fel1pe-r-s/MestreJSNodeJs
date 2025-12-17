import os

ROOT_DIR = "/home/felipe/MestreJSNodeJs"
AREAS_DIR = os.path.join(ROOT_DIR, "02_Areas")
PROJECTS_DIR = os.path.join(ROOT_DIR, "01_Projetos")
ENTRADA_DIR = os.path.join(ROOT_DIR, "00_Entrada")

def add_tag_to_file(file_path, tag):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file already has tags (simplistic check for #tag at start)
        if content.strip().startswith("#"):
            # Check if specific tag exists
            if f"#{tag}" in content:
                print(f"Skipping {file_path}, tag #{tag} present.")
                return
            else:
                # Add tag to existing tags? Or just prepend?
                # For simplicity, prepending to the top.
                new_content = f"#{tag} " + content
        else:
            new_content = f"#{tag}\n\n" + content

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added #{tag} to {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_directory(directory, base_tag=None):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                # Determine tag
                if base_tag:
                    tag = base_tag
                else:
                    # Use the immediate parent folder name relative to the category root
                    # e.g. 02_Areas/React/file.md -> React
                    # e.g. 02_Areas/React/hooks/file.md -> React (we want top level area)
                    rel_path = os.path.relpath(root, directory)
                    if rel_path == ".":
                        tag = os.path.basename(directory) # Should not happen usually for Para root
                    else:
                        # Get the first component of the relative path
                        tag = rel_path.split(os.sep)[0]
                        # Clean tag
                        tag = tag.replace(" ", "").replace("&", "_")
                
                add_tag_to_file(os.path.join(root, file), tag)

print("Processing Areas...")
process_directory(AREAS_DIR)

print("Processing Entrada...")
process_directory(ENTRADA_DIR, base_tag="Entrada")

print("Processing Projects...")
# For projects, we want the project name as tag
for project in os.listdir(PROJECTS_DIR):
    project_path = os.path.join(PROJECTS_DIR, project)
    if os.path.isdir(project_path):
        process_directory(project_path, base_tag=project.replace(" ", "").replace("-", "_"))

print("Done.")
