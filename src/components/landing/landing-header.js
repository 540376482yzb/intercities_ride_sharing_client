import React from 'react'
import './landing-header.css'
import { withRouter } from 'react-router-dom'
import { Landing } from './landing'
export class LandingHeader extends React.Component {
	render() {
		const { filter, opacityValue, height } = this.props
		let styles = {}
		if (filter) {
			styles.filter = 'invert(1)'
		}
		if (opacityValue) {
			styles.opacity = opacityValue
		}
		if (height) {
			styles.height = `${Number(height) / 2}rem`
			styles.containerHeight = { height: `${height}rem` }
		}
		return (
			<header
				style={styles.containerHeight}
				className="landing-header"
				onClick={() => this.props.history.push('/landing')}
			>
				<img
					style={styles}
					className="landing-icon"
					src="/images/logo.png"
					alt="logo"
				/>
			</header>
		)
	}
}

export default withRouter(LandingHeader)
