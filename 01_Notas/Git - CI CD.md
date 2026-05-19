#GitGithub

[[GitHub Actions]]
projeto de exemplo [felipersilvarsilva/text-editor](https://github.com/felipersilvarsilva/text-editor)
.github/workflows/workflow.yaml

```yml

name: Continuos Integration

on: pull_request

jobs:
  continuos-integration:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Using Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.
      - name: run install, build and test
        run: |
          npm install
          npm run build 
          npm run test
```