import React from 'react'
import Dialog from 'material-ui/Dialog'
// import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { hostFormOpen, hostFormClose } from '../../actions/rides'
import jwtDecode from 'jwt-decode'
import SimpleForm from './simple-form'
export class HostForm extends React.Component {
	handleOpen = () => {
		this.props.dispatch(hostFormOpen())
	}
	handleClose = () => {
		this.props.dispatch(hostFormClose())
	}

	render() {
		const driver = jwtDecode(this.props.authToken).user.id
		return (
			<div>
				<Dialog
					title="Dialog With Custom Width"
					modal={true}
					open={this.props.hostForm}
					contentStyle={{ width: '350px' }}
				>
					<SimpleForm
						startLabel="Start city"
						arriveLabel="Arrive city"
						costLabel="How much do you charge?"
						dateLabel="When does it happen?"
						operation="host"
						driver={driver}
					/>
				</Dialog>
			</div>
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
