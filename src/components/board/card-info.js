/* global moment */
import React from 'react'
import './card-info.css'
import * as moment from 'moment'
import ArrowDown from 'react-icons/lib/io/ios-arrow-thin-down'
import { Button } from '../utilities'
export default class CardInfo extends React.Component {
	render() {
		const { ride, requested, isHost } = this.props
		const userName = `${ride.driver.firstName} ${ride.driver.lastName}`
		const render = (
			<section>
				{/* expand button - show more content */}
				<CardContent
					ride={ride}
					requested={requested}
					isHost={isHost}
					onClick={e => this.props.onClick(e)}
				/>
			</section>
		)
		return (
			<div className="card-info-container">
				<CardUserInfo
					user1={{
						userName,
						rating: ride.driver.rating,
						avatar: '/images/man.svg'
					}}
				/>
				<main className="content-container">
					<CardJourney ride={ride} />
					{render}
				</main>
			</div>
		)
	}
}

// @props(ride,requested,isHost,matchedRide, onClick(e))
export function CardContent(props) {
	const { ride, requested, isHost, isDriver, userInfoClassName, ...otherProps } = props
	let renderBtn = ''
	if (isDriver) renderBtn = <div className="card-info-alter">Hosting</div>
	else if (requested) renderBtn = <div className="card-info-alter">Requested</div>
	else {
		renderBtn = (
			<Button
				label="Request"
				color="blue"
				disabled={requested || isHost ? true : false}
				onClick={e => {
					props.onClick(e)
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
}

//@props(mutiUser, object: user1(userName,rating), object: user1(userName,rating))
export function CardUserInfo(props) {
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
			<span style={{ color: 'orange', fontSize: '1.2rem' }}>{`${getRating(Number(rating))}`}</span>
		)
	}
	const { user1, userInfoClassName, ...otherProps } = props

	return (
		<header className={'title-container '}>
			<section className={'title-header '}>
				<div className="avatar-frame">
					<div className="thumbnail">
						<img className="avatar-img" src={user1.avatar} alt="avatar" />
					</div>
				</div>
				<div className="title-bar">
					<header className="title-bar-sub1">
						<h3>{user1.userName}</h3>
					</header>
					<div className="title-bar-sub2">{renderRating(user1.rating)}</div>
				</div>
			</section>
		</header>
	)
}

//@params ride
export function CardJourney(props) {
	const { ride, ...otherProps } = props
	return (
		<main className="card-info-direction-container">
			<section className="line-container">
				<div className="dot" />
				<div className="vertical" />
				<div className="dot" />
			</section>
			<section>
				<div className="card-info-direction-text">
					<p>{ride.startCity}</p>
					<i>{ride.scheduleDate}</i>
				</div>
				<div className="card-info-direction-text">
					<p>{ride.arriveCity}</p>
				</div>
			</section>
		</main>
	)
}
