import React from 'react'
import {Route, withRouter, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Landing from './landing/landing'
import Board from './board/board'
import Match from './board/Match'
import Review from './board/Review'
export class App extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Redirect exact from="/" to="/landing" />
					<Route path="/landing" component={Landing} />
					<Route exact path="/board" component={Board} />
					<Route exact path="/match" component={Match} />
					<Route exact path="/review" component={Review} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(connect()(App))
