import LoginPage from '../support/pageObjects/LoginPage';
import { faker } from '@faker-js/faker';

describe('Testes E2E - Login', () => {
  let usuarios;
  let mensagens;

  before(() => {
    cy.fixture('usuarios').then((dados) => { usuarios = dados.usuarios; });
    cy.fixture('mensagens').then((dados) => { mensagens = dados.erros; });
  });

  beforeEach(() => {
    LoginPage.acessarPaginaDeLogin();
  });

  it('Deve realizar login com sucesso usando dados válidos', () => {
    cy.allure().startStep('Início do teste: login válido');

    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/home');
    cy.contains('Logout').should('be.visible');

    cy.allure().endStep('passed');
  });

  it('Deve exibir erro ao tentar realizar login com email e senha inválidos', () => {
    cy.allure().startStep('Início do teste: login inválido com email e senha falsos');

    const emailFake = faker.internet.email();
    const senhaFake = faker.internet.password(8);

    LoginPage.preencherEmail(emailFake);
    LoginPage.preencherSenha(senhaFake);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);

    cy.allure().endStep('passed');
  });

  it('Deve exibir erro ao tentar realizar login sem informar email e senha', () => {
    cy.allure().startStep('Início do teste: login sem email e senha');

    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailObrigatorio);
    LoginPage.validarMensagemErro(mensagens.senhaObrigatoria);

    cy.allure().endStep('passed');
  });

  it('Deve exibir erro ao tentar realizar login com email inválido', () => {
    cy.allure().startStep('Início do teste: login com email inválido');

    const emailFake = faker.internet.email();

    LoginPage.preencherEmail(emailFake);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);

    cy.allure().endStep('passed');
  });

  it('Deve exibir erro ao tentar realizar login com senha inválida', () => {
    cy.allure().startStep('Início do teste: login com senha inválida');

    const senhaFake = faker.internet.password(8);

    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(senhaFake);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/login');
    LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);

    cy.allure().endStep('passed');
  });
});
