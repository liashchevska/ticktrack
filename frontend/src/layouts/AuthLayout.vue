<template>
  <div class="auth__layout">

    <div class="auth__form">
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

    <div class="auth__divider"></div>

    <div v-if="true" class="auth__about">
      <div class="about__content">
        <div class="about__header">
          <h2>TickTrack</h2>
          <p>Minimal task tracker</p>
        </div>
        <div class="about__features">
          <h4>Features:</h4>
          <ul>
            <li>Distraction-free UI</li>
            <li>Personal task boards</li>
            <li>Drag-and-drop task management</li>
            <li>Demo account access</li>
          </ul>
        </div>
        <div class="about__tech">
          <h4>Tech stack:</h4>
          <ul>
            <li>Django, DRF, Allauth</li>
            <li>Vue 3, Vue Router, Pinia</li>
            <li>Nginx, Docker</li>
          </ul>
        </div>
        <div class="about__footer">
          <a href="https://github.com/liashchevska/ticktrack">View source code on Github</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="css">
.auth__layout {
  display: grid;
  grid-template-columns: 1fr;
}

.auth__about,
.auth__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: var(--space-xxl);
  padding-bottom: var(--space-xxl);
}

.about__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxl);
  padding: 0 var(--space-lg);
  margin: 0 auto;
  min-width: var(--auth-form-width);
}

.about__content h4 {
  margin-bottom: var(--space-xs);
  text-align: center;
}

.about__content li {
  list-style: disc inside;
}

.about__header,
.about__footer {
  text-align: center;
}

.auth__form {
  position: relative;
  min-height: auto;
}

.auth__header,
.auth__main,
.auth__footer {
  width: var(--auth-form-width);
  padding: var(--space-md) var(--space-lg);
}

.auth__header,
.auth__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth__header {
  gap: var(--space-md);
}

.auth__divider {
  width: 60%;
  max-width: var(--auth-form-width);
  height: 1px;
  background: #ddd;
  margin: 0 auto;
}

/* .auth__demo-login {
  position: absolute;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
} */

@media (min-width: 1024px) {
  .auth__about {
    order: 1;
  }

  .auth__form {
    order: 2;
  }

  .auth__form {
    min-height: 100vh;
    min-height: 100dvh;
  }

  .auth__divider {
    display: none;
  }

  .auth__layout {
    grid-template-columns: 1fr 1fr;
  }

  .auth__about {
    margin-left: clamp(2rem, 5vw, 9rem);
  }

  .auth__form {
    margin-right: clamp(2rem, 5vw, 9rem);
  }

  .about__header,
  .about__footer,
  .about__content h4 {
    text-align: initial;
  }
}

/* @media (min-width: 1200px) {
  .auth__form {
    margin-right: 7rem;
  }

  .auth__about {
    margin-left: 7rem;
  }
}


@media (min-width: 1440px) {
  .auth__form {
    margin-right: 9rem;
  }

  .auth__about {
    margin-left: 9rem;
  }
} */

/*
@media (max-height: 500px) {
  .auth__demo-login {
    position: static;
    margin-top: var(--space-md);
    transform: none;
  }
} */
</style>
