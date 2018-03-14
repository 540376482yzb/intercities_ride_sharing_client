import React from 'react'
import './landing.css'
import { Route } from 'react-router-dom'
import Intro from './landing-intro'
import Form from './landing-form'
import LandingHeader from './landing-header'
export default class Landing extends React.Component {
	render() {
		return (
			<div className="landing">
				<LandingHeader height={6}/>
				<main className="landing-content">
					<div className="landing-title">
						<h2>Sharing A Ride</h2>
					</div>
					<div className="landing-swap">
						<Route exact path="/landing" component={Intro} />
						<Route path="/landing/secure" component={Form} />
					</div>
				</main>
			</div>
		)
	}
}