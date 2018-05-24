import React from 'react'
import './Overlay.css'
import { Button } from '../utilities'
import { searchClose, searchOpen } from '../../actions/utils'
import { connect } from 'react-redux'
export function Overlay(props) {
	const { dispatch } = props
	return (
		<main className="overlay-container">
			<section className="overlay-message">
				<div className="overlay-nav">
					<Button label="Back" color="white" onClick={() => dispatch(searchClose())} />
				</div>
				{props.children}
			</section>
		</main>
	)
}

export default connect()(Overlay)
