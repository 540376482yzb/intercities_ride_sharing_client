import React from 'react'
import './landing.css'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Intro from './landing-intro'
import LandingHeader from './landing-header'
import Loader from '../loader'
import Instruction from './Instruction'
import Login from './landing-login'
import SignUp from './landing-signup'

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
		const { currentUser, history } = this.props
		if (currentUser) {
			history.push('/board')
		}
		return (
			<main className="landing-content">
				<LandingHeader height={6} />
				<div className="landing-title">
					<h2>Sharing A Ride</h2>
				</div>
				<div className="landing-swap">
					<Route exact path="/landing" component={Intro} />
					<Route exact path="/landing/login" component={Login} />
					<Route exact path="/landing/signup" component={SignUp} />
				</div>
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser
	}
}

export default withRouter(connect(mapStateToProps)(Landing))
