#React

[Doc]((https://tanstack.com/query/latest/docs/framework/react/overview)
@tanstack/react-query

É usado para fazer requisição, onde ele cria um cache evitando request desnecessário

para fazer uma requisição usando o react-query chamamos o hook useQuery
nele passamos alguns dados como propriedades 
- queryKey => é o nome para a query ela serve para caso eu tenha que fazer essa mesma requisição em outro component, o react-query vera que os nome são o mesmo e vai verifica o cache para ter certeza se é necessário refazer ou não essa requisição.
- queryFn => recebe a função que vai executar o request fazendo o fatch na api.

obs: as Query deve ser feita dentro do component react

```javascript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
```

