<script setup>
import ChangeForm from '../components/ChangeForm.vue';
</script>

<template>

  <main>
   <div class="change-form--wrapper">
    <div class="change-form-header">
      <h1>Change Implementation Form</h1>
      <p>Please fill out the form below to submit a change implementation form.</p>
    </div>
    <ChangeForm />
   </div>


  </main>

</template>

<style scoped>
.change-form--wrapper {
  display: block;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;

}

</style>