#Nextjs

Server components e Actions
[[Nextjs]]
[[React]]
[youtube](https://www.youtube.com/watch?v=6JnkwfrAI-U&list=TLPQMjkwOTIwMjQePjCk3uF2kg&index=4)

Server components permitem fazer chamadas http direto no componente sendo ele assíncrono. É renderizado do lado do servidor

# Action

caso de uso exemplo, um formulário normalmente teríamos que  transforma o componente Forms em um use client para executar funções que desparram a partir de uma interação (onSubmit) do usuário, e será hidratada com o JavaScript necessário. Dessa forma usaríamos um State ou react query, para atualiza os dados e mostra em tela caso necessário.

![](Pasted%20image%2020240929183022.png)

### Server Action
 
Para esse componente usaremos a action nativa do html
transformamos a função que faz a chamada http  em uma `use server
quando sua função esta como use server as chamada são como requisição http
![](Pasted%20image%2020240929183536.png)


![](Pasted%20image%2020240929183638.png)
### Server Component
Em caso de queremos atualizar alguma informação em tela com os dados do forms exemplo a lista de tags, la no componente onde fazemos a chamada para lista as tegs damos um tag que nome  a chamada a api
![](Pasted%20image%2020240929184037.png)

e no componente server action pedimos a revalidação da chamada que traz as tags ![](Pasted%20image%2020240929184243.png)

também podemos ter uma tela de carregamento com o hook useFormStatus() do react
![](Pasted%20image%2020240929184546.png)