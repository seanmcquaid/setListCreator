describe("Client Profile", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.registerClient();
  });

  beforeEach(() => {
    cy.registerBandleader();

    cy.loginClient();
  });

  afterEach(() => {
    cy.deleteUser("testclient12345");
  });

  afterEach(() => {
    cy.deleteUser("testclient1234");
  });

  afterEach(() => {
    cy.deleteUser("testbandleader1234");
  });
  it("Successfully edited profile redirects to Client Home and edits username", () => {
    cy.get('[href="/client/editProfile"]').should("be.visible").click();

    cy.get('[data-testid="Edit Username HereTextInput"]').should(
      "have.value",
      "testclient1234"
    );

    cy.get('[data-testid="Edit Username HereTextInput"]').type("5");

    cy.get('[data-testid="Edit Username HereTextInput"]').should(
      "have.value",
      "testclient12345"
    );

    cy.get('[data-testid="Edit New Password HereTextInput"]')
      .should("be.visible")
      .type("newpassword");

    cy.get('[data-testid="Edit New Password HereTextInput"]').should(
      "have.value",
      "newpassword"
    );

    cy.get('[data-testid="Confirm New Password HereTextInput"]')
      .should("be.visible")
      .type("newpassword");

    cy.get('[data-testid="Confirm New Password HereTextInput"]').should(
      "have.value",
      "newpassword"
    );

    cy.get('[data-testid="Edit ProfileButton"]').should("be.visible").click();

    cy.contains("Musical Preferences Page").should("be.visible");

    cy.get('[href="/client/editProfile"]').should("be.visible").click();

    cy.get('[data-testid="Edit Username HereTextInput"]').should(
      "have.value",
      "testclient12345"
    );
  });
});
