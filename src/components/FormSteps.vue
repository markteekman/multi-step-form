<script setup>
import CheckboxCard from './CheckboxCard.vue'
import FormButton from './FormButton.vue'
import FormErrors from './FormErrors.vue'
import FormStep from './FormStep.vue'
import FormSummary from './FormSummary.vue'
import InputField from './InputField.vue'
import RadioButtonCard from './RadioButtonCard.vue'
import ToggleButton from './ToggleButton.vue'
import { useStepsStore } from '../stores/steps'

const store = useStepsStore()

const handleNextStep = () => {
  store.$patch({ currentStep: store.currentStep + 1 })
}

const handlePreviousStep = () => {
  store.$patch({ currentStep: store.currentStep - 1 })
}
</script>

<template>
  <div class="form-steps">
    <div class="wrapper">
      <!-- <FormErrors :errors="['Error number one', 'This other error']" /> -->
      <template v-if="store.currentStep === 1">
        <FormStep
          title="Personal info"
          description="Please provide your name, email address and phone number."
        >
          <div class="fields">
            <InputField
              label="Name"
              id="name"
              placeholder="e.g. Stephen King"
              error-message="Please provide a name."
            />
            <InputField
              label="Email Address"
              type="email"
              id="email"
              placeholder="e.g. stephenking@lorem.com"
              error-message="Please provide an email address, for example stephenking@lorem.com."
            />
            <InputField
              label="Phone Number"
              type="tel"
              id="name"
              placeholder="e.g. +1 234 567 890"
              error-message="Please provide a phone number, for example +1 234 567 890."
            />
          </div>
        </FormStep>
      </template>
      <template v-if="store.currentStep === 2">
        <FormStep
          title="Select your plan"
          description="You have the option of monthly or yearly billing."
        >
          <fieldset class="radio-buttons">
            <legend class="sr-only">Choose a plan</legend>
            <RadioButtonCard
              icon="arcade"
              id="arcade"
              description="Arcade for $9 a month"
              name="plan"
              price="$9/mo"
              title="Arcade"
              value="$9/mo"
              checked="true"
            />
            <RadioButtonCard
              icon="advanced"
              id="advanced"
              description="Advanced for $12 a month"
              name="plan"
              price="$12/mo"
              title="Advanced"
              value="advanced"
            />
            <RadioButtonCard
              icon="pro"
              id="pro"
              description="Pro for $15 a month"
              name="plan"
              price="$15/mo"
              title="Pro"
              value="pro"
            />
          </fieldset>
          <ToggleButton />
        </FormStep>
      </template>
      <template v-if="store.currentStep === 3">
        <FormStep
          title="Pick add-ons"
          description="Add-ons help enhance your gaming experience."
        >
          <fieldset class="checkboxes">
            <legend class="sr-only">Choose your add-ons</legend>
            <CheckboxCard id="online" />
            <CheckboxCard id="storage" />
            <CheckboxCard id="profile" />
          </fieldset>
        </FormStep>
      </template>
      <template v-if="store.currentStep === 4">
        <FormStep
          title="Finishing up"
          description="Double-check everything looks OK before confirming."
        >
          <FormSummary />
        </FormStep>
      </template>
      <template v-if="store.currentStep > store.totalSteps">
        <FormStep
          title="Thank you!"
          description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
          :last-step="true"
        >
          <button @click="store.$patch({ currentStep: 1 })">Reset form</button>
        </FormStep>
      </template>
    </div>
    <div class="buttons">
      <FormButton
        variant="secondary"
        v-if="store.currentStep > 1 && store.currentStep <= store.totalSteps"
        @click="handlePreviousStep"
      >
        Go back
      </FormButton>
      <FormButton
        type="submit"
        v-if="store.currentStep < store.totalSteps"
        @click="handleNextStep"
      >
        Next step
      </FormButton>
      <FormButton
        type="submit"
        v-if="store.currentStep === store.totalSteps"
        @click="handleNextStep"
      >
        Confirm
      </FormButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.form-steps {
  --mobile-button-height: 60px;
  --mobile-button-offset: 200px;

  // position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: var(--space-l);
  padding-inline: var(--space-3xl);

  @include breakpoint(large) {
    padding-inline: var(--space-xl);
  }

  @include breakpoint(medium) {
    margin-block-start: calc(var(--step-tracker-offset) + calc(var(--space-l) * -2));
    margin-inline: var(--space-s);
    padding-inline: var(--space-m);
    background-color: var(--neutral-white);
    border-radius: var(--radius-h);
    box-shadow: var(--elevation-3);
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }
}

fieldset {
  display: flex;
  gap: var(--space-s);

  @include breakpoint(medium) {
    flex-direction: column;
  }

  &.checkboxes {
    flex-direction: column;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block-start: var(--space-l);

  @include breakpoint(medium) {
    position: absolute;
    block-size: var(--mobile-button-height);
    inset-block-end: calc(var(--mobile-button-offset) * -1);
    inset-inline: 0;
    padding: var(--space-xl) var(--space-s);
    background-color: var(--neutral-white);
  }
}
</style>
