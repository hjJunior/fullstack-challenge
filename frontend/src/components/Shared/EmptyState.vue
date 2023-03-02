<script setup lang="ts">
import type { FunctionalComponent } from "vue";

defineProps<{
  title: string;
  message: string;
  icon: string | FunctionalComponent;
}>();
</script>

<template>
  <div class="grid place-items-center w-full h-full text-center">
    <div>
      <component :is="icon" class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-semibold text-gray-900">
        {{ title }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
      <slot />
    </div>
  </div>
</template>
