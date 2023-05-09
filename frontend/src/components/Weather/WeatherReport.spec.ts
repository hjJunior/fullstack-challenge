import given from "given2";
import { describe } from "vitest";
import { render, screen, waitFor } from "__tests__/render";
import WeatherReportVue from "./WeatherReport.vue";
import userEvent from "@testing-library/user-event";

given("temp", () => 0);
given("temp_min", () => -10);
given("temp_max", () => 10);
given("description", () => "few clouds");
given("humidity", () => "29");
given("windSpeed", () => 5.68);

given("weather", () => ({
  data: {
    main: {
      temp: given.temp,
      temp_min: given.temp_min,
      temp_max: given.temp_max,
      humidity: given.humidity,
    },
    wind: {
      speed: given.windSpeed,
    },
    weather: [
      {
        icon: "02d",
        description: given.description,
      },
    ],
  },
}));

given("render", () => {
  render(WeatherReportVue, { props: { weather: given.weather } });
});

describe("WeatherReport", () => {
  it("renders the correctly data", () => {
    given.render;

    expect(screen.getByTestId("temp")).toHaveTextContent("0");
    expect(screen.getByText("Min: -10 °C")).toBeVisible();
    expect(screen.getByText("Max: 10 °C")).toBeVisible();
    expect(screen.getByText("Humidity: 29%")).toBeVisible();
    expect(screen.getByText("Wind: 5.68 mph")).toBeVisible();
  });

  it("renders the icon", () => {
    given.render;

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `http://openweathermap.org/img/wn/02d@2x.png`
    );
  });

  describe("when change to fahrenheit", () => {
    it("renders the temperatures in fahrenheit", async () => {
      given.render;

      userEvent.click(screen.getByRole("button", { name: "°F" }));

      await waitFor(() =>
        expect(screen.getByTestId("temp")).toHaveTextContent("32")
      );

      expect(screen.getByText("Min: 14 °F")).toBeVisible();
      expect(screen.getByText("Max: 50 °F")).toBeVisible();
    });
  });
});
