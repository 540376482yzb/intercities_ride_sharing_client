import React from 'react'
import Message from 'react-icons/lib/io/ios-email-outline'
import MatchRoom from 'react-icons/lib/io/android-car'
import Person from 'react-icons/lib/io/android-person'
import Alert from 'react-icons/lib/io/ios-circle-filled'
import './BoardHead.css'
export default function BoardHeader(props) {
	return (
		<nav className="nav-container">
			<section className="nav-brand">Ride & Share</section>

			<section className="nav-icons">
				<a className="nav-item">
					<Person size={35} className="nav-person" />
					<span>Account</span>
				</a>
				<a className="nav-item">
					<MatchRoom size={35} className="nav-room nav-disabled" />
					<span>Match</span>
				</a>
				<a className="nav-item">
					<Alert className="nav-alert" size={20} />
					<Message size={35} className="nav-message" />
					<span>Message</span>
				</a>
			</section>
		</nav>
	)
}
