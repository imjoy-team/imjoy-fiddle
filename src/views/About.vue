<template>
  <div class="about">
    <section
      class="hero"
      style="max-width: 100%; width: 600px; text-align: center; margin-left: auto;
  margin-right: auto;"
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">About ImJoy Fiddle</h1>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { version } from "../../package.json";
export default {
  name: "About",
  data() {
    return {
      version
    };
  }
};
</script>
