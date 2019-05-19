import Form from '../Form';

class Edit extends Form {
  constructor(name, price, node) {
    super(name, price);
    this.node = node;
  }

  onOkClick(e) {
    e.preventDefault();

    super.onOkClick();

    const edit = confirm(`Вы уверены что хотите изменить товар ${this.name}`);

    if (edit && this.errors.length === 0) {
      const { listGoods } = app.coods;

      for (const item of listGoods) {
        if (item.id === this.id) {
          const name = this.node.querySelector('[data-editor-row=name]');
          const price = this.node.querySelector('[data-editor-row=price]');

          item.name = this.name;
          item.price = this.price;
          name.innerHTML = this.name;
          price.innerHTML = this.price;
        }
      }

      app.popup.close();
    }
  }
}

export default Edit;
