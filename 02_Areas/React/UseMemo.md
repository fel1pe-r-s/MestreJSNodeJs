#React

[[React]]
O useMemo memoriza uma variável, para que ela não seja recriada sempre que o componente seja recarregado, usado para quando temos valores em memoria que não queremos que fiquem sendo alterados, exemplo

Criando Url preview queremos que a url seja gerada mas para ela não ser gerada sempre que o componente carrega, vamos usa o useMemo para memoriza, e podemos dizer passa uma variável como condição de monitoramento para que a função dentro do useMemo seja então reprocessada criando uma nova Url preview.

exemplo queremos cria a url somente quando uma imagem for carregada, basta passa a variável do estado onde esta sendo carregada a imagem, e quando ela for alterada, ai geraremos uma url preview, caso não tenha alterações o useMemo manterá o valor da urlPreview mesmo que o componente seja recarregado.

![](UseMemo_URL_Preview_1.png)
![](UseMemo_URL_Preview_2.png)

![](UseMemo_URL_Preview_3.png)
