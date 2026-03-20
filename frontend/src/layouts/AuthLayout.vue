<template>
  <div class="auth__layout">
    <header class="auth__header">
      <h1> TickTrack </h1>
      <slot name="header"></slot>
    </header>
    <main class="auth__main">
      <slot></slot>
    </main>
    <footer class="auth__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="css">
.auth__layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding-bottom: 8vh;
}

.auth__header,
.auth__main,
.auth__footer {
  width: 320px;
  padding: var(--space-md) var(--space-lg);
}

.auth__header,
.auth__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth__header {
  gap: var(--space-md)
}

.auth__main {}

.auth__footer {}

@media (min-width: 1024px) {}
</style>
