import os
import json

PROJECTS_DIR = "/home/felipe/MestreJSNodeJs/01_Projetos"

DOCKERFILE_NODE = """FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
"""

DOCKERFILE_NEST = """FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
"""

DOCKERFILE_STATIC = """FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
"""

COMPOSE_TEMPLATE = """version: '3'
services:
  app:
    build: .
    ports:
      - "{port}:{internal_port}"
    volumes:
      - .:/app
      - /app/node_modules
"""

def detect_type(package_json):
    deps = package_json.get('dependencies', {})
    if '@nestjs/core' in deps: return "NEST"
    if 'next' in deps: return "NODE" # Next usually needs node runtime unless static export
    if 'react' in deps or 'vite' in deps: return "NODE" # For dev mode mainly
    if 'express' in deps: return "NODE"
    return "NODE" # Default

def create_docker_files(project_path, project_name, port_counter):
    pkg_path = os.path.join(project_path, "package.json")
    
    # Check if Dockerfile exists
    if os.path.exists(os.path.join(project_path, "Dockerfile")):
        print(f"Skipping {project_name} (Dockerfile exists)")
        return port_counter

    if os.path.exists(pkg_path):
        try:
            with open(pkg_path, 'r') as f:
                data = json.load(f)
            
            p_type = detect_type(data)
            
            if p_type == "NEST":
                content = DOCKERFILE_NEST
                internal = 3000
            else:
                content = DOCKERFILE_NODE
                internal = 3000 # Default assumption
                # Check scripts for dev port? Too complex for now.
            
            # Write Dockerfile
            with open(os.path.join(project_path, "Dockerfile"), "w") as f:
                f.write(content)
            
            # Write Compose
            compose_content = COMPOSE_TEMPLATE.format(port=port_counter, internal_port=internal)
            with open(os.path.join(project_path, "docker-compose.yml"), "w") as f:
                f.write(compose_content)
                
            print(f"Dockerized {project_name} (Port {port_counter})")
            return port_counter + 1
            
        except Exception as e:
            print(f"Error on {project_name}: {e}")
            return port_counter
    else:
        # Static website? Check for index.html
        if os.path.exists(os.path.join(project_path, "index.html")):
             with open(os.path.join(project_path, "Dockerfile"), "w") as f:
                f.write(DOCKERFILE_STATIC)
             
             compose_content = """version: '3'
services:
  web:
    build: .
    ports:
      - "{port}:80"
""".format(port=port_counter)
             with open(os.path.join(project_path, "docker-compose.yml"), "w") as f:
                f.write(compose_content)
             print(f"Dockerized Static {project_name} (Port {port_counter})")
             return port_counter + 1
             
    return port_counter

def main():
    start_port = 4000
    current_port = start_port
    
    for project in sorted(os.listdir(PROJECTS_DIR)):
        path = os.path.join(PROJECTS_DIR, project)
        if os.path.isdir(path):
            current_port = create_docker_files(path, project, current_port)

if __name__ == "__main__":
    main()
