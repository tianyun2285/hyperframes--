<script setup>
const hours = [
  {
    label: "周一至周五",
    value: "11:30 - 14:00 / 17:30 - 22:00",
  },
  {
    label: "周末",
    value: "11:00 - 22:30",
  },
  {
    label: "地址",
    value: "上海市黄浦区桐梓路 18 号",
  },
];
</script>

<template>
  <section class="story-section" id="story" aria-labelledby="story-title">
    <div class="story-copy">
      <p class="eyebrow">Our Table</p>
      <h2 id="story-title">把节气端上餐桌</h2>
      <p>
        每天挑选当季食材，用炭火和慢炖做出像家里饭桌一样温暖的味道，让你坐下来就能慢慢放松。
      </p>
    </div>
    <div class="hours-panel" aria-label="营业信息">
      <h3>营业时间</h3>
      <dl>
        <div v-for="item in hours" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
