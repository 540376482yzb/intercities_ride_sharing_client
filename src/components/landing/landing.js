import React from 'react'
import './landing.css'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Intro from './landing-intro'
import TabForm from './landing-form'
import LandingHeader from './landing-header'
import Loader from '../loader'
export class Landing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true
		}
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false })
		}, 1000)
	}
	render() {
		if (this.state.loading) return <Loader />
		return (
			<div className="landing">
				<LandingHeader height={6} />
				<main className="landing-content">
					<div className="landing-title">
						<h2>Sharing A Ride</h2>
					</div>
					<div className="landing-swap">
						<Route exact path="/landing" component={Intro} />
						<Route path="/landing/secure" component={TabForm} />
					</div>
				</main>
			</div>
		)
	}
}

export default withRouter(connect()(Landing))
