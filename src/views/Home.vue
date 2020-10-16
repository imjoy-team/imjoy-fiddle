<template>
  <div class="home">
    <ImJoyEditor msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import ImJoyEditor from "@/components/ImJoyEditor.vue";

export default {
  name: "Home",
  components: {
    ImJoyEditor
  }
};
</script>
