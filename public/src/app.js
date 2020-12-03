'use strict'

import Todo from './Todo.js'

const form         = document.querySelector('form'),
      input        = document.querySelector('input[name=todo]'),
      list         = document.querySelector('ul'),
      categoryList = document.querySelector('.list'),
      rectangle    = document.querySelector('.rectangle')

const todo = new Todo(list, input)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  todo.addNew()
  todo.addClass(document.querySelector('.form-group'), 'blink-an', 500)
  todo.addClass(input, 'blink-an', 500)

})

list.addEventListener('click', (e) => {
  
  const el = e.target

  if (el.localName === 'a') {
    
    el.parentElement.classList.add('fade-out-an')

    const id = el.parentElement.dataset.index
    
    todo.removeElement(el.parentElement, id)
  }

})

todo.getItems()

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('list-form-item') && categoryList.style.display != 'block') {
    categoryList.style.display = 'block'
  }
  else {
    categoryList.style.display = 'none'
  }
})

// adding tasks category
document.querySelectorAll('.list-item').forEach(item => {

  item.addEventListener('click', (e) => {
    let category = e.target.textContent

    document.querySelector('.list-form-item-name').textContent = category

    category = category.trim() 

    rectangle.classList = ''

    rectangle.classList = 'rectangle list-form-item rectangle-' + category.toLowerCase()

  })

})