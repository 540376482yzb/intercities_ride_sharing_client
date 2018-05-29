import React from 'react'
import Message from 'react-icons/lib/io/ios-email-outline'
import Person from 'react-icons/lib/io/android-person'
import Alert from 'react-icons/lib/io/ios-circle-filled'
import Search from 'react-icons/lib/io/android-search'
import { searchOpen, searchClose } from '../../actions/utils'
import { userLogOut } from '../../actions/auth'
import { connect } from 'react-redux'
import './BoardHead.css'
import { Button } from '../utilities'
export function MatchHead(props) {
	const { dispatch, currentUser } = props
	return (
		<nav className="nav-container">
			<section className="nav-brand">
				<div className="nav-img-container">
					<img src="images/car.png" alt="logo" width="50px" />
				</div>
				<span className="match-tag">Match</span>
			</section>
			<section className="nav-title">Ride & Share</section>
			<section className="nav-icons">
				<Button label="Log out" color="blue" onClick={() => dispatch(userLogOut())} />
				<div>Hello, {currentUser.firstName}</div>
			</section>
		</nav>
	)
}

export default connect()(MatchHead)
