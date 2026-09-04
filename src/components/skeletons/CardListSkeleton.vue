<script lang="ts">
export default {}
</script>

<template>
  <section>
    <ul
      class="grid grid-flow-col gap-2 lg:gap-4 auto-cols-[45%] sm:auto-cols-[40%] md:auto-cols-[22%] lg:auto-cols-[18%] xl:auto-cols-[15%] snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
    >
      <li v-for="i in 6" :key="i" class="snap-start">
        <div class="rounded-xl overflow-hidden w-full h-100px">
          <section class="relative aspect-2/3">
            <div class="absolute shimmer"></div>
          </section>

          <div
            class="p-2 flex flex-col h-[110px] lg:h-[140px] justify-between bg-primaryCardBg"
          >
            <div class="relative h-5">
              <h4
                class="text-primaryHeading text-fs-1 font-fw3 line-clamp-2 mb-2"
              >
                Title
                <div class="absolute inset-0 rounded shimmer"></div>
              </h4>
            </div>

            <div class="flex flex-col mt-1 gap-2 text-primaryText relative">
              <div class="relative h-5">
                <span class="text-fs-1"> Date </span>
                <div class="absolute inset-0 rounded shimmer"></div>
              </div>

              <div class="relative h-5">
                <span class="text-fs-1 font-fw2 text-rating flex gap-1">
                  <Star
                    class="w-5 h-5"
                    fill="#FBBF24"
                    color="#FBBF24"
                    aria-hidden="true"
                  />
                  Rate
                  <div class="absolute inset-0 rounded shimmer"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
