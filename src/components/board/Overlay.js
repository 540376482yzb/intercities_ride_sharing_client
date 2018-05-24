import React from 'react'
import './Overlay.css'
export default function Overlay(props) {
	return (
		<main className="overlay-container">
			<div className="overlay-message">{props.children}</div>
		</main>
	)
}
