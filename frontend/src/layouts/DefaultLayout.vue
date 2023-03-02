<script setup lang="ts">
import AppLogo from "@/components/Icons/AppLogo.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { useGlobalSearch } from "@/stores/globalSearch";
import { storeToRefs } from "pinia";
import GithubIcon from "@/components/Icons/GithubIcon.vue";

const { search } = storeToRefs(useGlobalSearch());
</script>

<template>
  <div class="min-h-full">
    <header class="bg-gray-600 pb-24">
      <div class="max-w-lg mx-auto">
        <div class="flex items-center gap-2 p-2">
          <AppLogo class="h-6 hidden md:flex" />
          <div class="relative text-white focus-within:text-gray-600 flex-1">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              class="w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500"
              placeholder="Search user"
              type="search"
              v-model="search"
            />
          </div>
          <a
            href="https://github.com/hjJunior/fullstack-challenge"
            target="_blank"
            class="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <GithubIcon class="block h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
    <main class="-mt-20 max-w-5xl mx-auto">
      <slot />
    </main>
  </div>
</template>
