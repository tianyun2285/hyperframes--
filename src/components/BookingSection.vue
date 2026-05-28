<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { submitReservation } from "../services/reservations";

const initialForm = {
  name: "",
  phone: "",
  guests: "2 位",
  date: "",
  time: "",
  note: "",
};

const form = reactive({ ...initialForm });
const errors = reactive({});
const statusMessage = ref("");
const isSubmitting = ref(false);
const isSubmitted = ref(false);
let resetTimer;

const minDate = computed(() => new Date().toISOString().slice(0, 10));
const submitLabel = computed(() => {
  if (isSubmitting.value) {
    return "提交中...";
  }

  return isSubmitted.value ? "已收到预约" : "提交预约";
});

function resetForm() {
  Object.assign(form, initialForm);
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key];
  });
}

function validateForm() {
  clearErrors();

  if (!form.name.trim()) {
    errors.name = "请填写姓名。";
  }

  if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = "请填写有效的手机号。";
  }

  if (!form.date) {
    errors.date = "请选择预约日期。";
  } else if (form.date < minDate.value) {
    errors.date = "预约日期不能早于今天。";
  }

  if (!form.time) {
    errors.time = "请选择预约时间。";
  }

  return Object.keys(errors).length === 0;
}

async function submitBooking() {
  statusMessage.value = "";
  window.clearTimeout(resetTimer);

  if (!validateForm()) {
    statusMessage.value = "请先完善预约信息。";
    return;
  }

  isSubmitting.value = true;
  isSubmitted.value = false;

  try {
    await submitReservation({ ...form });
    isSubmitted.value = true;
    statusMessage.value = "预约已收到，我们会在 10 分钟内电话确认。";
    resetForm();

    resetTimer = window.setTimeout(() => {
      isSubmitted.value = false;
      statusMessage.value = "";
    }, 3200);
  } catch (error) {
    statusMessage.value = error.message || "预约提交失败，请稍后再试。";
  } finally {
    isSubmitting.value = false;
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(resetTimer);
});
</script>

<template>
  <section class="booking-section" id="booking" aria-labelledby="booking-title">
    <div>
      <p class="eyebrow">Reservation</p>
      <h2 id="booking-title">今晚留一张靠窗的桌子</h2>
      <p class="section-intro">
        提交后我们会在 10 分钟内电话确认。如需包间或生日布置，也可以备注说明。
      </p>
    </div>
    <form class="booking-form" @submit.prevent="submitBooking">
      <label>
        姓名
        <input
          v-model="form.name"
          :aria-invalid="Boolean(errors.name)"
          type="text"
          name="name"
          placeholder="例如：林小姐"
        />
        <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
      </label>
      <label>
        联系电话
        <input
          v-model="form.phone"
          :aria-invalid="Boolean(errors.phone)"
          inputmode="tel"
          name="phone"
          placeholder="例如：13800000000"
          type="tel"
        />
        <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
      </label>
      <label>
        人数
        <select v-model="form.guests" name="guests">
          <option>2 位</option>
          <option>3-4 位</option>
          <option>5-6 位</option>
          <option>包间咨询</option>
        </select>
      </label>
      <label>
        日期
        <input
          v-model="form.date"
          :aria-invalid="Boolean(errors.date)"
          :min="minDate"
          type="date"
          name="date"
        />
        <span v-if="errors.date" class="field-error">{{ errors.date }}</span>
      </label>
      <label>
        时间
        <input
          v-model="form.time"
          :aria-invalid="Boolean(errors.time)"
          type="time"
          name="time"
        />
        <span v-if="errors.time" class="field-error">{{ errors.time }}</span>
      </label>
      <label class="full-width">
        备注
        <textarea
          v-model="form.note"
          name="note"
          placeholder="如需包间、生日布置或忌口，可以写在这里"
          rows="4"
        ></textarea>
      </label>
      <button type="submit" :disabled="isSubmitting || isSubmitted">
        {{ submitLabel }}
      </button>
      <p v-if="statusMessage" class="form-status" aria-live="polite">
        {{ statusMessage }}
      </p>
    </form>
  </section>
</template>
