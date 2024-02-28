# Frontend Mentor - CHALLENGE

This is a solution to the is a solution to the [Multi Step Form](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Extra challenge](#extra-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Extra challenge

To challenge myself I tried building this project with [Astro](https://astro.build), the static site generator that I've been using for some years now, in combination with Vue 3 and Pinia. I also tried to make the form as accessible as possible, following the WCAG 2.2 guidelines. This was a great way to apply accessibility to a reactive form, which is something I haven't done before.

### Screenshot

![social-preview-image](https://github.com/markteekman/multi-step-form/assets/3909046/de3a5ba1-de5d-42cf-b1ff-a2f2ba538b08)

### Links

- [Solution URL](https://www.frontendmentor.io/solutions/vue-3-pinia-astro-wcag-22-accessibility-mNmVrT8te7)
- [Live Site URL](https://markteekman.github.io/multi-step-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- WCAG 2.2 best practices
- [Astro](https://astro.build) - Astro Static Site Generator
- [Vue 3](https://v3.vuejs.org) - JavaScript Framework
- [Pinia](https://pinia.esm.dev) - Vue 3 Store
- [Frontend Mentor Challenge Starter](https://github.com/markteekman/frontend-mentor-challenge-starter) - My own starter template for Frontend Mentor Challenges

### What I learned

- How to use Vue 3 and Pinia in combination with Astro. Using components from other frameworks like Vue and React has always been a key feature of Astro, but I hadn't used it before. It was a great experience and I'm looking forward to using it more in the future. Installing Pinia was less straightforward than I expected, but I got it working in the end. There some [documentation](https://docs.astro.build/en/guides/integrations-guide/vue/#appentrypoint) about it on Astro but I took a slightly different approach.
- How to respond to reactive state in the form and keep the form accessible. I directed focus and used `aria-live` to announce changes in the form. I also used `aria-describedby` to link error messages to the input fields. This was a great way to apply accessibility to a reactive form, which is something I haven't done before.

### Continued development

I'd like to make my `validation.js` more generic so it can be used in a more generic way. But on the other hand, there are already a lot of great libraries out there that do this. I'm not sure if I want to reinvent the wheel. [VeeValidate](phttps://vee-validate.logaretm.com/v4) is a great library that I've used before and I might use it in the future. I'd also like to improve the efficiency of the components and logic, making it more reusable and scalable by splitting it up in smaller components and/or composables.

## Author

- [Personal Website](https://www.markteekman.nl)
- [Frontend Mentor Profile](https://www.frontendmentor.io/profile/markteekman)
- [LinkedIn Profile](https://nl.linkedin.com/in/markteekman)
- [Twitter Profile](https://twitter.com/MarkTeekman)
- [GitHub Repositories](https://github.com/markteekman)
- [NPM Packages](https://www.npmjs.com/~markteekman)
- [CodePen Creations](https://codepen.io/markteekman)
