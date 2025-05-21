import LoginPage from '../support/pageObjects/LoginPage';
import { faker } from '@faker-js/faker';

describe('Testes E2E - Login', () => {
  let usuarios;
  let mensagens;

  before(() => {
    // Carrega os dados dos fixtures antes de rodar os testes
    cy.fixture('usuarios').then((dados) => { usuarios = dados.usuarios; });
    cy.fixture('mensagens').then((dados) => { mensagens = dados.erros; });
  });

  beforeEach(() => {
    // Garante que a página de login será visitada antes de cada teste para isolamento
    LoginPage.acessarPaginaDeLogin();
  });

  it('Deve realizar login com sucesso usando dados válidos', () => {
    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/home');
    cy.contains('Logout').should('be.visible');
  });

  it('Deve exibir erro ao tentar realizar login com email e senha inválidos', () => {
    const emailFake = faker.internet.email();
    const senhaFake = faker.internet.password(8);

    LoginPage.preencherEmail(emailFake);
    LoginPage.preencherSenha(senhaFake);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login'); // Garante que permaneceu na página de login
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
  });

  it('Deve exibir erro ao tentar realizar login sem informar email e senha', () => {
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailObrigatorio);
    LoginPage.validarMensagemErro(mensagens.senhaObrigatoria);
  });

  it('Deve exibir erro ao tentar realizar login com email inválido', () => {
    const emailFake = faker.internet.email();

    LoginPage.preencherEmail(emailFake);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
  });

  it('Deve exibir erro ao tentar realizar login com senha inválida', () => {
    const senhaFake = faker.internet.password(8);

    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(senhaFake);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
  });
});
