<template>
  <button class="icon-button">
    <slot class="icon-button__icon"></slot>
  </button>
</template>


<style lang="css">
.icon-button {
  font-size: var(--text-xxl);
  width: var(--icon-size);
  height: var(--icon-size);

  background: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button__icon {
  width: 100%;
  height: 100%;
  display: block;
  flex-shrink: 0;
}
</style>
