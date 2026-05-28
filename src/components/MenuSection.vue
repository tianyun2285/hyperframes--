<script setup>
import steakImage from "../assets/dish-steak.png";
import pastaImage from "../assets/dish-pasta.png";
import seafoodImage from "../assets/dish-seafood.png";

const dishes = [
  {
    title: "炭烤安格斯牛排",
    description: "迷迭香、烟熏海盐、烤甜椒，肉汁收得干净利落。",
    price: "¥108",
    image: steakImage,
    alt: "炭烤牛排配烤蔬菜",
  },
  {
    title: "番茄罗勒手工意面",
    description: "慢熬番茄、帕玛森和新鲜罗勒，酸甜明亮。",
    price: "¥88",
    image: pastaImage,
    alt: "番茄罗勒手工意面",
  },
  {
    title: "海港小食拼盘",
    description: "虾、贝、香草面包糠和柠檬，适合两三人分享。",
    price: "¥128",
    image: seafoodImage,
    alt: "海鲜拼盘与柠檬",
  },
];
</script>

<template>
  <section class="menu-section" id="menu" aria-labelledby="menu-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Seasonal Menu</p>
        <h2 id="menu-title">本周精选</h2>
      </div>
      <p class="section-intro">小份可分享，主菜适合一人完整享用。</p>
    </div>
    <div class="dish-grid">
      <article v-for="dish in dishes" :key="dish.title" class="dish-card">
        <img :src="dish.image" :alt="dish.alt" />
        <div>
          <h3>{{ dish.title }}</h3>
          <p>{{ dish.description }}</p>
          <span>{{ dish.price }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
