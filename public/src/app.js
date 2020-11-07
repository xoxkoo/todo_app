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
  
  if (e.target.localName === 'a') {
    
    e.target.parentElement.classList.add('animation')
    setTimeout(() => {
      e.target.parentElement.remove()
    }, 500)
    
  }

})

// document.onbeforeunload(() => {
  // })
// todo.sendData()

todo.getItems()

