import Goods from './Goods';
import Modal from './Modal';
import FormAdd from './forms/Add';


const root = document.querySelector('[data-widget=editor]');
const tbody = root.querySelector('[data-editor-table=body]');
const add = root.querySelector('[data-editor=add]');

const App = function () {
  this.coods = new Goods(tbody);
  this.addForm = new FormAdd();
  this.popup = new Modal();
};

window.app = new App();

app.addForm.create();

add.addEventListener('click', () => app.popup.create(app.addForm.nodeForm));
