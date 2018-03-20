import React from 'react'
import { connect } from 'react-redux'
import { fetchRide, cancelMatch } from '../../actions/rides'
import { sentLocation } from '../../actions/location'
import { withRouter } from 'react-router-dom'
import { CardUserInfo, CardContent, CardJourney } from '../board/card-info'
import './match.css'
export class Match extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchRide(this.rideId))
	}
	getLocation() {
		const locations = this.props.match.path.split('/')
		this.props.dispatch(sentLocation(locations[locations.length - 1]))
	}
	getRating(value) {
		switch (Number(value)) {
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

	onCancelMatch() {
		this.props.history.push('/board')
		this.props.dispatch(cancelMatch(this.props.matchedRide))
	}
	render() {
		if (!this.props.currentUser || !this.props.currentUser.match)
			return <h2>No match was found</h2>
		this.getLocation()
		this.rideId = this.props.match.params.id
		let renderUserInfo = ''
		let renderJourneyInfo = ''
		let renderContent = ''
		if (this.props.matchedRide) {
			this.host = this.props.matchedRide.match[0]
			this.passenger = this.props.matchedRide.match[1]
			const hostUserName = `${this.host.firstName} ${this.host.lastName}`
			const passengerUserName = `${this.passenger.firstName} ${
				this.passenger.lastName
			}`
			renderUserInfo = (
				<CardUserInfo
					multiUser={true}
					user1={{
						userName: hostUserName,
						rating: this.host.rating,
						avatar: '/images/man.svg'
					}}
					user2={{
						userName: passengerUserName,
						rating: this.passenger.rating,
						avatar: '/images/man.svg'
					}}
				/>
			)
			renderJourneyInfo = <CardJourney ride={this.props.matchedRide} />
			this.isHost = this.host.id === this.props.currentUser.id
			renderContent = (
				<CardContent
					matchedRide={true}
					isHost={this.isHost}
					ride={this.props.matchedRide}
					onClick={e => this.onCancelMatch()}
				/>
			)
		}
		return (
			<div className="match-board-container">
				{renderUserInfo}
				<hr />
				<br />
				{renderJourneyInfo}
				<br />
				{renderContent}
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		matchedRide: state.rideReducer.matchedRide,
		currentUser: state.auth.currentUser
	}
}
export default withRouter(connect(mapStateToProps)(Match))
