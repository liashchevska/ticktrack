<template>
  <button class="icon-button">
    <slot></slot>
  </button>
</template>


<style lang="css">
.icon-button {
  background: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
}

.icon-button__icon {
  width: var(--icon-size);
  height: var(--icon-size);
  display: block;
}
</style>
