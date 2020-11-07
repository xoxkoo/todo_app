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
      this.sendData()
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

  async getItems() {
    const response = await( await fetch('/app')).json()
    // this.list.innerHTML = localStorage.getItem('elements')
    this.list.innerHTML = await this.getData()  
  }

  /**
  * get data and create elements
  */
  async getData() {
    const response = await( await fetch('/app')).json()

    return response
  }

  //TODO - adding to database
  sendData() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.list.innerHTML.trim()
    }
    
    //sending stuff
    fetch('/app', options)
  
  }
}