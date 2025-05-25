describe("Product List", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to product details when a product card is clicked", () => {
    cy.get(".product-card").first().click();
    cy.url().should("include", "/product/");
    cy.get(".product-details-title").should("exist");
  });

  it("allows user to edit and change the product name", () => {
    cy.get(".product-card").first().click();
    cy.url().should("include", "/product/");
    cy.contains("Edit").click();
    cy.get('input[name="name"]').clear().type("New Product Name");
    cy.contains("Save").click();
    cy.contains("New Product Name").should("exist");
  });

  it("allows user to edit and change the product description and number", () => {
    cy.get(".product-card").first().click();
    cy.url().should("include", "/product/");
    cy.contains("Edit").click();
    cy.get('textarea[name="description"]')
      .clear()
      .type("Updated product description");
    cy.get('input[name="number"]').clear().type("smth");
    cy.contains("Save").click();
    cy.contains("Updated product description").should("exist");
    cy.contains("smth").should("exist");
  });

  it("allows user to delete the first product image", () => {
    cy.get(".product-card").first().click();
    cy.url().should("include", "/product/");
    cy.contains("Edit").click();
    cy.get(".product-details-image-wrapper").should(
      "have.length.greaterThan",
      1
    );
    cy.get(".product-details-image-wrapper").first().find("button").click();
    cy.contains("Save").click();
    cy.get(".product-details-image-wrapper").should("have.length.lessThan", 2);
  });

  it("allows user to click Edit and then Cancel without saving changes", () => {
    cy.get(".product-card").first().click();
    cy.url().should("include", "/product/");
    cy.get("h3").first().invoke("text").as("originalName");
    cy.contains("Edit").click();
    cy.get('input[name="name"]').clear().type("Temporary Name");
    cy.contains("Cancel").click();
    cy.get("@originalName").then((originalName) => {
      cy.contains(originalName).should("exist");
    });
  });
});
