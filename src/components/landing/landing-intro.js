import React from 'react'
import './landing-intro.css'
import { Button } from '../utilities'
import { withRouter } from 'react-router-dom'
export class Intro extends React.Component {
	render() {
		return (
			<main>
				<div className="landing-desc">
					<p>In a Journey of Joys, Surprises and Companionship</p>
				</div>
				<div className="landing-btn-container">
					<Button
						label="Join us"
						color="blue"
						onClick={() => {
							this.props.history.push('/landing/login')
						}}
					/>
				</div>
			</main>
		)
	}
}

export default withRouter(Intro)
