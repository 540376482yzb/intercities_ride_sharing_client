import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import SelectInput from './select-input'
import { Field, reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hostFormOpen, hostFormClose } from '../../actions/rides'
import DatePicker from 'material-ui/DatePicker'
const customStyle = { width: '50%', display: 'inline-block' }

export class HostForm extends React.Component {
	handleOpen = () => {
		this.props.dispatch(hostFormOpen())
		// this.setState({ open: true })
	}

	handleClose = () => {
		this.props.dispatch(hostFormClose())
		// this.setState({ open: false })
	}
	onSubmit(value) {
		//Toto add async action update car-pool results
		// this.props.dispatch(addRide())
		console.log(value)
	}

	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<FlatButton
				label="Submit"
				primary={true}
				onClick={this.props.handleSubmit(value => this.onSubmit(value))}
			/>
		]

		return (
			<div>
				<Dialog
					title="Dialog With Custom Width"
					actions={actions}
					modal={true}
					open={this.props.open}
					contentStyle={{ width: '400px' }}
				>
					<form
						onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}
					>
						<div>
							<Field
								component={SelectInput}
								floatingLabelText="FROM"
								floatingLabelStyle={{ color: '#04BDD5' }}
								name="from"
							>
								<MenuItem value="los angeles" primaryText="LOS ANGELES" />
								<MenuItem value="san jose" primaryText="SAN JOSE" />
								<MenuItem value="san diego" primaryText="SAN DIEGO" />
								<MenuItem value="sacramento" primaryText="SACRAMENTO" />
								<MenuItem value="utah" primaryText="UTAH" />
							</Field>
						</div>
						<div>
							<Field
								component={SelectInput}
								floatingLabelText="TO"
								floatingLabelStyle={{ color: '#04BDD5' }}
								name="destination"
							>
								<MenuItem value="los angeles" primaryText="LOS ANGELES" />
								<MenuItem value="san jose" primaryText="SAN JOSE" />
								<MenuItem value="san diego" primaryText="SAN DIEGO" />
								<MenuItem value="sacramento" primaryText="SACRAMENTO" />
								<MenuItem value="utah" primaryText="UTAH" />
							</Field>
						</div>
						<div>
							<Field
								component={DatePicker}
								floatingLabelText="Schedule Date"
								name="scheduleDate"
								floatingLabelStyle={{ color: '#04BDD5' }}
								hintText="Pick a Date in the Future"
								container="inline"
							/>
						</div>
						<div>
							<Field
								component={SelectInput}
								floatingLabelText="RIDE COST"
								name="cost"
								floatingLabelStyle={{ color: '#04BDD5' }}
							>
								<MenuItem value="5" primaryText="$ 5" />
								<MenuItem value="10" primaryText="$ 10" />
								<MenuItem value="15" primaryText="$ 15" />
								<MenuItem value="20" primaryText="$ 20" />
								<MenuItem value="25" primaryText="$25" />
							</Field>
						</div>
						<div>
							<Field
								component={TextField}
								floatingLabelText="Disclaimer"
								floatingLabelStyle={{ color: '#04BDD5' }}
								name="rules"
								id="rules"
								fullWidth={true}
								multiLine={true}
								rows={4}
							/>
						</div>
					</form>
				</Dialog>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		open: state.rideReducer.hostForm
	}
}
export default withRouter(
	reduxForm({
		form: 'host-form'
	})(connect(mapStateToProps)(HostForm))
)
