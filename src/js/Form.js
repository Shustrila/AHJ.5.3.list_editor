class Form {
  constructor(name = '', price = '') {
    this.nodeForm = null;
    this.nodeLabelName = null;
    this.nodeTitleName = null;
    this.nodeInputName = null;
    this.nodeLabelPrice = null;
    this.nodeTitlePrice = null;
    this.nodeInputPrice = null;

    this.name = name;
    this.price = price;
    this.id = 0;
    this.errors = [];
  }

  create() {
    const buttonWrapper = document.createElement('div');
    const ok = document.createElement('button');
    const cancellation = document.createElement('button');
    const labelClass = 'form__label';
    const titleClass = 'form__title';
    const InputClass = 'form__input';

    this.nodeForm = document.createElement('form');
    this.nodeForm.className = 'form';
    this.nodeForm.addEventListener('submit', e => e.preventDefault());

    this.nodeLabelName = document.createElement('label');
    this.nodeLabelName.className = labelClass;
    this.nodeForm.appendChild(this.nodeLabelName);

    this.nodeTitleName = document.createElement('h4');
    this.nodeTitleName.innerHTML = 'Название';
    this.nodeTitleName.className = titleClass;
    this.nodeLabelName.appendChild(this.nodeTitleName);

    this.nodeInputName = document.createElement('input');
    this.nodeInputName.className = InputClass;
    this.nodeInputName.name = 'name';
    this.nodeInputName.value = this.name;
    this.nodeInputName.addEventListener('input', e => this.name = e.currentTarget.value);
    this.nodeLabelName.appendChild(this.nodeInputName);

    this.nodeLabelPrice = document.createElement('label');
    this.nodeLabelPrice.className = labelClass;
    this.nodeForm.appendChild(this.nodeLabelPrice);

    this.nodeTitlePrice = document.createElement('h4');
    this.nodeTitlePrice.innerHTML = 'Стоимость';
    this.nodeTitlePrice.className = titleClass;
    this.nodeLabelPrice.appendChild(this.nodeTitlePrice);

    this.nodeInputPrice = document.createElement('input');
    this.nodeInputPrice.className = InputClass;
    this.nodeInputPrice.name = 'price';
    this.nodeInputPrice.value = this.price;
    this.nodeInputPrice.addEventListener('keypress', this.onKeypressPrice.bind(this));
    this.nodeInputPrice.addEventListener('input', this.onInputPrice.bind(this));
    this.nodeLabelPrice.appendChild(this.nodeInputPrice);

    buttonWrapper.className = 'form__wrapper-button';
    this.nodeForm.appendChild(buttonWrapper);

    ok.className = 'form__button form__button-ok';
    ok.innerHTML = 'ОК';
    ok.addEventListener('click', this.onOkClick.bind(this));
    buttonWrapper.appendChild(ok);

    cancellation.className = 'form__button form__button-cancellation';
    cancellation.innerHTML = 'ОТМЕНА';
    cancellation.addEventListener('click', this.onCancellationClick);

    buttonWrapper.appendChild(cancellation);
  }

  static convertFieldsPrice(str) {
    const val = String(str);

    if (val.match(new RegExp(/[^\d\s]+/, 'ig')) !== null) {
      throw new Error('the parameter "str" contains letters');
    }

    return val.replace(/[\s]+/ig, '')
      .split('')
      .reverse()
      .map((item, i) => ((i % 3 === 0) ? item += ' ' : item))
      .reverse()
      .join('')
      .trim();
  }

  onKeypressPrice(e) {
    e.preventDefault();

    if (e.keyCode >= 48 && e.keyCode <= 57) {
      e.currentTarget.value += e.key;
      this.price = e.currentTarget.value;
      e.currentTarget.value = Form.convertFieldsPrice(this.price);
    }
  }

  onInputPrice(e) {
    this.price = Form.convertFieldsPrice(e.currentTarget.value);
    e.currentTarget.value = this.price;
  }

  onOkClick() {
    this.errors = [];

    if (this.name.trim() === '') this.errors.push('name');
    if (this.price.trim() === '') this.errors.push('price');

    const fields = [this.nodeInputName, this.nodeInputPrice];

    for (const field of fields) {
      const search = field.parentNode.querySelector('.form__error');

      if (this.errors.indexOf(field.name) !== -1) {
        const error = document.createElement('p');

        error.className = 'form__error';
        error.innerHTML = 'Поле с данными пустое!';

        if (search === null) {
          field.parentNode.appendChild(error);
        } else {
          search.replaceWith(error);
        }
      } else if (search !== null) search.remove();
    }
  }

  onCancellationClick(e) {
    e.preventDefault();
    this.name = '';
    this.price = '';
    window.app.popup.close();
  }
}

export default Form;
