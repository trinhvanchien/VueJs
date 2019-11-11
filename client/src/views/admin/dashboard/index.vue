<template>
  <div>
    <h2>Welcome dashboar Admin</h2>
    <div>
      <app-action />
    </div>
  </div>
</template>

<script>
import AppAction from "../actions/desktop";
export default {
  components: {
    AppAction
  }
};
</script>

<style scoped></style>
