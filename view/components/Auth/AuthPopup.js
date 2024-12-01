export class AuthPopup extends HTMLElement {
  constructor() {
    super();
    this.isLogin = true;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.#render(shadow);
    this.#setupEventListeners();
    this.#addStyles(shadow);
  }

  async #handleLogin(data) {
    const response = await fetch('/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Login failed');

    const userData = await response.json();
    localStorage.setItem('userData', JSON.stringify(userData));

    this.#showSuccessAlert('Iniciado sesión con éxito');

    window.dispatchEvent(new CustomEvent('userAuthenticated', { detail: userData }));

    setTimeout(() => this.remove(), 1500);
  }

  async #handleRegister(data) {
    const registerResponse = await fetch('/api/usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!registerResponse.ok) throw new Error('Registration failed');

    this.#showSuccessAlert('Has creado tu cuenta con éxito');

    this.isLogin = true;
    this.#updateForm();
    this.shadowRoot.querySelector('form').reset();
  }

  #showSuccessAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'success-alert';
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add('show'), 100);

    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 300);
    }, 2000);
  }

  #setupEventListeners() {
    const toggleButton = this.shadowRoot.querySelector('.toggle-form');
    const form = this.shadowRoot.querySelector('form');
    const closeButton = this.shadowRoot.querySelector('.close-button');

    toggleButton.addEventListener('click', () => {
      this.isLogin = !this.isLogin;
      this.#updateForm();
      form.reset();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        if (this.isLogin) {
          await this.#handleLogin(data);
        } else {
          await this.#handleRegister(data);
        }
      } catch (error) {
        console.error('Auth error:', error);
        this.shadowRoot.querySelector('.error-message').textContent =
          'Authentication failed. Please try again.';
      }
    });

    closeButton.addEventListener('click', () => this.remove());
  }

  #updateForm() {
    const title = this.shadowRoot.querySelector('.title');
    const toggleButton = this.shadowRoot.querySelector('.toggle-form');
    const nameInput = this.shadowRoot.querySelector('.name-field input');
    const nameField = this.shadowRoot.querySelector('.name-field');
    const submitButton = this.shadowRoot.querySelector('button[type="submit"]');
    const errorMessage = this.shadowRoot.querySelector('.error-message');

    title.textContent = this.isLogin ? 'Login' : 'Crear Cuenta';
    toggleButton.textContent = this.isLogin ? 'No tienes cuenta?' : 'Ya tienes cuenta?';
    nameField.style.display = this.isLogin ? 'none' : 'block';

    // Toggle the required attribute based on form type
    if (this.isLogin) {
      nameInput.removeAttribute('required');
      nameInput.disabled = true; // Disable it so it's not included in form data
    } else {
      nameInput.setAttribute('required', '');
      nameInput.disabled = false;
    }

    submitButton.textContent = this.isLogin ? 'Login' : 'Crear Cuenta';
    errorMessage.textContent = '';
  }

  #render(shadow) {
    shadow.innerHTML = `
      <div class="popup-overlay">
        <div class="popup-content">
          <button class="close-button">×</button>
          <h2 class="title">Login</h2>
          <form>
            <div class="name-field" style="display: none;">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" disabled>
            </div>
            <div>
              <label for="correo">Correo</label>
              <input type="email" id="correo" name="correo" required>
            </div>
            <div>
              <label for="clave">Clave</label>
              <input type="password" id="clave" name="clave" required>
            </div>
            <div class="error-message"></div>
            <button type="submit">Login</button>
          </form>
          <button class="toggle-form">No tienes cuenta?</button>
        </div>
      </div>
    `;
  }

  #addStyles(shadow) {
    const style = document.createElement('style');
    style.textContent = `
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .popup-content {
        background: var(--secondary-color);
        padding: 2rem;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
        position: relative;
      }

      .close-button {
        position: absolute;
        right: 1rem;
        top: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-color);
      }

      .title {
        margin-bottom: 1.5rem;
        color: var(--text-color);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: var(--primary-color);
        color: var(--text-color);
      }

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background: var(--accent-color);
        color: white;
        cursor: pointer;
        transition: opacity 0.2s;
      }

      button:hover {
        opacity: 0.9;
      }

      .toggle-form {
        margin-top: 1rem;
        background: none;
        color: var(--text-color);
        text-decoration: underline;
      }

      .error-message {
        color: #ff4444;
        font-size: 0.875rem;
        min-height: 1.25rem;
      }
    `;

    if (!document.querySelector('#auth-alert-styles')) {
      const alertStyles = document.createElement('style');
      alertStyles.id = 'auth-alert-styles';
      alertStyles.textContent = `
        .success-alert {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 2rem;
          background-color: #4CAF50;
          color: white;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 1001;
          transform: translateX(120%);
          transition: transform 0.3s ease-out;
        }

        .success-alert.show {
          transform: translateX(0);
        }
      `;
      document.head.appendChild(alertStyles);
    }

    shadow.appendChild(style);
  }
}
