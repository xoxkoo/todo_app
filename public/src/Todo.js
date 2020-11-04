// import _trim from '../node_modules/lodash-es/each.js'  

export default class Todo {
  
	constructor( list, input ) {
		this.list = list
    this.input = input
    
    this.text = ''
    this.id = ''
  }

  addNew() {

    if ( this.createNewNode() ) {
      this.input.parentElement.parentElement.reset()
    } 

  }

  createNewHtml() {
    return `
      <li data-index="${this.id}">
        <p>${this.text}</p> 
        <a href="#">x</a>
      </li>
    `.trim()
  }

  createNewNode() {
    this.id = this.getNewIndex()
    this.text = this.input.value

    if (this.validate()) {
      this.list.innerHTML += this.createNewHtml()
      return true
    }

  }

  getLastIndex() {
    const lastEl = document.querySelector('li:last-child')
    
    return (lastEl) ? +lastEl.dataset.index : 0
  }

  getNewIndex() {
    return this.getLastIndex() + 1
  }

  validate() {
    return this.text.trim()
  }

  saveItems() {

    window.addEventListener('beforeunload', (e) => {

      localStorage.setItem('elements', this.list.innerHTML.trim() )

    })

  }  

  getItems() {
    this.list.innerHTML = localStorage.getItem('elements')
  }

}