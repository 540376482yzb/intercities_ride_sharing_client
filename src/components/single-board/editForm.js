import React from 'react'
import { sentLocation } from '../../actions/location'
import { connect } from 'react-redux'
import Form from './edit-form'
export class EditForm extends React.Component {
	getLocation() {
		const locations = this.props.match.path.split('/')
		this.props.dispatch(
			sentLocation(`${locations[locations.length - 1].toUpperCase()}...`)
		)
	}
	render() {
		this.getLocation()
		this.rideId = this.props.match.params.id
		if (this.props.rides) {
			const myRide = this.props.rides.find(ride => ride.id === this.rideId)
			const { requests, match, id, ...prepareForm } = myRide
			return (
				<div style={{ width: '340px', margin: '2rem auto' }}>
					<Form
						startLabel="Start city"
						arriveLabel="Arrive city"
						costLabel="How much do you charge?"
						dateLabel="When does it happen?"
						prepareForm={prepareForm}
					/>
				</div>
			)
		}
		return <div />
	}
}

const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides
	}
}

export default connect(mapStateToProps)(EditForm)
