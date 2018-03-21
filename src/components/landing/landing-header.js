import React from 'react'
import './landing-header.css'
export default function LandingHeader(props) {
	const { filter, opacityValue, height } = props
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
		<header style={styles.containerHeight} className="landing-header">
			<img
				style={styles}
				className="landing-icon"
				src="/images/logo.png"
				alt="logo"
			/>
		</header>
	)
}
