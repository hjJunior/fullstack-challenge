import { ref, watch, nextTick } from "vue";
import { useUsers } from "@/stores/users";
import { storeToRefs } from "pinia";
import type AppCardVue from "@/components/Shared/AppCard.vue";

const useScrollToWeatherCard = () => {
  const weatherCardRef = ref<typeof AppCardVue>();
  const { selectedUserId } = storeToRefs(useUsers());

  const scrollToCard = () => {
    if (!weatherCardRef.value) return;
    const el = weatherCardRef.value.$el as HTMLElement;

    el.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  watch(selectedUserId, () => nextTick(scrollToCard));

  return {
    weatherCardRef,
  };
};

export default useScrollToWeatherCard;
