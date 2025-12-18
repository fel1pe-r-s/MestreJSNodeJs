import os

ROOT_DIR = "/home/felipe/MestreJSNodeJs"
IMG_DIR = os.path.join(ROOT_DIR, "03_Arquivos")
AREAS_DIR = os.path.join(ROOT_DIR, "02_Areas")

# Map: Old Png -> New Name (without extension)
RENAME_MAP = {
    "Pasted image 20240515221516.png": "CleanArch_Diagram",
    "Pasted image 20240516222434.png": "Tests_Example",
    "Pasted image 20240523094713.png": "NextAuth_Repository",
    "Pasted image 20240523120014.png": "NextJS_ServerClient_Components",
    "Pasted image 20240928124840.png": "Container_Deploy_Network",
    "Pasted image 20240928125923.png": "Nginx_Architecture",
    "Pasted image 20240929154642.png": "MicroSaaS_Concept_1",
    "Pasted image 20240929164820.png": "MicroSaaS_Concept_2",
    "Pasted image 20240929183022.png": "ServerActions_Form_Hook",
    "Pasted image 20240929183536.png": "ServerActions_UseCase",
    "Pasted image 20240929183638.png": "ServerComponent_Example",
    "Pasted image 20240929184037.png": "ServerActions_TagRevalidation_1",
    "Pasted image 20240929184243.png": "ServerActions_TagRevalidation_2",
    "Pasted image 20240929184546.png": "UseFormStatus_Loading",
    "Pasted image 20240929185140.png": "Suspense_Example",
    "Pasted image 20241007092303.png": "UseMemo_URL_Preview_1",
    "Pasted image 20241007092342.png": "UseMemo_URL_Preview_2",
    "Pasted image 20241007092434.png": "UseMemo_URL_Preview_3",
    "Pasted image 20241007093448.png": "Mappers_Layer_Conversion",
    "Pasted image 20241007125336.png": "UseEffect_ApiCall",
    "Pasted image 20241007131831.png": "FakerJS_Screenshot",
    "Pasted image 20250423101116.png": "URL_Structure"
}

def rename_images():
    # 1. Rename files
    for old, new_base in RENAME_MAP.items():
        old_path = os.path.join(IMG_DIR, old)
        new_name = f"{new_base}.png"
        new_path = os.path.join(IMG_DIR, new_name)
        
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"Renamed {old} -> {new_name}")
        else:
            print(f"Skipping {old} (not found)")

    # 2. Update References
    # Scan matches 02_Areas, 00_Entrada, etc.
    for root, _, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(".md"):
                fpath = os.path.join(root, file)
                try:
                    with open(fpath, 'r') as f:
                        content = f.read()
                    
                    changed = False
                    for old, new_base in RENAME_MAP.items():
                        new_name = f"{new_base}.png"
                        
                        # Handle spaces in old name (URL encoded or not)
                        # Case A: Pasted image 2024...
                        if old in content:
                            content = content.replace(old, new_name)
                            changed = True
                            
                        # Case B: Pasted%20image%202024...
                        old_enc = old.replace(" ", "%20")
                        # New one should NOT have spaces, so no encoding needed typically
                        if old_enc in content:
                            content = content.replace(old_enc, new_name)
                            changed = True
                            
                    if changed:
                        with open(fpath, 'w') as f:
                            f.write(content)
                        print(f"Updated references in {file}")
                        
                except Exception as e:
                     print(f"Error processing {file}: {e}")

if __name__ == "__main__":
    rename_images()
