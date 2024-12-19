# Talent Site

## Descrição

Este é um projeto de um site de gestão de vagas, desenvolvido com React e TypeScript. O objetivo deste projeto é fornecer uma base sólida para a construção de aplicações web escaláveis e de fácil manutenção, utilizando boas práticas de design de software.

## Intenção

A intenção deste projeto é servir como um ponto de partida para desenvolvedores que desejam implementar uma aplicação de gestão de vagas. Ele fornece uma estrutura organizada e modular, facilitando a adição de novas funcionalidades e a manutenção do código.

## O que ele se propõe a fazer

Este exemplo de site de gestão de vagas se propõe a:

- Demonstrar a estrutura de um projeto utilizando React e TypeScript.
- Fornecer uma interface para criar, listar e gerenciar vagas de emprego.
- Utilizar boas práticas de desenvolvimento, como hooks personalizados e separação de responsabilidades.

## Arquitetura

A arquitetura do projeto é organizada da seguinte forma:
```sh
src/
    components/
        CreateJobModal.tsx
        FiltersModal.tsx
        JobCard.tsx
    contexts/
        AuthContext.tsx
        SidebarContext.tsx
    hooks/
        Job/
            useCreateJob.ts
            useJobs.ts
    layout/
        components/
            Header.tsx
            Meta.tsx
            Sidebar.tsx
        index.tsx
    pages/
        404.tsx
        Interviews.tsx
        JobVacancyManage.tsx
        Login.tsx
    router/
        routes.tsx
        routings.tsx
    services/
        httpService.ts
    types.ts
    App.tsx
    index.css
    index.tsx
```

- **components**: Contém os componentes reutilizáveis da aplicação.
- **contexts**: Contém os contextos de autenticação e sidebar.
- **hooks**: Contém hooks personalizados para a lógica de negócio.
- **layout**: Contém os componentes de layout da aplicação.
- **pages**: Contém as páginas da aplicação.
- **router**: Contém as rotas da aplicação.
- **services**: Contém os serviços de comunicação com APIs.
- **types.ts**: Contém os tipos TypeScript utilizados na aplicação.

## Bibliotecas Utilizadas

- [axios](https://www.npmjs.com/package/axios): Para fazer requisições HTTP.
- [react](https://www.npmjs.com/package/react): Biblioteca para construção de interfaces de usuário.
- [react-dom](https://www.npmjs.com/package/react-dom): Biblioteca para manipulação do DOM com React.
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): Para gerenciamento de formulários.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): Para gerenciamento de rotas.
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): Para gerenciamento de estado assíncrono.
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): Para estilização da aplicação.

## Como Executar

1. Clone o repositório:
```sh
git clone https://github.com/Framework-System/frwkAiHiring-site
cd frwkAiHiring-site
```

2. Instale as dependências:
```sh
pnpm install
```

3. Configure as variáveis de ambiente no arquivo .env.
4. Inicie o servidor:
```sh
pnpm dev
```

5. Acesse o site em: http://localhost:3000.

## Contribuição

Convidamos todos a colaborar com a evolução deste projeto. Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias. Juntos podemos construir uma base sólida para projetos futuros!

Feito por Framework Digital. 