<script setup>
import { ref, nextTick } from 'vue'
import { useFormStore } from '../stores/form'
import { useValidation } from '../composables/validation'
import CheckboxCard from './CheckboxCard.vue'
import FormButton from './FormButton.vue'
import FormErrors from './FormErrors.vue'
import FormStep from './FormStep.vue'
import FormSummary from './FormSummary.vue'
import InputField from './InputField.vue'
import RadioButtonCard from './RadioButtonCard.vue'
import ToggleButton from './ToggleButton.vue'

const store = useFormStore()

const {
  errorMessages,
  validateForm,
  nameIsValid,
  emailIsValid,
  phoneIsValid,
  nameErrorMessage,
  emailErrorMessage,
  phoneErrorMessage,
} = useValidation()

const formErrorsRef = ref(null)

const focusOnHeading = async () => {
  await nextTick()
  const nextStepTitle = document.querySelector('.form-step h2')
  nextStepTitle.focus()
}

const handleNextStep = async () => {
  if (store.currentStep === 1) {
    const isInvalid = validateForm(store.formData)

    if (isInvalid.length > 0) {
      await nextTick()
      formErrorsRef.value.$el.focus()
      return
    }
  }

  errorMessages.value = []

  store.updateFormData(store.formData)
  store.$patch({ currentStep: store.currentStep + 1 })
  focusOnHeading()
}

const handlePreviousStep = () => {
  store.$patch({ currentStep: store.currentStep - 1 })
  focusOnHeading()
}
</script>

<template>
  <div class="form-steps">
    <div
      class="wrapper"
      :class="{ centered: store.currentStep > store.totalSteps }"
    >
      <FormErrors
        v-if="errorMessages.length > 0"
        :errors="errorMessages"
        ref="formErrorsRef"
      />
      <template v-if="store.currentStep === 1">
        <FormStep
          title="Personal info"
          description="Please provide your name, email address and phone number."
        >
          <div class="fields">
            <InputField
              id="name"
              type="text"
              label="Name"
              placeholder="e.g. Stephen King"
              :is-invalid="nameIsValid"
              :error-message="nameErrorMessage"
              v-model="store.formData.name"
            />
            <InputField
              id="email"
              type="email"
              label="Email Address"
              placeholder="e.g. stephenking@lorem.com"
              :is-invalid="emailIsValid"
              :error-message="emailErrorMessage"
              v-model="store.formData.email"
            />
            <InputField
              id="phone"
              type="tel"
              label="Phone Number"
              placeholder="e.g. +1 234 567 890"
              :is-invalid="phoneIsValid"
              :error-message="phoneErrorMessage"
              v-model="store.formData.phone"
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
              id="arcade"
              name="plan"
              value="arcade"
              icon="arcade"
              title="Arcade"
              monthly-price="$9/mo"
              yearly-price="$90/yr"
              v-model="store.formData.plan"
            />
            <RadioButtonCard
              id="advanced"
              name="plan"
              value="advanced"
              icon="advanced"
              title="Advanced"
              monthly-price="$12/mo"
              yearly-price="$120/yr"
              v-model="store.formData.plan"
            />
            <RadioButtonCard
              id="pro"
              name="plan"
              value="pro"
              icon="pro"
              title="Pro"
              monthly-price="$15/mo"
              yearly-price="$150/yr"
              v-model="store.formData.plan"
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
            <CheckboxCard
              id="online"
              namae="addon"
              value="online"
              title="Online service"
              summary="Access to multiplayer games"
              monthly-price="+$1/mo"
              yearly-price="+$10/yr"
            />
            <CheckboxCard
              id="storage"
              namae="addon"
              value="storage"
              title="Larger storage"
              summary="Extra 1TB of cloud save"
              monthly-price="+$2/mo"
              yearly-price="+$20/yr"
            />
            <CheckboxCard
              id="profile"
              namae="addon"
              value="profile"
              title="Customizable profile"
              summary="Custom theme on your profile"
              monthly-price="+$2/mo"
              yearly-price="+$20/yr"
            />
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
          description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
          :last-step="true"
        >
          <template #title>
            <h2
              aria-live="polite"
              tabindex="-1"
            >
              Thank you {{ store.formData.name }}!
            </h2>
          </template>
          <FormButton
            variant="tertiary"
            @click="store.resetForm"
            >Reset form</FormButton
          >
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

  button:last-of-type {
    margin-inline-start: auto;
  }

  @include breakpoint(medium) {
    position: absolute;
    block-size: var(--mobile-button-height);
    inset-block-end: calc(var(--mobile-button-offset) * -1);
    inset-inline: 0;
    padding: var(--space-xl) var(--space-s);
    background-color: var(--neutral-white);
  }
}

.centered {
  display: grid;
  place-items: center;
  block-size: 100%;
}
</style>
