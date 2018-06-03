import React from 'react'
import './landing-header.css'
import { withRouter } from 'react-router-dom'
import { Landing } from './landing'
export class LandingHeader extends React.Component {
	render() {
		return (
			<header
				className="landing-header"
				onClick={() => this.props.history.push('/landing')}
			>
				<img
					className="landing-icon"
					src="/images/logo.png"
					alt="logo"
				/>
				<h3 className="landing-title">Ride & Share</h3>
			</header>
		)
	}
}

export default withRouter(LandingHeader)
