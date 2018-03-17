import React from 'react'
// import RaisedButton from 'material-ui/RaisedButton'
import SelectInput from './select-input'
import { Field, reduxForm, reset } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
// import TextField from 'material-ui/TextField'
import { withRouter } from 'react-router-dom'
import { hostFormClose } from '../../actions/rides'
import TextInput from '../landing/input-text'
import DateInput from './datePicker'
import { addRide } from '../../actions/rides'
import { editRide } from '../../actions/rides'
// import jwtDecode from 'jwt-decode'
import FlatButton from 'material-ui/FlatButton'
export class GenericForm extends React.Component {
	onSubmit(value) {
		const {
			startCity,
			startState,
			arriveCity,
			arriveState,
			scheduleDate,
			rideCost,
			disClaimer
		} = value
		const submitForm = {
			startCity,
			startState,
			arriveCity,
			arriveState,
			scheduleDate,
			rideCost,
			driver: this.props.driver,
			disClaimer
		}

		const currentRoute = this.props.match.url
		if (currentRoute === '/board') {
			this.props.dispatch(addRide(submitForm))
			this.props.dispatch(hostFormClose())
		} else {
			this.sendEditRequest(submitForm)
		}
	}
	async sendEditRequest(form) {
		const rideId = this.props.match.params.id
		const results = await this.props.dispatch(editRide(rideId, form))
		this.props.history.push('/board')
	}
	render() {
		let renderCancelBtn = ''
		if (this.props.match.url === '/board') {
			renderCancelBtn = (
				<FlatButton
					label="Cancel"
					type="button"
					primary={true}
					onClick={() => {
						this.props.dispatch(hostFormClose())
					}}
				/>
			)
		}

		return (
			<form onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
				<div>
					<header>Start From </header>
					<div style={{ width: '70%', display: 'inline-block' }}>
						<Field
							component={TextInput}
							label="City"
							hintText="Sacramento"
							floatingLabelFixed={true}
							floatingLabelStyle={{ color: '#04BDD5' }}
							name="startCity"
						/>
					</div>
					<div style={{ width: '30%', display: 'inline-block' }}>
						<Field
							component={TextInput}
							label="State"
							hintText="CA"
							floatingLabelFixed={true}
							floatingLabelStyle={{ color: '#04BDD5' }}
							name="startState"
						/>
					</div>
				</div>
				<br />
				<div>
					<header>Going to </header>
					<div style={{ width: '70%', display: 'inline-block' }}>
						<Field
							component={TextInput}
							label="City"
							hintText="San Francisco"
							floatingLabelFixed={true}
							floatingLabelStyle={{ color: '#04BDD5' }}
							name="arriveCity"
						/>
					</div>
					<div style={{ width: '30%', display: 'inline-block' }}>
						<Field
							component={TextInput}
							label="State"
							hintText="CA"
							floatingLabelFixed={true}
							floatingLabelStyle={{ color: '#04BDD5' }}
							name="arriveState"
						/>
					</div>
				</div>

				<div>
					<Field
						component={DateInput}
						label="Schedule Date"
						name="scheduleDate"
						id="scheduleDate"
						floatingLabelStyle={{ color: '#04BDD5' }}
					/>
				</div>
				<div>
					<Field
						component={SelectInput}
						floatingLabelText="How much do you charge?"
						name="rideCost"
						id="rideCost"
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
						component={TextInput}
						label="rules"
						floatingLabelStyle={{ color: '#04BDD5' }}
						name="disClaimer"
						id="disClaimer"
						multiLine={true}
					/>
				</div>
				<div>
					<FlatButton
						label="Submit"
						type="submit"
						primary={true}
						onClick={() => {
							if (this.props.match.url === '/board')
								this.props.dispatch(hostFormClose())
						}}
					/>
					{renderCancelBtn}
				</div>
			</form>
		)
	}
}

//make this configurable props function
const afterSubmit = (result, dispatch) => dispatch(reset('host-form'))
export default withRouter(
	reduxForm({
		form: 'host-form',
		onSubmitSuccess: afterSubmit
	})(GenericForm)
)
