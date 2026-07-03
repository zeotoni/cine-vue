<script lang="ts">
import { getCountriesList } from '@/http'
import type CountryData from '@/interfaces/CountryData'
import { regionStore } from '@/store/region'

export default {
  data() {
    return {
      countries: [] as CountryData[],
      regionStore,
      selectedDropdown: '',
      isDropDownOpen: false,
      focusedCountryId: '',
      focusedCountryIndex: -1,
      handleClick: null as null | ((e: MouseEvent) => void),
      handleKeyDown: null as null | ((e: KeyboardEvent) => void),
    }
  },
  watch: {
    isDropDownOpen() {
      document.body.style.overflowY = this.isDropDownOpen ? 'hidden' : 'auto'
    },
  },
  mounted() {
    this.handleClick = (e: MouseEvent) => {
      const select = this.$refs.countrySelect as HTMLDivElement

      if (!select) return

      const target = e.target
      if (!(target instanceof Node)) return

      if (!select.contains(target)) {
        this.isDropDownOpen = false
      }
    }

    this.handleKeyDown = (e: KeyboardEvent) => {
      const select = this.$refs.countrySelect as HTMLDivElement
      const btn_menu = this.$refs.btn_menu as HTMLButtonElement

      if (!select) return
      if (!this.isDropDownOpen) return

      const target = e.target
      if (!(target instanceof Node)) return

      if (e.key === 'Escape') {
        this.isDropDownOpen = false

        if (!btn_menu) return

        btn_menu.focus()
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()

        let prevIndex = this.focusedCountryIndex - 1

        if (prevIndex < 0) {
          prevIndex = this.countries.length - 1
        }

        const li = document.getElementById(this.countries[prevIndex].iso_3166_1)

        if (li) {
          li.focus()
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()

        let nextIndex = this.focusedCountryIndex + 1

        if (nextIndex > this.countries.length - 1) {
          nextIndex = 0
        }

        const li = document.getElementById(this.countries[nextIndex].iso_3166_1)

        if (li) {
          li.focus()
        }
      }
    }

    document.addEventListener('click', this.handleClick)
    document.addEventListener('keydown', this.handleKeyDown)
  },
  unmounted() {
    const select = this.$refs.countrySelect as HTMLDivElement

    if (select && this.handleClick) {
      document.removeEventListener('click', this.handleClick)
    }

    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown)
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
  methods: {
    setSelectedItem(item: string) {
      this.regionStore.region = item
      this.isDropDownOpen = false

      window.scrollTo(0, 0)

      const btn_menu = this.$refs.btn_menu as HTMLButtonElement

      if (!btn_menu) return

      btn_menu.focus()
    },
    async toggleDrop() {
      this.isDropDownOpen = !this.isDropDownOpen

      if (this.isDropDownOpen) {
        await this.$nextTick()
        const selected = this.$el.querySelector('input[type="radio"]:checked')
        const li = this.$el.querySelector('li[aria-selected="true"]')

        if (selected) {
          selected.scrollIntoView({ block: 'center' })
        }

        if (li) {
          li.focus()
        }
      }
    },
  },
}
</script>

<template>
  <header
    class="sticky flex justify-between items-center p-8 top-0 z-10 bg-gray-900/80 backdrop-blur-sm border-b text-white"
  >
    <h1 class="text-2xl font-bold">CineVue</h1>

    <div ref="countrySelect" class="relative">
      <button
        ref="btn_menu"
        class="flex items-center gap-2 py-1 px-2 border rounded-md"
        type="button"
        data-toggle="dropdown"
        :aria-expanded="isDropDownOpen"
        aria-haspopup="listbox"
        @click="toggleDrop"
      >
        <span
          class="fi mr-2"
          :class="`fi-${regionStore.region.toLowerCase()}`"
        ></span>
        {{ regionStore.region }}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          data-slot="icon"
          aria-hidden="true"
          class="-mr-1 size-5 text-primaryHeading"
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </button>

      <ul
        v-if="isDropDownOpen"
        :aria-activedescendant="focusedCountryId"
        role="listbox"
        aria-label="Selecionar país"
        class="bg-gray-800 mt-3 mb-3 border rounded-md p-3 flex flex-col gap-2 fixed top-0 inset-x-0 mx-auto w-[calc(100vw-2rem)] h-[calc(100vh-6rem)] md:absolute md:inset-x-auto md:right-0 md:top-10 md:w-96 overflow-y-scroll"
      >
        <li
          v-for="(country, index) in countries"
          :id="country.iso_3166_1"
          :key="country.iso_3166_1"
          tabindex="0"
          role="option"
          :aria-selected="country.iso_3166_1 === regionStore.region"
          class="border-b cursor-pointer pb-3 pt-3 flex justify-between"
          @focus="
            ((focusedCountryId = country.iso_3166_1),
            (focusedCountryIndex = index))
          "
          @click="setSelectedItem(country.iso_3166_1)"
          @keydown.enter="
            (e) => {
              e.preventDefault()
              setSelectedItem(country.iso_3166_1)
            }
          "
          @keydown.space="
            (e) => {
              e.preventDefault()
              setSelectedItem(country.iso_3166_1)
            }
          "
        >
          <label tabindex="-1" :for="country.english_name">
            {{ country.english_name }}</label
          >
          <input
            :id="`input-${country.iso_3166_1}`"
            v-model="regionStore.region"
            tabindex="-1"
            type="radio"
            name="country"
            :value="country.iso_3166_1"
            class="peer-checked/draft:text-sky-500"
          />
        </li>
      </ul>
    </div>
  </header>
</template>
