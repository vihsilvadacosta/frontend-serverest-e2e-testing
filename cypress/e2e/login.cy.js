import LoginPage from '../support/pageObjects/LoginPage';
import { faker } from '@faker-js/faker';

describe('Testes E2E - Login', () => {
  let usuarios;
  let mensagens;

  const emailFake = faker.internet.email();
  const senhaFake = faker.internet.password(8);

  before(() => {
    cy.fixture('usuarios').then((dados) => { usuarios = dados.usuarios; });
    cy.fixture('mensagens').then((dados) => { mensagens = dados.erros; });
  });

  beforeEach(() => {
    LoginPage.acessarPaginaDeLogin();
  });

  function allureStep(title, testFunc) {
    cy.allure().startStep(title);
    testFunc();
    cy.allure().endStep('passed');
  }

  describe('Cenários Positivos', () => {
    it('Deve realizar login com sucesso usando dados válidos', () => {
      allureStep('Login válido com credenciais corretas', () => {
        LoginPage.preencherEmail(usuarios.validos.email);
        LoginPage.preencherSenha(usuarios.validos.senha);
        LoginPage.clicarEmEntrar();

        cy.url().should('include', '/home');
        cy.contains('Logout').should('be.visible');
      });
    });
  });

  describe('Cenários Negativos', () => {
    it('Deve exibir erro com email e senha inválidos', () => {
      allureStep('Login inválido com email e senha falsos', () => {
        LoginPage.preencherEmail(emailFake);
        LoginPage.preencherSenha(senhaFake);
        LoginPage.clicarEmEntrar();

        cy.url().should('include', '/login');
        LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
      });
    });

    it('Deve exibir erro sem informar email e senha', () => {
      allureStep('Login sem email e senha', () => {
        LoginPage.clicarEmEntrar();

        cy.url().should('include', '/login');
        LoginPage.validarMensagemErro(mensagens.emailObrigatorio);
        LoginPage.validarMensagemErro(mensagens.senhaObrigatoria);
      });
    });

    it('Deve exibir erro com email inválido', () => {
      allureStep('Login com email inválido', () => {
        LoginPage.preencherEmail(emailFake);
        LoginPage.preencherSenha(usuarios.validos.senha);
        LoginPage.clicarEmEntrar();

        cy.url().should('include', '/login');
        LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
      });
    });

    it('Deve exibir erro com senha inválida', () => {
      allureStep('Login com senha inválida', () => {
        LoginPage.preencherEmail(usuarios.validos.email);
        LoginPage.preencherSenha(senhaFake);
        LoginPage.clicarEmEntrar();

        cy.url().should('include', '/login');
        LoginPage.validarMensagemErro(mensagens.emailOuSenhaInvalidos);
      });
    });
  });
});
