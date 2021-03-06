import React from 'react'
import Message from 'react-icons/lib/io/ios-email-outline'
import Person from 'react-icons/lib/io/android-person'
import Search from 'react-icons/lib/io/android-search'
import { searchOpen, searchClose } from '../../actions/utils'
import { userLogOut } from '../../actions/auth'
import './BoardHead.css'
import { Button } from '../utilities'
import { connect } from 'react-redux'
export function BoardHeader(props) {
	const { dispatch, currentUser } = props
	return (
		<nav className="nav-container">
			<section className="nav-brand">
				<div className="nav-img-container">
					<img src="images/car.png" alt="logo" width="50px" />
				</div>
				<a className="nav-item gone" onClick={() => dispatch(searchOpen())}>
					<Search size={35} className="nav-search" />
				</a>
				<div className="nav-tag">Dashboard</div>
			</section>
			<section className="nav-title">Ride & Share</section>
			<section className="nav-icons">
				{' '}
				<Button label="Log out" color="blue" onClick={() => dispatch(userLogOut())} />
				<div>Hello, {currentUser.firstName}</div>
			</section>
		</nav>
	)
}

export default connect()(BoardHeader)
