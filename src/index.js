import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router>
				<App />
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
