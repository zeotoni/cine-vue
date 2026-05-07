<script lang="ts">
import { getCountriesList } from '@/http'
import type CountryData from '@/interfaces/CountryData'
import { regionStore } from '@/store/region'

export default {
  data() {
    return {
      countries: [] as CountryData[],
      regionStore,
    }
  },

  async created() {
    try {
      const countries = await getCountriesList()
      this.countries = countries
    } catch (error) {
      console.error('Erro ao buscar países:', error)
    }
  },
}
</script>

<template>
  <header
    class="sticky flex justify-between items-center p-8 top-0 z-100 bg-gray-900/80 backdrop-blur-sm border-b text-white"
  >
    <h1 class="text-2xl font-bold">CineVue</h1>
    <div class="flex border border-white rounded-md py-1 px-2 cursor-pointer">
      <span
        class="fi mr-2"
        :class="`fi-${regionStore.region.toLowerCase()}`"
      ></span>
      <select
        id="country"
        v-model="regionStore.region"
        translate="no"
        class="text-primaryHeading e outline-none cursor-pointer"
      >
        <option
          v-for="country in countries"
          :key="country.iso_3166_1"
          class="bg-gray-800"
          :value="country.iso_3166_1"
          translate="no"
        >
          {{ country.iso_3166_1 }}
        </option>
      </select>
    </div>
  </header>
</template>
