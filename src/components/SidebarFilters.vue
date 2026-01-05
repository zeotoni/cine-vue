<script lang="ts">
export default {}
</script>

<template>
  <aside class="p-4 md:p-6 lg-p-8 flex flex-col gap-6">
    <h3 class="text-primaryHeading font-bold text-2xl">Filters</h3>

    <section>
      <label for="title" class="text-primaryHeading mb-2 block">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Type the title of the movie"
        class="text-primaryHeading border border-white rounded-md w-full py-1 px-2 bg-gray-800"
      />
    </section>

    <section>
      <label for="genre" class="text-primaryHeading mb-2 block">Genre</label>

      <div class="grid grid-cols-1">
        <select
          id="genre"
          class="text-primaryHeading border border-white rounded-md w-full py-1 px-2 bg-gray-800 col-start-1 row-start-1 appearance-none"
        >
          <option value="all">All</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          data-slot="icon"
          aria-hidden="true"
          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-primaryHeading sm:size-4"
        >
          <path
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </section>

    <fieldset>
      <legend class="text-primaryHeading mb-2">Release date</legend>

      <div class="flex flex-row gap-2 w-full">
        <label for="fromYear" class="sr-only">From year</label>
        <input
          id="fromYear"
          placeholder="YYYY"
          inputmode="numeric"
          type="text"
          maxlength="4"
          pattern="^(19|20)\d{2}$"
          class="text-primaryHeading border border-white rounded-md w-full py-1 px-2 bg-gray-800"
        />

        <span class="text-primaryHeading" aria-hidden="true">_</span>

        <label for="toYear" class="sr-only">To year</label>
        <input
          id="toYear"
          placeholder="YYYY"
          inputmode="numeric"
          type="text"
          maxlength="4"
          pattern="^(19|20)\d{2}$"
          class="text-primaryHeading border border-white rounded-md w-full py-1 px-2 bg-gray-800"
        />
      </div>
    </fieldset>

    <section>
      <button
        type="button"
        class="text-primaryHeading border w-full py-2 rounded-md hover:bg-primaryText hover:text-secondaryHeading transition-colors duration-300"
      >
        Reset Filters
      </button>
    </section>
  </aside>
</template>
