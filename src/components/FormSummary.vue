<template>
  <div class="form-summary">
    <div class="form-summary__receipt">
      <div class="form-summary__plan">
        <p>
          Arcade (Monthly) <span><a href="#">Change</a></span>
        </p>
        <p>$9/mo</p>
      </div>
      <div class="form-summary__addons">
        <div class="form-summary__addon">
          <p>Online service</p>
          <p>+$1/mo</p>
        </div>
        <div class="form-summary__addon">
          <p>Larger storage</p>
          <p>+$2/mo</p>
        </div>
      </div>
    </div>
    <div class="form-summary__total">
      <p>Total (per month)</p>
      <p>$12/mo</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  &__plan,
  &__addon,
  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__addons,
  &__total {
    color: var(--neutral-text-gray);

    p:last-of-type {
      font-weight: bold;
    }
  }

  &__receipt {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    padding: var(--space-m) var(--space-l);
    background-color: var(--neutral-magnolia);
    border-radius: var(--radius-m);
  }

  &__plan {
    > p {
      display: flex;
      flex-direction: column;
    }

    p {
      font-weight: bold;
    }

    a {
      color: var(--neutral-text-gray);
      font-weight: normal;
    }
  }

  &__addons {
    padding-block-start: var(--space-s);
    border-top: 1px solid var(--neutral-light-gray);
  }

  &__addon:not(:last-child) {
    margin-block-end: var(--space-s);
  }

  &__total {
    padding-inline: var(--space-l);

    p:last-of-type {
      color: var(--primary-purplish-blue);
      font-size: var(--font-size-1);
    }
  }
}
</style>
