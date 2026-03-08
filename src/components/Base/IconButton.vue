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

  width: var(--icon-size);
  height: var(--icon-size);
  padding: 0;
}

.icon-button__icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
