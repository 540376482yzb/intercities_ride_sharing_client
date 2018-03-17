import React from 'react'
import { connect } from 'react-redux'
import { acceptRide } from '../../actions/rides'
import { sentLocation } from '../../actions/location'
export class Request extends React.Component {
	onAcceptRide(e) {
		const driverId = this.myRide.driver.id
		const passengerId = e.currentTarget.closest('li').id
		console.log(driverId, passengerId)
		this.props.dispatch(acceptRide(driverId, passengerId, this.rideId))
		this.props.history.push(`/single-board/${this.rideId}/match`)
	}
	getLocation() {
		const locations = this.props.match.path.split('/')
		this.props.dispatch(sentLocation(locations[locations.length - 1]))
	}
	render() {
		this.getLocation()
		this.rideId = this.props.match.params.id
		this.myRide = this.props.allRides.find(ride => ride.id === this.rideId)
		const lists = this.myRide.requests
		let renderList = ''
		if (lists) {
			renderList = lists.map((list, index) => {
				return (
					<li key={index} id={list.id}>
						<h4>{`${list.firstName} ${list.lastName}`}</h4>
						<h6>{`${list.rating}`}</h6>
						<button
							onClick={e => {
								this.onAcceptRide(e)
							}}
						>
							Accept
						</button>
						<button>Decline</button>
					</li>
				)
			})
		}
		return <ul>{renderList}</ul>
	}
}
const mapStateToProps = state => {
	return {
		allRides: state.rideReducer.rides
	}
}
export default connect(mapStateToProps)(Request)
