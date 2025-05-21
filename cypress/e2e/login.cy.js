import LoginPage from '../support/pageObjects/LoginPage';

describe('Testes E2E - Login', () => {
  const emailValido = 'fulano@qa.com';
  const senhaValida = 'teste';
  const emailInvalido = 'invalido@teste.com';
  const senhaInvalida = 'errada';

  it('Deve realizar login com sucesso', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(emailValido);
    LoginPage.preencherSenha(senhaValida);
    LoginPage.clicarEmEntrar();

    cy.url().should('include', '/home');
    cy.contains('Logout').should('be.visible');
  });

  it('Deve exibir erro com e-mail e senha inválidos', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(emailInvalido);
    LoginPage.preencherSenha(senhaInvalida);
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email e/ou senha inválidos');
  });

  it('Deve exibir erro com e-mail inválido', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(emailInvalido);
    LoginPage.preencherSenha(senhaValida);
    LoginPage.clicarEmEntrar();

    LoginPage.validarMensagemErro('Email e/ou senha inválidos');
  });

  it('Deve exibir erro com senha inválida', () => {
    LoginPage.acessarPaginaDeLogin();
    LoginPage.preencherEmail(emailValido);
    LoginPage.preencherSenha(senhaInvalida);
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
