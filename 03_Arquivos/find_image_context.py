import os
import glob

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEARCH_DIRS = [
    os.path.join(ROOT_DIR, "02_Areas"),
    os.path.join(ROOT_DIR, "01_Projetos"),
    os.path.join(ROOT_DIR, "00_Entrada")
]

def find_context():
    # Find images
    img_dir = os.path.join(ROOT_DIR, "03_Arquivos")
    images = glob.glob(os.path.join(img_dir, "Pasted image*.png"))
    
    results = {}
    
    for img_path in images:
        img_name = os.path.basename(img_path)
        # Search key: simpler is better, maybe just the timestamp? 
        # "Pasted image 2024..." -> "2024..."
        key = img_name.replace("Pasted image ", "").replace(".png", "")
        
        found = []
        for search_dir in SEARCH_DIRS:
            for root, _, files in os.walk(search_dir):
                for file in files:
                    if file.endswith(".md"):
                        fpath = os.path.join(root, file)
                        try:
                            with open(fpath, 'r') as f:
                                content = f.read()
                                if key in content:
                                    # Find context
                                    lines = content.split('\n')
                                    for i, line in enumerate(lines):
                                        if key in line:
                                            # Grab context
                                            start = max(0, i-2)
                                            end = min(len(lines), i+2)
                                            ctx = lines[start:end]
                                            found.append((fpath, ctx))
                        except: pass
        
        results[img_name] = found

    # Print Report
    for img, findings in results.items():
        print(f"--- {img} ---")
        if not findings:
            print("  (Unused or not found in markdown)")
        for fpath, ctx in findings:
            print(f"  In: {os.path.basename(fpath)}")
            for l in ctx:
                print(f"    {l.strip()}")

if __name__ == "__main__":
    find_context()
