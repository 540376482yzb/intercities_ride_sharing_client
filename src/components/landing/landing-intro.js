import React from 'react'
import './landing-intro.css'
import {Button} from '../utilities'
import {withRouter} from 'react-router-dom'
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
				<section className="ad-container">
					<img src="images/about1.png" alt="placeholder" className="ad-image" />
					<div className="ad-desc">
						<h3>Powered by mission</h3>
						<p>
							We have over 200 millions cars on the road every day, generating enormous amount of
							waste in resources and pollution to the environment.
						</p>
						<p>
							<span>Ride & Share</span> aims to provide community driven ride sharing service as a
							solution for greener transportation mean.
						</p>
					</div>
				</section>

				<section className="ad-container">
					<img src="images/about2.png" alt="placeholder" className="ad-image" />
					<div className="ad-desc">
						<h3>Powered by community</h3>
						<p>
							<span>Ride & Share</span> provides open community driven platform for users. Users can
							freely host or request ride from cities to cities.
						</p>
						<p>
							Built-in chat system makes communication easy and negotiation process less agonizing.
						</p>
					</div>
				</section>
				<section className="ad-container">
					<img src="images/about3.gif" alt="placeholder" className="ad-image" />
					<div className="ad-desc">
						<h3>Powered by web technology</h3>
						<p>
							The front-end technology <b>React</b> empowers <span>Ride & Share</span>, generating
							silky smooth performance. The result is a nearly native application experience.
						</p>
						<p>
							Use <b>Socket</b> technology to up the game by making every possible touch or click
							responsive, while still manage to secure data safety using <b>JWT</b> and{' '}
							<b>Bcrypt</b>.
						</p>
					</div>
				</section>
			</main>
		)
	}
}

export default withRouter(Intro)
