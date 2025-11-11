const rootSelector = '[data-js-tabs]'

class Tabs {
  constructor(rootElement) {
    console.log('Tabs constructor called') // Добавим лог
    
    this.rootElement = rootElement
    this.buttonElements = rootElement.querySelectorAll('[data-js-tabs-button]')
    this.contentElements = rootElement.querySelectorAll('[data-js-tabs-content]')
    
    console.log('Buttons found:', this.buttonElements.length)
    console.log('Contents found:', this.contentElements.length)
    
    // Находим активную вкладку
    let activeTabIndex = 0
    this.buttonElements.forEach((button, index) => {
      if (button.classList.contains('is-active')) {
        activeTabIndex = index
      }
    })
    
    this.activeTabIndex = activeTabIndex
    this.limitTabsIndex = this.buttonElements.length - 1
    
    this.bindEvents()
    this.updateUI()
  }

  updateUI() {
    console.log('Updating UI, active tab:', this.activeTabIndex)
    
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === this.activeTabIndex
      
      buttonElement.classList.toggle('is-active', isActive)
      buttonElement.setAttribute('aria-selected', isActive.toString())
      buttonElement.setAttribute('tabindex', isActive ? '0' : '-1')
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === this.activeTabIndex
      contentElement.classList.toggle('is-active', isActive)
    })
  }

  activateTab(newTabIndex) {
    console.log('Activating tab:', newTabIndex)
    this.activeTabIndex = newTabIndex
    this.updateUI()
    this.buttonElements[newTabIndex].focus()
  }

  onButtonClick(buttonIndex) {
    console.log('Button clicked:', buttonIndex)
    this.activateTab(buttonIndex)
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index))
    })
  }
}

class TabsCollection {
  constructor() {
    console.log('TabsCollection initialized')
    this.init()
  }

  init() {
    const tabsElements = document.querySelectorAll(rootSelector)
    console.log('Tabs elements found:', tabsElements.length)
    
    tabsElements.forEach((element) => {
      new Tabs(element)
    })
  }
}

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing tabs...')
  new TabsCollection()
})

export default TabsCollection