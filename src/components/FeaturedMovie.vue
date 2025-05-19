<script lang="ts">
import { Star } from 'lucide-vue-next'
import { Play } from 'lucide-vue-next'
export default {
  components: { Star, Play },
}
</script>

<template>
  <section class="relative w-full overflow-hidden rounded-xl">
    <picture>
      <img
        class="rounded-xl object-cover w-full h-[400px] sm:h-[500px] md:h-[600px]"
        src="https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABZzDupwylH-h0zoEyASxaxb-eXBvlskslcNE-zYTrF4-vtehLHmkb13FL95R8M9mjji5whxBux6iS-fKTRiHju_wAuMgRi7Dwybo.jpg?height=600&width=1400"
        alt="Poster do filme Matrix"
      />
    </picture>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full"
    >
      <div class="flex gap-2 items-center mb-2">
        <span
          class="bg-blue-600 px-2 py-1 rounded-full text-primaryHeading text-fs-1"
          aria-label="Filme em destaque"
          >Featured</span
        >
        <time datetime="1999" class="text-primaryText text-fs-1">1999</time>
      </div>

      <h2 class="text-fs-4 font-fw3 text-primaryHeading mb-2">The Matrix</h2>

      <div class="flex gap-3 items-center mb-4">
        <div class="flex gap-1 items-center">
          <Star
            class="w-5 h-5"
            fill="#FBBF24"
            color="#FBBF24"
            aria-hidden="true"
          />
          <span class="text-fs-1 font-fw2 text-rating">8.7</span>
        </div>

        <span
          class="text-fs-1 font-fw2 text-primaryHeading px-2 py-0.5 bg-white/30 rounded-full"
          >Sci-Fi</span
        >
      </div>
      <p class="text-primaryText text-fs-2 mb-6 max-w-xl leading-relaxed">
        A computer hacker learns from mysterious rebels about the true nature of
        his reality and his role in the war against its controllers.
      </p>
      <a
        href=""
        target="_blank"
        class="flex items-center gap-1 w-fit bg-primaryHeading text-secondaryHeading text-fs-1 rounded px-4 py-2 font-fw3 hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryHeading"
        aria-label="Assistir trailer do filme The Matrix"
      >
        <Play class="w-5 h-5" aria-hidden="true" />
        Watch Trailer</a
      >
    </div>
  </section>
</template>
