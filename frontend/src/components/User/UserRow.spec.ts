import { describe } from "vitest";
import { render, screen } from "__tests__/render";
import UserRowVue from "./UserRow.vue";
import given from "given2";

given("user", () => ({
  id: 1,
  name: "Fake user",
  email: "fake@mail.com",
}));

given("render", () => {
  render(UserRowVue, { props: { user: given.user } });
});

describe("UserRow", () => {
  it("renders the name", () => {
    given.render;

    expect(screen.getByText("Fake user")).toBeVisible();
  });

  it("renders the email", () => {
    given.render;

    expect(screen.getByText("fake@mail.com")).toBeVisible();
  });

  it("renders the user avatar", () => {
    given.render;

    expect(screen.getByTestId("avatar")).toHaveAttribute(
      "src",
      "https://gravatar.com/avatar/f1a3598f33091e5c3ca87d79aed66d6c?size=40"
    );
  });
});
