import { describe, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "__tests__/render";
import usersFixture from "__tests__/fixtures/usersFixture.json";
import UsersListVue from "./UsersList.vue";
import given from "given2";
import axios from "axios";

vi.mock("axios");

given("render", () => {
  render(UsersListVue);
});

describe("UsersList", () => {
  beforeEach(() => vi.resetAllMocks());

  describe("when is loading", () => {
    beforeEach(() =>
      (axios.get as Mock).mockResolvedValue({ data: usersFixture })
    );

    it("renders skeletons", () => {
      given.render;

      expect(screen.getAllByTestId("user-row-skeleton")).toHaveLength(4);
    });
  });

  describe("when has error", () => {
    beforeEach(() => {
      (axios.get as Mock).mockRejectedValue(new Error("error"));
    });

    it("renders error message", async () => {
      given.render;

      await waitFor(() =>
        expect(screen.getByText("Something went wrong")).toBeVisible()
      );
    });
  });

  describe("when has no users", () => {
    beforeEach(() =>
      (axios.get as Mock).mockResolvedValueOnce({ data: { users: [] } })
    );

    it("renders no users found message", async () => {
      given.render;

      await waitFor(() =>
        expect(screen.getByText("No users found!")).toBeVisible()
      );
    });
  });

  describe("when loaded users", () => {
    beforeEach(() =>
      (axios.get as Mock).mockResolvedValueOnce({ data: usersFixture })
    );

    it("renders users list", async () => {
      given.render;

      await waitFor(() =>
        expect(screen.getByText(usersFixture.users[0].name)).toBeVisible()
      );
    });
  });
});
