import React from 'react'
import GenericForm from '../board/generic-form'
import { sentLocation } from '../../actions/location'
import { connect } from 'react-redux'
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
			const { driver, requests, match, id, ...prepareForm } = myRide
			return (
				<div style={{ width: '340px', margin: '2rem auto' }}>
					<GenericForm
						initialValues={{ ...prepareForm, driver: myRide.driver.id }}
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
