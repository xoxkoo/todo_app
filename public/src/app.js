'use strict'

import Todo from './Todo.js'

const form         = document.querySelector('form'),
      input        = document.querySelector('input[name=todo]'),
      tasksList    = document.querySelector('ul'),
      categoryList = document.querySelector('.list'),
      rectangle    = document.querySelector('.rectangle')

const app = new Todo(tasksList, input)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  app.addNew()
  console.log()
  app.addClass(document.querySelector('.form-group'), `blink-${app.category}-an`, 500)

})

tasksList.addEventListener('click', (e) => {
  
  const el = e.target

  if (el.localName === 'a') {
    e.preventDefault()
    
    el.parentElement.classList.add('fade-out-an')

    const id = +el.parentElement.dataset.index
    
    app.removeElement(el.parentElement, id)
  }

})

app.getItems()

// document.addEventListener('click', (e) => {
//   // console.log(e.target)
//   if (e.target.classList.contains('list-form-item') && categoryList.style.display != 'block') {
//     categoryList.style.opacity = 1
//   }
//   else {
//     categoryList.style.opacity = 0
//   }
// })

document.querySelector('.list-form').addEventListener('click', (e) => {
  categoryList.style.opacity = 1
})

// adding tasks category
document.querySelectorAll('.list-item').forEach(item => {

  item.addEventListener('click', (e) => {
    let category = e.target.textContent

    document.querySelector('.list-form-item-name').textContent = category

    // remove spaces + lower case
    category = category.split('').filter(e => e.trim().length).join('').toLowerCase()

    rectangle.classList = ''

    rectangle.classList = 'rectangle list-form-item rectangle-' + category

    input.focus()
  })

})
