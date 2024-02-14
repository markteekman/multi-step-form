<script setup>
const props = defineProps({
  description: {
    type: String,
    required: true,
    default: 'Online service - Access to mutliplayer games for $1 a month',
  },
  id: {
    type: String,
    required: true,
    default: 'online',
  },
  name: {
    type: String,
    required: true,
    default: 'addon',
  },
  price: {
    type: String,
    required: true,
    default: '+$1/mo',
  },
  title: {
    type: String,
    required: true,
    default: 'Online srevice',
  },
  summary: {
    type: String,
    required: true,
    default: 'Access to mutliplayer games',
  },
})
</script>

<template>
  <label
    class="checkbox-card"
    :for="id"
  >
    <span class="sr-only">{{ description }}</span>
    <span class="checkbox-card__content">
      <input
        type="checkbox"
        :id="id"
        :name="name"
      />
      <div class="checkbox-card__details">
        <span>{{ title }}</span>
        <span>{{ summary }}</span>
      </div>
    </span>
    <div class="checkbox-card__price">
      <span>{{ price }}</span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.checkbox-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  block-size: 80px;
  padding: var(--space-s);
  border: 2px solid var(--neutral-cool-gray);
  border-radius: var(--radius-m);
  transition: all var(--animation-speed-slow) var(--cubic-bezier);
  cursor: pointer;

  &__content {
    display: flex;
    align-items: center;
    gap: var(--space-s);

    span {
      display: block;

      &:first-of-type {
        color: var(--primary-marine-blue);
        font-weight: bold;
      }

      &:last-of-type {
        color: var(--neutral-text-gray);
        font-size: var(--font-size--1);
      }
    }
  }

  &__price {
    justify-self: flex-end;
    color: var(--primary-purplish-blue);
    font-size: var(--font-size--1);
  }
}

input {
  inline-size: 20px;
  block-size: 20px;
  accent-color: var(--primary-purplish-blue);
  transition: all var(--animation-speed-slow) var(--cubic-bezier);
}

label:has(input:checked) {
  background-color: var(--neutral-magnolia);
  border-color: var(--primary-purplish-blue);
}
</style>
