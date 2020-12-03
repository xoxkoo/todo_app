// import _trim from '../node_modules/lodash-es/each.js'  

export default class Todo {
  
	constructor( list, input ) {
		this.list = list
    this.input = input
    
    this.categoryElement = this.input.nextElementSibling
    this.category = ''
    this.text = ''
    this.id = ''
  }

  addNew() {
    this.getCategory()

    if ( this.createNewNode() ) {
      this.input.parentElement.parentElement.reset()
      this.sendData()
    } 

  }

  createNewHtml() {
    return `
      <li data-index="${this.id}">
        <div class="rectangle rectangle-${this.category}"></div>
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
    console.log(lastEl)
    
    return (lastEl) ? +lastEl.dataset.index : 0
  }

  getNewIndex() {
    return this.getLastIndex() + 1
  }

  getCategory() {
    let category = this.categoryElement.querySelector('.list-form-item-name').textContent

    // remove spaces + lower case
    category = category.split('').filter(e => e.trim().length).join('').toLowerCase()

    this.category = category
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
    // this.list.innerHTML = localStorage.getItem('elements')
    const response = await( await fetch('/get')).json()
    

    for (const item of response) {
      this.id = item._id
      this.text = item.body
      this.category = item.category

      this.list.innerHTML += this.createNewHtml()
    }
  }

  //TODO - adding to database
  sendData() {
    const data = {
      _id: this.id,
      body: this.text,
      category: this.category
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    //sending stuff
    fetch('/add', options)
  
  }

  removeElement(element, id) {

    setTimeout(() => {
      element.remove()
    }, 500)

    const data = {
      id: id
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    //sending stuff
    fetch('/delete', options)
  }

  //help functions
  addClass(element, className, duration) {
    element.classList.add(className)
    setTimeout(() => {
      element.classList.remove(className)
    }, duration)
  }

  hideOnClickOutside(element) {
    const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )

    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
          element.style.display = 'none'
          removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

}