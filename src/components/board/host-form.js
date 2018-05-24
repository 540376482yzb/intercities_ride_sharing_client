import React from 'react'

import { connect } from 'react-redux'
import { hostOpen, hostClose } from '../../actions/utils'
import jwtDecode from 'jwt-decode'
import CreateForm from './create-form'
export class HostForm extends React.Component {
	render() {
		const driver = jwtDecode(this.props.authToken).user.id
		return (
			<CreateForm
				startLabel="Start city"
				arriveLabel="Arrive city"
				costLabel="How much do you charge?"
				dateLabel="When does it happen?"
				driver={driver}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.authToken,
		hostForm: state.rideReducer.hostForm
	}
}

export default connect(mapStateToProps)(HostForm)
