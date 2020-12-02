'use strict'

import Todo from './Todo.js'

const form    = document.querySelector('form'),
      input   = document.querySelector('input[name=todo]'),
      list    = document.querySelector('ul')

const todo = new Todo(list, input)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  todo.addNew()

})

list.addEventListener('click', (e) => {
  
  const el = e.target

  if (el.localName === 'a') {
    
    el.parentElement.classList.add('animation')
    setTimeout(() => {
      el.parentElement.remove()
    }, 500)

    const id = el.parentElement.dataset.index
    
    todo.removeElement(id)
  }

})

// document.onbeforeunload(() => {
  // })
// todo.sendData()

todo.getItems()

