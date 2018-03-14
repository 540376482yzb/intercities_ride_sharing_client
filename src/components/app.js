import React from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Landing from './landing/landing'
import Board from './board/board'
export class App extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Redirect exact from="/" to="/landing" />
					<Route path="/landing" component={Landing} />
					<Route path="/board" component={Board} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(connect()(App))