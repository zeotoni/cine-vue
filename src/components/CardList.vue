<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <h4 class="text-fs-3 font-fw3 text-primaryHeading mb-3">{{ title }}</h4>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-x-auto gap-4"
    ></div>
  </section>
</template>
