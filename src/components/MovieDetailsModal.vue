<script lang="ts">
import { Star } from 'lucide-vue-next'
export default {
  components: { Star },
}
</script>

<template>
  <dialog open class="m-auto w-[80%] overflow-hidden rounded-xl">
    <picture>
      <img
        class="object-cover w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl"
        src="../assets/images/no-poster.png"
        alt="Imagem do filme"
      />
    </picture>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full"
    >
      <h2 class="text-fs-4 font-fw3 text-primaryHeading mb-2">The GodFather</h2>

      <time datetime="1999" class="text-primaryText text-fs-1 mb-2">1999</time>

      <div class="flex flex-wrap gap-3 items-center mb-4">
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
          >Drama</span
        >
      </div>
      <p
        class="text-primaryText text-fs-2 max-w-3xl leading-relaxed line-clamp-4 overflow-y-auto scrollbar-hide md:line-clamp-none [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque
        explicabo omnis, at neque animi hic praesentium facilis adipisci aliquid
        suscipit maiores molestiae dolore obcaecati dolores necessitatibus
        maxime. Facilis, hic.
      </p>
    </div>
  </dialog>
</template>
