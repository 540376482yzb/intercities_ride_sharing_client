import React from 'react'
import Dialog from 'material-ui/Dialog'
import * as moment from 'moment'
// import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { hostFormOpen, hostFormClose } from '../../actions/rides'
import GenericForm from './generic-form'
import jwtDecode from 'jwt-decode'
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
					<GenericForm
						driver={driver}
						initialValues={{ scheduleDate: moment().format() }}
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
