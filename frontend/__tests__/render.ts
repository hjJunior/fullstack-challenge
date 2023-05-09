import { render } from "@testing-library/vue";
import type { RenderOptions } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import {
  QueryClient,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { ref } from "vue";
import { vi } from "vitest";

const queryClient = new QueryClient({
  logger: ref({
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient: queryClient,
};

const customRender = (
  component: any,
  renderOptions?: Omit<RenderOptions, "global">
) =>
  render(component, {
    ...renderOptions,
    global: {
      plugins: [createTestingPinia(), [VueQueryPlugin, vueQueryOptions]],
    },
  });

export * from "@testing-library/vue";
export { customRender as render };
