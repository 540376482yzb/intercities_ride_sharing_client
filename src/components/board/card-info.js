/* global moment */
import React from 'react'
import './card-info.css'
import * as moment from 'moment'
import ArrowDown from 'react-icons/lib/io/ios-arrow-thin-down'
import {Button} from '../utilities'
import Alert from 'react-icons/lib/io/ios-circle-filled'
import {
	deleteRide,
	requestMatchLock,
	requestMatchUnLock,
	fetchRide,
	fetchRideSuccess,
	deleteRideSuccess
} from '../../actions/rides'
import {fetchUser, fetchUserSuccess, askForRideSuccess} from '../../actions/auth'
import {connect} from 'react-redux'

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser,
		socket: state.socket.socket
	}
}

export default class CardInfo extends React.Component {
	render() {
		const {ride, requested, isMatch, isDriver, users, onlineUsers} = this.props
		const userName = `${ride.driver.firstName}`

		const render = (
			<section>
				{/* expand button - show more content */}
				<CardContent
					ride={ride}
					requested={requested}
					isMatch={isMatch}
					isDriver={isDriver}
					onClick={e => this.props.onClick(e)}
				/>
			</section>
		)
		return (
			<div className="card-info-container">
				{users ? (
					<CardUserInfo users={users} onlineUsers={onlineUsers} ride={ride} />
				) : (
					<CardUserInfo
						user1={{
							userName,
							rating: ride.driver.rating,
							avatar: 'images/man.svg'
						}}
					/>
				)}

				<main className="content-container">
					<CardJourney ride={ride} />
					{render}
				</main>
			</div>
		)
	}
}

export const CardContent = connect(mapStateToProps)(props => {
	const {ride, requested, isDriver, isMatch, dispatch, currentUser} = props
	const handleLock = () => {
		return dispatch(requestMatchLock(ride.id)).catch(err => alert('something is not right'))
	}
	const handleUnLock = () => {
		return dispatch(requestMatchUnLock(ride.id)).catch(err => alert('something is not right'))
	}
	const renderLockBtn = () => {
		if (ride.match.length >= ride.maxOccupancy) return 'full'
		if (ride.lock) return <Button label="Unlock" color="white" onClick={() => handleUnLock()} />
		return <Button label="Lock in" color="red" onClick={() => handleLock()} />
	}
	const handleDelete = () => {
		return dispatch(deleteRide(ride.id, currentUser.id))
			.then(() => dispatch(deleteRideSuccess()))
			.then(() => dispatch(fetchUser(currentUser.id)))
			.then(user => dispatch(fetchUserSuccess(user)))
			.catch(err => alert('something is not right'))
	}

	const handleRequest = () => {
		const {ride, currentUser, socket, dispatch} = props
		socket.emit('REQUEST_RIDE', {
			roomId: ride.id,
			message: {type: 'application', user: currentUser, completed: false},
			createdOn: Date.now()
		})
		dispatch(askForRideSuccess(ride.id))
	}
	let renderBtn = ''
	if (requested) renderBtn = <div className="card-info-alter">Requested</div>
	else if (isMatch) {
		if (currentUser.host) {
			renderBtn = (
				<div>
					{renderLockBtn()}
					<Button label="End" color="blue" onClick={() => handleDelete()} />
				</div>
			)
		} else {
			renderBtn = 'Matched'
		}
	} else {
		renderBtn = (
			<Button
				label="Request"
				color="blue"
				onClick={e => {
					handleRequest()
				}}
			/>
		)
	}

	return (
		<main className="journey-info">
			<div>$ {ride.rideCost}</div>
			{renderBtn}
		</main>
	)
})

//@props(mutiUser, object: user1(userName,rating), object: user1(userName,rating))
export function CardUserInfo(props) {
	const {user1, users, onlineUsers, ride} = props
	function getRating(value) {
		switch (value) {
		case 1:
			return '★☆☆☆☆'
		case 2:
			return '★★☆☆☆'
		case 3:
			return '★★★☆☆'
		case 4:
			return '★★★★☆'
		case 5:
			return '★★★★★'
		default:
			return '★★★★★'
		}
	}
	function renderRating(rating) {
		return (
			<span style={{color: 'orange', fontSize: '1.2rem'}}>{`${getRating(Number(rating))}`}</span>
		)
	}
	function renderMatchUsers(users) {
		return (
			<header className="user-container">
				{ride.match.length < ride.maxOccupancy ? (
					<div className="user-occupation">
						{ride.match.length} / <span>{ride.maxOccupancy}</span>
					</div>
				) : (
					''
				)}

				{users.map((user, index) => {
					return (
						<section className={user.host ? 'user-entry driver' : 'user-entry'} key={index}>
							<Alert
								className={
									onlineUsers.find(data => data.user === user.id)
										? 'user-status online'
										: 'user-status'
								}
							/>
							<div className={'thumbnail-container'}>
								<img src={'images/man.svg'} alt="avatar" className="user-avatar" />
							</div>
							<div>{user.firstName}</div>
						</section>
					)
				})}
			</header>
		)
	}
	if (users) {
		return renderMatchUsers(users)
	}
	return (
		<header className={'title-container'}>
			<div className={'thumbnail-container'}>
				<img src={'images/man.svg'} alt="avatar" className="user-avatar" />
			</div>
			<div className="title-bar">
				<header className="title-bar-sub1">{user1.userName}</header>
				<div className="title-bar-sub2">{renderRating(user1.rating)}</div>
			</div>
		</header>
	)
}

//@params ride
export function CardJourney(props) {
	const {ride, ...otherProps} = props
	return (
		<main className="card-info-direction-container">
			<section className="line-container">
				<div className="dot" />
				<div className="vertical" />
				<div className="dot" />
			</section>
			<section>
				<div className="card-info-direction-text">
					<p>
						{ride.startCity},{ride.startState}
					</p>
					<i>
						leave on{' '}
						<span className="card-info-time">
							{moment(Number(ride.scheduleDate)).format('MMM Do')}
						</span>
					</i>
				</div>
				<div className="card-info-direction-text">
					<p>
						{ride.arriveCity},{ride.arriveState}
					</p>
				</div>
			</section>
		</main>
	)
}
