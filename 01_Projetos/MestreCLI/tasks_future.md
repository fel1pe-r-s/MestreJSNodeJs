# 🛠️ Future Tasks: MestreCLI (Go)

## 1. Docker Nginx Template
**Prompt**: "Update the \`templates/frontend-vite\` scaffold. Add a \`Dockerfile\` that performs a multi-stage build: Stage 1 builds the project with \`pnpm build\`, Stage 2 uses \`nginx:alpine\` to serve the \`dist\` folder. Ensure the Nginx config is optimized for SPAs (fallback to index.html)."

## 2. Fullstack Next.js + Hono Wizard
**Prompt**: "Expand the CLI wizard in \`internal/ui/wizard.go\`. Add an option for 'Fullstack' that when selected, asks if the user wants 'Hono Edge API' integration. If yes, generate the Next.js project with Hono as a custom API handler."
