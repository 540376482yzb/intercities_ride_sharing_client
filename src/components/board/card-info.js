/* global moment */
import React from 'react'
import './card-info.css'
import * as moment from 'moment'
export default class CardInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expand: false
		}
	}

	render() {
		const { ride, requested, isHost } = this.props
		const userName = `${ride.driver.firstName} ${ride.driver.lastName}`
		const expandable = (
			<div
				className="expandable-container"
				style={this.state.expand ? { display: 'block' } : { display: 'none' }}
			>
				<CardContent
					ride={ride}
					requested={requested}
					isHost={isHost}
					onClick={e => this.props.onClick(e)}
				/>

				{/* collapse button - hide content */}
				<button
					className="control-btn"
					onClick={() => this.setState({ expand: false })}
				>
					<img
						className="control-btn-icon"
						src="/images/double-up.svg"
						alt="collapse"
					/>
				</button>
			</div>
		)
		const render = (
			<section>
				{/* expand button - show more content */}
				<button
					className="control-btn"
					style={this.state.expand ? { display: 'none' } : { display: 'block' }}
					onClick={() => this.setState({ expand: true })}
				>
					<img
						src="/images/double-down.svg"
						alt="down-arrow"
						className="control-btn-icon"
					/>
				</button>

				{expandable}
			</section>
		)
		return (
			<div>
				<CardUserInfo
					user1={{
						userName,
						rating: ride.driver.rating,
						avatar: '/images/man.svg'
					}}
				/>
				<hr className="style-two" />
				<main className="content-container">
					<CardJourney ride={ride} />
					{/* expandable menu */}
					{render}
				</main>
			</div>
		)
	}
}

// @props(ride,requested,isHost,matchedRide, onClick(e))
export function CardContent(props) {
	const {
		ride,
		requested,
		isHost,
		matchedRide,
		userInfoClassName,
		...otherProps
	} = props
	const renderBtn = matchedRide ? (
		<button
			className="cancelBtn"
			disabled={isHost ? false : true}
			onClick={e => {
				props.onClick(e)
			}}
		>
			Cancel
		</button>
	) : (
		<button
			className="requestBtn"
			disabled={requested || isHost ? true : false}
			onClick={e => {
				props.onClick(e)
			}}
		>
			Request
		</button>
	)
	return (
		<main className="journey-info">
			<div className="fare-cost-frame">
				<div className="chip" style={{ backgroundColor: 'orange' }}>
					<strong>Fare Cost is ${ride.rideCost}</strong>
				</div>
			</div>
			<div className="rule-frame">
				<header className="rule-title"> {'> Rules to follow <'}</header>
				<p>{ride.disClaimer}</p>
			</div>
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
			<span style={{ color: 'orange', fontSize: '1.2rem' }}>
				{`${getRating(Number(rating))}`}
			</span>
		)
	}
	const { multiUser, user1, user2, userInfoClassName, ...otherProps } = props
	const renderSecondUser = multiUser ? (
		<section className="title-header">
			<div className="avatar-frame">
				<div className="thumbnail">
					<img className="avatar-img" src={user2.avatar} alt="avatar" />
				</div>
			</div>
			<div className="title-bar">
				<header className="title-bar-sub1">
					<h3>{user2.userName}</h3>
				</header>
				<div className="title-bar-sub2">{renderRating(user2.rating)}</div>
			</div>
		</section>
	) : (
		undefined
	)
	return (
		<header className={multiUser ? 'title-container ' : ''}>
			<section className={multiUser ? 'title-header spliter' : 'title-header '}>
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
			{renderSecondUser}
		</header>
	)
}

//@params ride
export function CardJourney(props) {
	const { ride, ...otherProps } = props
	return (
		<section>
			<div className="shortDesc">
				<span className="shortDesc-prefix">FROM</span>
				<span className="shortDesc-suffix">
					<div className="chip" style={{ backgroundColor: '#42A76D' }}>{`${
						ride.startCity
					},${ride.startState}`}</div>
				</span>
			</div>
			<div className="shortDesc">
				<span className="shortDesc-prefix">TO</span>
				<span className="shortDesc-suffix">
					<div className="chip" style={{ backgroundColor: '#3595D7' }}>{`${
						ride.arriveCity
					},${ride.arriveState}`}</div>
				</span>
			</div>
			<div className="date">
				<span className="date-prefix">DEPART</span>
				<span className="date-suffix">
					<div className="chip" style={{ backgroundColor: '#ffb116' }}>
						{`${moment(ride.scheduleDate).fromNow()}`}
					</div>
				</span>
			</div>
		</section>
	)
}
