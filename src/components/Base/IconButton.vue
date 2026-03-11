<template>
  <button class="icon-button">
    <slot></slot>
  </button>
</template>


<style lang="css">
.icon-button {
  background: transparent;
  border: 1px solid transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: var(--icon-size);
  height: var(--icon-size);

  border-radius: var(--radius-sm);

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    transform 0.05s ease,
    box-shadow 0.1s ease;
}

.icon-button svg {
  width: 100%;
  height: 100%;
  display: block;
}

.icon-button:hover {
  background: var(--color-surface-hover);
  border-color: #ddd;
  box-shadow: 0 1px 2px var(--shadow);
}

.icon-button:active {
  transform: translateY(1px);
  box-shadow: none;
}

.icon-button:focus-visible {
  outline: 2px solid var(--color-primary-dark);
  outline-offset: 2px;
}
</style>
