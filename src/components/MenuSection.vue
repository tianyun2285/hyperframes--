<script setup>
import steakImage from "../assets/dish-steak.png";
import pastaImage from "../assets/dish-pasta.png";
import seafoodImage from "../assets/dish-seafood.png";

const dishes = [
  {
    title: "炭烤安格斯牛排",
    description: "外层炭香焦脆，内里柔嫩多汁，搭配迷迭香和烤甜椒。",
    price: "¥108",
    image: steakImage,
    alt: "炭烤牛排配烤蔬菜",
  },
  {
    title: "番茄罗勒手工意面",
    description: "手工意面裹上慢熬番茄酱，罗勒清香与帕玛森咸香层次分明。",
    price: "¥88",
    image: pastaImage,
    alt: "番茄罗勒手工意面",
  },
  {
    title: "海港小食拼盘",
    description: "鲜虾与贝类现烤上桌，配香草面包糠和柠檬，清爽好分享。",
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
