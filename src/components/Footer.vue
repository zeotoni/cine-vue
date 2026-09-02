<script lang="ts">
export default {}
</script>

<template>
  <footer
    class="border-t border-white/20 text-white p-4 md:p-6 lg:p-8 flex flex-col gap-2 bg-black/30"
  >
    <div
      class="flex flex-col md:flex-row md:items-start md:justify-between gap-8"
    >
      <div class="flex flex-col gap-2 max-w-sm">
        <p class="text-2xl font-bold tracking-tight">CineVue</p>
        <p class="text-fs-1 font-fw1 text-white/60">
          Discover movies from different regions around the world.
        </p>
      </div>

      <div class="flex flex-col gap-4 md:items-end">
        <nav
          class="flex flex-col sm:flex-row gap-2 sm:gap-6 text-fs-1 font-fw1"
          aria-label="Project links"
        >
          <a
            href="https://github.com/zeotoni/cine-vue"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/80 hover:text-[#E8B04B] transition-colors"
          >
            GitHub Repository
          </a>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/80 hover:text-[#E8B04B] transition-colors"
          >
            TMDB
          </a>
        </nav>

        <p class="text-fs-1 font-fw1 text-white/40 md:text-right max-w-xs">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </div>

    <div class="border-t border-white/10 pt-4">
      <p class="text-fs-1 font-fw1 text-white/40">© 2026 CineVue</p>
    </div>
  </footer>
</template>
