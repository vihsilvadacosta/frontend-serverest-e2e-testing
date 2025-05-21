import LoginPage from '../support/pageObjects/LoginPage';

describe('Testes E2E - Login', () => {
  let usuarios;

  before(() => {
    cy.fixture('usuarios').then((dados) => {
      usuarios = dados.usuarios;
    });
  });

  it('Deve realizar login com sucesso', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/home');
    cy.contains('Logout').should('be.visible');
  });

  it('Deve exibir erro com e-mail e senha inválidos', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(usuarios.invalidos.email);
    LoginPage.preencherSenha(usuarios.invalidos.senha);
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email e/ou senha inválidos');
  });

  it('Deve exibir erro com e-mail inválido', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(usuarios.invalidos.email);
    LoginPage.preencherSenha(usuarios.validos.senha);
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email e/ou senha inválidos');
  });

  it('Deve exibir erro com senha inválida', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(usuarios.validos.email);
    LoginPage.preencherSenha(usuarios.invalidos.senha);
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email e/ou senha inválidos');
  });

  it('Deve exibir erro ao tentar logar sem informar e-mail e senha', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email é obrigatório');
    LoginPage.validarMensagemErro('Password é obrigatório');
  });
});
