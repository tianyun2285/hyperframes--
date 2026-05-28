<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import MenuSection from "./components/MenuSection.vue";
import StorySection from "./components/StorySection.vue";
import BookingSection from "./components/BookingSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <MenuSection />
    <StorySection />
    <BookingSection />
  </main>
  <SiteFooter />
</template>
