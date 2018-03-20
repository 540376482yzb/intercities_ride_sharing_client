import React from 'react'
import { connect } from 'react-redux'
import { acceptRide } from '../../actions/rides'
import { sentLocation } from '../../actions/location'
import { CardUserInfo } from '../board/card-info'
import FlatButton from 'material-ui/FlatButton'
export class Request extends React.Component {
	onAcceptRide(e) {
		const driverId = this.myRide.driver.id
		const passengerId = e.currentTarget.closest('li').id
		console.log(driverId, passengerId)
		this.props.dispatch(acceptRide(driverId, passengerId, this.rideId))
		this.props.history.push('/board')
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
				const userName = `${list.firstName} ${list.lastName}`
				return (
					<li key={index} id={list.id} style={{ listStyle: 'none' }}>
						<CardUserInfo
							user1={{
								userName,
								rating: list.rating,
								avatar: '/images/girl.svg'
							}}
						/>
						<FlatButton
							label="Accept"
							labelStyle={{ color: '#42A5F5' }}
							onClick={e => {
								this.onAcceptRide(e)
							}}
						/>
						<FlatButton label="Decline" />
					</li>
				)
			})
		}
		return <ul style={{ paddingLeft: '0' }}>{renderList}</ul>
	}
}
const mapStateToProps = state => {
	return {
		allRides: state.rideReducer.rides
	}
}
export default connect(mapStateToProps)(Request)
