#Portfolio_Docs #Portifolio #solitario
### Código em TypeScript:

```typescript
import axios from 'axios';

interface RepoData {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  tags: string[];
}

async function getReposAndImages(): Promise<RepoData[]> {
  const token = '<your_github_token>';  // Substitua pelo seu token

  // Passo 1: Listar repositórios
  const repos = await axios.get('https://api.github.com/user/repos', {
    headers: { Authorization: `token ${token}` }
  });

  const repoData: RepoData[] = [];

  for (const repo of repos.data) {
    const { id, name: title, description } = repo;

    // Passo 2: Construir a URL da imagem
    const imageUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/preview/image.gif`;

    // Passo 3: Verificar se a imagem existe
    try {
      await axios.get(imageUrl);  // Tenta acessar a imagem
      console.log(`Image found for ${repo.name}`);

      // Passo 4: Obter as tags (tópicos do repositório)
      let tags: string[] = [];
      try {
        const topics = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/topics`, {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.mercy-preview+json'
          }
        });
        tags = topics.data.names; // Tópicos retornam em "names"
      } catch (error) {
        console.log(`No tags found for ${repo.name}`);
      }

      // Passo 5: Adicionar repositório ao array final se a imagem existir
      repoData.push({
        id,
        title,
        description,
        imageUrl, // URL para visualização direta
        tags
      });

    } catch (error) {
      console.log(`No image found for ${repo.name}, skipping...`);
    }
  }

  return repoData;
}

getReposAndImages().then(repos => console.log(repos));
```

### Explicação das mudanças para TypeScript:

1. **Tipagem**:
   - Definimos uma interface `RepoData` que especifica os campos que cada objeto de repositório deve ter, incluindo `id`, `title`, `description`, `imageUrl` e `tags`.
   - Tipamos as variáveis e os retornos das funções de acordo com o TypeScript.

2. **Promessa (`Promise`)**:
   - A função `getReposAndImages` agora retorna uma `Promise<RepoData[]>`, que garante que os dados serão resolvidos corretamente ao final da execução assíncrona.

3. **Tratamento de variáveis**:
   - Variáveis como `description`, que podem ser `null`, são tipadas de forma mais explícita para evitar erros de compilação.

### Por que você precisa de um token?

O token é necessário porque você está fazendo chamadas à API do GitHub para:

1. **Autenticação**: Muitas operações na API exigem que você esteja autenticado. Isso não é apenas para acessar repositórios privados, mas também para evitar limites muito restritos de acesso a dados públicos. Sem autenticação, a API permite apenas um número muito pequeno de requisições por hora (geralmente 60). Com um token de autenticação, esse limite é aumentado significativamente (5000 requisições por hora).
  
2. **Permissões de acesso**: Se você tiver repositórios privados ou precisar acessar informações confidenciais (como tópicos ou conteúdo do repositório), o token garante que você tenha as permissões necessárias.

3. **Identificação**: GitHub usa o token para rastrear a origem das requisições e garantir que o uso da API esteja dentro dos termos de serviço. Isso ajuda a evitar abusos e sobrecargas de sistema.

Para gerar um token, você pode ir em:
- GitHub -> Configurações -> **Developer settings** -> **Personal access tokens**