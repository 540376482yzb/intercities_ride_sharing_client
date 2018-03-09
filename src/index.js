import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import CheeseList from './components/cheeseList'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
	<Provider store={store}>
	  <CheeseList />
	</Provider>
	, 
	document.getElementById('root'))
  
registerServiceWorker()
