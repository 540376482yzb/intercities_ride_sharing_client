import React from 'react'
import './landing-intro.css'
import RaisedButton from 'material-ui/RaisedButton'
import { withRouter } from 'react-router-dom'
import SimpleForm from '../board/simple-form'
export class Intro extends React.Component {
	render() {
		return (
			<main>
				<div className="landing-desc">
					<p>In a Journey of Joys, Surprises and Companionship</p>
				</div>
				<div className="landing-btn-container">
					<RaisedButton
						label="JOIN US"
						primary={true}
						labelStyle={{ fontSize: '1rem' }}
						onClick={() => {
							console.log('click')
							this.props.history.push('/landing/secure')
						}}
					/>
				</div>
				<SimpleForm />
			</main>
		)
	}
}
export default withRouter(Intro)
