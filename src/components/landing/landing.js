import React from 'react'
import './landing.css'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Intro from './landing-intro'
import TabForm from './landing-form'
import LandingHeader from './landing-header'
export class Landing extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (!this.props.authToken && nextProps.authToken) {
			this.props.history.push('/board')
		}
	}
	render() {
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

const mapStateToProps = state => {
	return {
		authToken: state.auth.authToken
	}
}

export default withRouter(connect(mapStateToProps)(Landing))
