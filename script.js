const [form] = document.forms;
const ul = document.querySelector('ul');
const deleteAll = document.querySelector('#deleteAll');
const documentFragment = new DocumentFragment();

let dataKey = 2;

const deleteFruit = id => {
  ul.removeChild(ul.querySelector(`li[data-key="${id}"]`));
  deleteAll.disabled = ul.children.length ? false : true;
}

const createListItem = (key, fruitName) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('btn', 'btn-sm', 'btn-outline-danger');
  buttonDelete.textContent = 'Delete';
  buttonDelete.setAttribute('onclick', `deleteFruit(${key})`);
  
  const divButton = document.createElement('div');
  divButton.classList.add('col-auto');
  divButton.appendChild(buttonDelete);
  
  const divFruitName = document.createElement('div');
  divFruitName.classList.add('col-auto', 'mr-auto', 'py-1');
  divFruitName.textContent = fruitName;
  
  const divRow = document.createElement('div');
  divRow.classList.add('row');
  
  divRow.append(divFruitName, divButton);
  
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.dataset.key = key;
  li.appendChild(divRow);
  return li;
}

form.fruitName.addEventListener('input', e => {
  form.btn.disabled = !e.target.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const { fruitName, btn } = e.target;
  const key = dataKey++;
  const li = createListItem(key, fruitName.value);
  
  documentFragment.appendChild(li);
  ul.prepend(documentFragment);
  
  e.target.reset();
  btn.disabled = true;
  deleteAll.disabled = false;
});

deleteAll.addEventListener('click', e => {
  while(ul.firstElementChild) {
    ul.removeChild(ul.lastElementChild);
  }
  
  deleteAll.disabled = true;
});