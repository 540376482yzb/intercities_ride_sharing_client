import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SingleBoardHeader from './header'
import Request from './request'
import Match from './match'
import RequiresLogin from '../hoc/requireLogin'
import EditForm from './editForm'
import './single-board.css'
export class SingleBoard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			location: null
		}
	}
	render() {
		return (
			<div className="single-board-container">
				<SingleBoardHeader location={this.state.location} />
				<main>
					<Switch>
						<Route path="/single-board/:id/requests" component={Request} />
						<Route path="/single-board/:id/edit" component={EditForm} />
						<Route path="/single-board/:id/match" component={Match} />
					</Switch>
				</main>
			</div>
		)
	}
}

export default RequiresLogin()(SingleBoard)
