import given from "given2";
import { describe, vi } from "vitest";
import { ref } from "vue";
import { render, screen, waitFor } from "__tests__/render";
import WeatherCardContentVue from "./WeatherCardContent.vue";
import usersFixture from "__tests__/fixtures/usersFixture.json";
import { useUsers } from "@/stores/users";

vi.mock("@/composable/api/useUsersFetch", () => ({
  default: () => ({
    users: ref(usersFixture.users),
    isLoading: ref(false),
    isError: ref(false),
  }),
}));

given("render", () => {
  render(WeatherCardContentVue);
});

describe("WeatherCardContent", () => {
  describe("when no user selected", () => {
    it("renders message asking to select a user", () => {
      given.render;

      expect(screen.getByText("No user selected!")).toBeVisible();
    });
  });

  describe("when user have no weather data", () => {
    it("renders message no weather data", async () => {
      given.render;

      const store = useUsers();
      // @ts-expect-error: Getter is read only
      store.selectedUser = { last_weather: null };
      // @ts-expect-error: Getter is read only
      store.$patch();

      await waitFor(() =>
        expect(screen.getByText("No weather data")).toBeVisible()
      );
    });
  });

  describe("when user have weather data", () => {
    it("renders weather report", async () => {
      given.render;

      const store = useUsers();
      // @ts-expect-error: Getter is read only
      store.$patch({ selectedUserId: usersFixture.users[0].id });

      await waitFor(() =>
        expect(screen.getByTestId("weather-report")).toBeVisible()
      );
    });
  });
});
