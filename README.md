Saudades da toxicidade do twitter? nosso herói(ou vilão?) DevSincero veio para resolver esse problema! 

## O que é o DevSincero?

DevSincero é um bot da rede [Bluesky](https://bsky.app/) que tem como objetivo satirizar alguns comentários e afirmações um tanto quanto _ignorantes_ que víamos no Twitter.

## Como funciona?
o DevSincero também utiliza um modelo de linguagem para gerar respostas. Atualmente, ele usa o Gemini, mas também há um módulo que utiliza o GROQ, e futuramente haverã mais módulos visando a melhoria da qualidade das respostas.
Além do prompt [prompt.md], é sorteado um tema [themes.ts], onde o bot irá criar o post a partir do dito tema.

## Como rodar o projeto?

Primeiro, você deve criar um arquivo `.env` e preencher as variáveis de ambiente. Você pode copiar o arquivo `.env.example` e preencher com as informações necessárias.

Depois disso, você pode rodar o projeto com o comando:

```bash
npm run dev
```

E voila! O bot deve ter feito um post na sua conta da Bluesky.

## Contribuições

Contribuições são sempre bem-vindas! Aqui estão algumas maneiras de contribuir:
> Cheque a aba de issues para ver se há alguma issue aberta que você possa resolver!
1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nome-da-sua-feature`).
5. Crie um Pull Request.
