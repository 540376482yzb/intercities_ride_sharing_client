import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hostFormOpen, hostFormClose } from '../../actions/rides'
import { addRide } from '../../actions/rides'
import jwtDecode from 'jwt-decode'
import GenericForm from './generic-form'
export class HostForm extends React.Component {
	handleOpen = () => {
		this.props.dispatch(hostFormOpen())
	}
	handleClose = () => {
		this.props.dispatch(hostFormClose())
	}

	render() {
		return (
			<div>
				<Dialog
					title="Dialog With Custom Width"
					modal={true}
					open={this.props.hostForm}
					contentStyle={{ width: '350px' }}
				>
					<GenericForm driver={this.props.driver} />
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		driver: jwtDecode(state.auth.authToken).user.id,
		hostForm: state.rideReducer.hostForm
	}
}

export default connect(mapStateToProps)(HostForm)
