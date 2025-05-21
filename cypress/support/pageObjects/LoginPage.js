class LoginPage {
  acessarPaginaDeLogin() {
    cy.visit('/login');
  }

  preencherEmail(email) {
    cy.get('input[name="email"]').clear().type(email);
  }

  preencherSenha(senha) {
    cy.get('input[name="password"]').clear().type(senha);
  }

  clicarEmEntrar() {
    cy.get('button[type="submit"]').click();
  }

  validarMensagemErro(mensagemEsperada) {
    cy.contains(mensagemEsperada).should('be.visible');
  }
}

export default new LoginPage();
