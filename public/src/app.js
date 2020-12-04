'use strict'

import Todo from './Todo.js'

const form         = document.querySelector('form'),
      input        = document.querySelector('input[name=todo]'),
      tasksList    = document.querySelector('.tasks'),
      categoryList = document.querySelector('.categories-list'),
      rectangle    = document.querySelector('.rectangle')

const app = new Todo(tasksList, input)

/**
 * adding new task
 */
form.addEventListener('submit', (e) => {
  e.preventDefault()

  if ( app.addNew() ) app.addClass(document.querySelector('.form-group'), `blink-${app.category}-an`, 500)

})


/**
 * removing specific task
 */
tasksList.addEventListener('click', (e) => {
  
  const el = e.target

  if (el.localName === 'a') {
    e.preventDefault()
    
    el.parentElement.classList.add('fade-out-an')

    const id = +el.parentElement.dataset.index
    
    app.removeElement(el.parentElement, id)
  }

})


/**
 * get tasks from database
 */
app.getItems()


/**
 * showing and hiding category menu
 */
document.addEventListener('click', (e) => {
 
  const menu = document.querySelector('.categories-select-menu')
  
  // if (e.target.classList.contains('categories-select-menu') && categoryList.style.display != 'block') {
  if ( (e.target === menu || e.target === menu.children[0] || e.target === menu.children[1] || e.target === menu.children[2]) && categoryList.style.display != 'block' ) {
    categoryList.style.display = 'block'
  }
  else {
    categoryList.style.display = 'none'
  }

})


// document.querySelector('.categories-select-menu').addEventListener('click', (e) => {
//   categoryList.style.display = 'block'
// })

/**
 * adding category to task
 */
document.querySelectorAll('.list-item').forEach(item => {

  item.addEventListener('click', (e) => {
    let category = e.target.textContent

    document.querySelector('.menu-item-name').textContent = category

    // remove spaces + lower case
    category = category.split('').filter(e => e.trim().length).join('').toLowerCase()

    rectangle.classList = ''

    rectangle.classList = 'rectangle rectangle-' + category

    input.focus()
  })

})
