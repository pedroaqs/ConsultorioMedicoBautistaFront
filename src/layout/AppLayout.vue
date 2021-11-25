<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import LayoutDefault from "./LayoutDefault.vue";
export default {
  name: "AppLayout",
  data: () => ({
    layout: LayoutDefault,
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layout/${route.meta.layout}.vue`);
          this.layout = component?.default || LayoutDefault;
        } catch (e) {
          this.layout = LayoutDefault;
        }
      },
    },
  },
};
</script>