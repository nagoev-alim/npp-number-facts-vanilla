// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { showNotification } from './modules/showNotification.js';
import axios from 'axios';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='number-facts'>
    <h2>Number Facts</h2>
    <form data-form=''>
      <input type='number' name='number' placeholder='Enter a number'>
    </form>
    <p class='hide' data-fact=''></p>
    <div class='spinner hide' data-spinner=''></div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      form: document.querySelector('[data-form]'),
      fact: document.querySelector('[data-fact]'),
      spinner: document.querySelector('[data-spinner]'),
    };

    this.PROPS = {
      axios: axios.create({
        baseURL: 'http://numbersapi.com/',
      }),
    };

    this.DOM.form.addEventListener('submit', this.onSubmit);
  }

  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  onSubmit = async (event) => {
    event.preventDefault();

    const { number } = Object.fromEntries(new FormData(event.target).entries());

    if (!number) {
      showNotification('warning', 'Please enter a number.');
      return;
    }

    try {
      this.DOM.spinner.classList.remove('hide');
      this.DOM.fact.classList.add('hide');
      const { data } = await this.PROPS.axios.get(`${number}`);
      if (data) {
        this.DOM.spinner.classList.add('hide');
        this.DOM.fact.innerHTML = data;
        this.DOM.fact.classList.remove('hide');
      }
    } catch (e) {
      console.log(e);
      showNotification('danger', 'Something went wrong, open dev console.');
    }
  };
}

// ⚡️Class instance
new App();
