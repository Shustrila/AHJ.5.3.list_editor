import Form from '../Form';

class Add extends Form {
  constructor(name, price) {
    super(name, price);
  }

  onOkClick(e) {
    e.preventDefault();

    super.onOkClick();

    if (this.errors.length === 0) {
      const data = {
        id: this.id++,
        name: this.name,
        price: this.price,
      };

      app.coods.pushListGoods(data);
      this.nodeInputName.value = '';
      this.nodeInputPrice.value = '';
      this.name = '';
      this.price = '';
      app.popup.close();
    }
  }
}

export default Add;
