# Projeto de Testes E2E - Login com Cypress e Allure

## Descrição

Este projeto implementa testes end-to-end (E2E) automatizados para a funcionalidade de login da aplicação [Front Serverest](https://front.serverest.dev) utilizando Cypress. Os testes validam cenários positivos e negativos para garantir a qualidade do fluxo de autenticação.

Além disso, a integração com o Allure Report permite gerar relatórios ricos e detalhados, facilitando a análise dos resultados dos testes.

---

## Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework para testes E2E
- [Allure Report](https://docs.qameta.io/allure/) - Geração de relatórios visuais
- [Faker](https://fakerjs.dev/) - Dados falsos para testes negativos
- Node.js

---

## Estrutura do Projeto

```
cypress/
├── e2e/
│   └── login.cy.js          # Testes E2E de login
├── support/
│   └── e2e.js              # Configuração do suporte Cypress e import do Allure
├── fixtures/
│   ├── usuarios.json       # Dados dos usuários para os testes
│   └── mensagens.json      # Mensagens esperadas nos testes
cypress.config.js           # Configuração do Cypress com plugin Allure
.github/
└── workflows/
    └── cypress.yml         # Workflow GitHub Actions para CI/CD
package.json                # Gerenciador de dependências e scripts
```

---

## Como Executar Localmente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes)

### Instalação

```bash
npm install
```

### Executar os testes

Para executar os testes Cypress com geração de relatório Allure:

```bash
npx cypress run --env allure=true
```

### Gerar e abrir o relatório Allure

Após executar os testes, rode:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## Integração Contínua (CI/CD)

Este projeto inclui um workflow GitHub Actions que executa os testes automaticamente em pushes e pull requests para a branch `main`, gerando e armazenando o relatório Allure como artefato.

---

## Scripts npm Disponíveis

- `npm run test`: Executa os testes Cypress
- `npm run allure:generate`: Gera o relatório Allure
- `npm run allure:open`: Abre o relatório Allure no navegador
- `npm run cy:allure`: Executa testes + gera + abre relatório automaticamente

---

## Boas Práticas Aplicadas

- Uso do Page Object Model para organizar ações na interface
- Dados externos via fixtures para melhor manutenção
- Dados dinâmicos com Faker para testes negativos robustos
- Relatórios detalhados com Allure para análise facilitada
- Pipeline CI/CD para automação completa do fluxo de testes

---