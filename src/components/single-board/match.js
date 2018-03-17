import React from 'react'
import { connect } from 'react-redux'
import { fetchRide } from '../../actions/rides'
import { sentLocation } from '../../actions/location'
import * as moment from 'moment'
export class Match extends React.Component {
	componentDidMount() {
		console.log(this.rideId)
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
	render() {
		this.getLocation()
		this.rideId = this.props.match.params.id
		let renderHostInfo = ''
		let renderPassengerInfo = ''
		let renderJourneyInfo = ''
		if (this.props.matchedRide) {
			const host = this.props.matchedRide.match[0]
			renderHostInfo = (
				<header>
					<span>{`${host.firstName} ${host.lastName}`}</span>
					<span>{`${this.getRating(host.rating)}`}</span>
				</header>
			)
			const passenger = this.props.matchedRide.match[1]
			renderPassengerInfo = (
				<header>
					<span>{`${passenger.firstName} ${passenger.lastName}`}</span>
					<span>{`${this.getRating(passenger.rating)}`}</span>
				</header>
			)
			renderJourneyInfo = (
				<main>
					<section>
						<div>From</div>
						<div>{`${this.props.matchedRide.startCity}, ${
							this.props.matchedRide.startState
						}`}</div>
						<div>To</div>
						<div>{`${this.props.matchedRide.arriveCity}, ${
							this.props.matchedRide.arriveState
						}`}</div>
					</section>
					<section>
						<div>Journey will start on </div>
						<div>{`${moment(this.props.matchedRide.scheduleDate).format(
							'MM DD YYYY'
						)}`}</div>
					</section>
					<article>
						<div>Fare Cost: $ {`${this.props.matchedRide.rideCost}`}</div>
						<h4>Rules:</h4>
						<p>{`${this.props.matchedRide.disClaimer}`}</p>
					</article>
				</main>
			)
		}
		return (
			<div>
				{renderHostInfo}
				{renderPassengerInfo}
				{renderJourneyInfo}
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		matchedRide: state.rideReducer.matchedRide
	}
}
export default connect(mapStateToProps)(Match)
