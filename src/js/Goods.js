import FormEdit from './forms/Edit';

class Goods {
  constructor(tbody) {
    this.nodeTbody = tbody;
    this.listGoods = [];
  }

  createRowTbody(data) {
    const classTd = 'table__col';
    const row = document.createElement('tr');
    const fields = [data.name, data.price];
    const nameFields = ['name', 'price'];

    for (let i = 0; i < fields.length; i++) {
      const td = document.createElement('td');

      td.setAttribute('data-editor-row', nameFields[i]);
      td.className = classTd;
      td.innerHTML = fields[i];

      row.appendChild(td);
    }

    const edit = document.createElement('button');

    edit.className = 'table__button table__edit';
    edit.innerHTML = 'e';
    edit.addEventListener('click', () => this.onEditGood(data));

    const remove = document.createElement('button');

    remove.className = 'table__button table__remove';
    remove.innerHTML = 'X';
    remove.addEventListener('click', () => this.onRemoveGood(data));

    const buttons = document.createElement('td');

    buttons.className = 'table__buttons';
    buttons.appendChild(edit);
    buttons.appendChild(remove);

    row.setAttribute('data-goods-id', data.id);
    row.appendChild(buttons);

    return row;
  }

  onEditGood(data) {
    const form = new FormEdit(data.name, data.price, data.node);

    form.id = data.id;
    form.create();
    app.popup.create(form.nodeForm);
  }

  onRemoveGood(data) {
    const remove = confirm(`Вы уверены что ходите удалить товар ${data.name}`);

    if (remove) {
      this.listGoods = this.listGoods.filter(item => item.id !== data.id);
      data.node.remove();
    }
  }


  pushListGoods(val) {
    const data = this.createRowTbody(val);

    val.node = data;
    this.listGoods.push(val);
    this.nodeTbody.appendChild(data);
  }
}

export default Goods;
