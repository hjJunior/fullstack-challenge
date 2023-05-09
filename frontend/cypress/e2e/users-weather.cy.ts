describe("users weather", () => {
  describe("when api is up", () => {
    beforeEach(() => {
      cy.intercept("http://localhost/users", { fixture: "usersFixture.json" });
    });
    beforeEach(() => cy.visit("/"));

    it("can filter users", () => {
      cy.get("input").type("Bradtke");

      cy.contains("Dr. Newell Bradtke DVM");
      cy.contains("ivy.kunze@example.net");

      cy.get("input").clear().type("----------");
      cy.contains("No users found!");
      cy.get("input").clear();

      cy.contains("Dr. Newell Bradtke DVM");
      cy.contains("ivy.kunze@example.net");
    });

    it("can view weather data", () => {
      cy.contains("No user selected!");

      cy.contains("Dr. Newell Bradtke DVM").click();
      cy.contains("overcast clouds");
      cy.contains("Min: 81.16 °C");
      cy.contains("Max: 87.08 °C");
      cy.contains("Humidity: 75%");
      cy.contains("Wind: 9.91 mph");
    });

    it("can view weather in fahrenheit", () => {
      cy.contains("Dr. Newell Bradtke DVM").click();

      cy.contains("button", "°F").click();
      cy.contains("183");
      cy.contains("Min: 178 °F");
      cy.contains("Max: 188.8 °F");
    });
  });

  describe("when api down", () => {
    beforeEach(() => {
      cy.intercept("http://localhost/users", {
        body: "Fatal error",
        statusCode: 500,
      }).as("getUsers");
    });
    beforeEach(() => cy.visit("/"));

    it("shows error message", () => {
      // retry 4 times
      cy.wait("@getUsers");
      cy.wait("@getUsers");
      cy.wait("@getUsers");
      cy.wait("@getUsers");

      cy.contains("Something went wrong");
    });
  });
});
