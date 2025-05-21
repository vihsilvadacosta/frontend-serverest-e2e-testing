class LoginPage {
  acessarPaginaDeLogin() {
    cy.visit('https://front.serverest.dev/login');
  }

  preencherEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
  }

  preencherSenha(senha) {
    cy.get('[data-testid="senha"]').clear().type(senha);
  }

  clicarEmEntrar() {
    cy.get('[data-testid="entrar"]').click();
  }

  validarMensagemErro(mensagem) {
    cy.contains(mensagem).should('be.visible');
  }
}

export default new LoginPage();
