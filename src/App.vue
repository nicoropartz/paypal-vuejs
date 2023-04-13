<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Inscription from './components/Inscription.vue'
import PaymentList from './components/PaymentList.vue'
</script>

<template>
      <div class="app-container">
        <PaymentList class="payement"/>
        <Inscription class="inscription"/>
      </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
   }
});
</script>

<style>

.main-panel > .content {
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
}

.app-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around ;
  gap: 10px;
}

.payement {
  flex-grow: 2;
}

.inscription {
  flex-grow: 2;
}

</style>
