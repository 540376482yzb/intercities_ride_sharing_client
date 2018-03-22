/*global google*/
import React from 'react'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import PlacesAutocomplete from 'react-places-autocomplete'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import { withRouter } from 'react-router-dom'
import { hostFormClose, fetchRides } from '../../actions/rides'
import { addRide } from '../../actions/rides'
import { editRide } from '../../actions/rides'
import { refreshAuthToken, fetchUser } from '../../actions/auth'
import TextField from 'material-ui/TextField'

const labelStyles = {
	display: 'block',
	fontWeight: '400',
	padding: '1rem 0'
}
const inputStyles = {
	input: {
		width: '90%',
		border: 0,
		borderBottom: '2px solid #00BCD4'
	},
	autocompleteContainer: {
		width: '95%',
		zIndex: '1050'
	}
	// autocompleteItem: {
	// 	backgroundColor: '#ffffff',
	// 	padding: '10px',
	// 	color: '#555555',
	// 	cursor: 'pointer'
	// },
	// autocompleteItemActive: {
	// 	backgroundColor: '#fafafa'
	// }
}
class EditForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			scheduleDate: null,
			disClaimer: ''
		}
		this.initialState = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			scheduleDate: null
		}
		this.startLocOnChange = value => this.setState({ startLoc: value })
		this.arriveLocOnChange = value => this.setState({ arriveLoc: value })
		this.handleSlider = (event, value) => this.setState({ maxCost: value })
		this.handleDisclaimer = (e, value) => this.setState({ disClaimer: value })
	}

	handleSubmit(e) {
		e.preventDefault()
		const startCityAndState = this.state.startLoc.split(',').slice(0, 2)
		const arriveCityAndState = this.state.arriveLoc.split(',').slice(0, 2)
		const simpleForm = {
			startCity: startCityAndState[0],
			startState: startCityAndState[1],
			arriveCity: arriveCityAndState[0],
			arriveState: arriveCityAndState[1]
		}
		const scheduleDate = this.state.scheduleDate
		const driver = this.props.prepareForm.driver.id
		this.handleEdit({ ...simpleForm, scheduleDate, driver })
	}

	handleEdit(submitForm) {
		const rideId = this.props.match.params.id
		this.props.dispatch(editRide(rideId, submitForm))
		this.props.history.push('/board')
	}
	componentDidMount() {
		//initial state when entering edit mode
		const {
			rideCost,
			startCity,
			startState,
			arriveCity,
			arriveState,
			scheduleDate,
			disClaimer
		} = this.props.prepareForm
		const alterState = {
			maxCost: rideCost,
			startLoc: `${startCity},${startState}`,
			arriveLoc: `${arriveCity},${arriveState}`,
			scheduleDate,
			disClaimer
		}
		this.setState(alterState)
	}
	render() {
		const { startLabel, arriveLabel, costLabel, dateLabel } = this.props
		const startLoc = {
			name: 'startLocation',
			type: 'text',
			id: 'startLocation',
			value: this.state.startLoc,
			onChange: this.startLocOnChange,
			placeholder: 'Hint: Sacramento,CA,USA'
		}
		const arriveLoc = {
			name: 'arriveLocation',
			type: 'text',
			id: 'arriveLocation',
			value: this.state.arriveLoc,
			onChange: this.arriveLocOnChange,
			placeholder: 'Hint: San Francisco,CA,USA'
		}

		const options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}

		const renderDatePicker = (
			<div>
				<label style={labelStyles} htmlFor="date">
					{dateLabel}
				</label>
				<DatePicker
					value={
						typeof this.state.scheduleDate === 'string'
							? new Date(this.state.scheduleDate)
							: this.state.scheduleDate
					}
					floatingLabelText="Date"
					id="date"
					name="date"
					onChange={(event, date) => this.setState({ scheduleDate: date })}
				/>
				<br />
			</div>
		)
		const renderDisclaimer = (
			<div>
				<label htmlFor="rules">Rules to Follow:</label>
				<TextField
					name="rules"
					id="rules"
					multiLine={true}
					fullWidth={true}
					value={this.state.disClaimer}
					onChange={this.handleDisclaimer}
				/>
			</div>
		)
		const renderCommonBtn = (
			<div>
				<RaisedButton
					label="Submit"
					labelColor="#f5f5f5"
					type="submit"
					backgroundColor="#8BC34A"
					style={{ margin: '5px 10px' }}
				/>
				<RaisedButton
					label="Cancel"
					labelColor="#f5f5f5"
					type="button"
					backgroundColor="#FFBAB3"
					style={{ margin: '5px 10px' }}
					onClick={() => this.props.dispatch(hostFormClose())}
				/>
			</div>
		)
		return (
			<form
				onSubmit={e => this.handleSubmit(e)}
				style={{ paddingBottom: '2rem' }}
			>
				<label style={labelStyles} htmlFor="startLocation">
					{startLabel}
				</label>
				<PlacesAutocomplete
					id="startLocation"
					name="startLocation"
					inputProps={startLoc}
					options={options}
					styles={inputStyles}
				/>
				<br />
				<label style={labelStyles} htmlFor="arriveLocation">
					{arriveLabel}
				</label>
				<PlacesAutocomplete
					id="arriveLocation"
					name="arriveLocation"
					inputProps={arriveLoc}
					options={options}
					styles={inputStyles}
				/>
				<br />
				{renderDatePicker}
				<label style={labelStyles} htmlFor="maxCost">
					{costLabel}
				</label>
				<div>
					<strong>Cost: $ </strong>
					{`${this.state.maxCost}`}
				</div>
				<Slider
					min={0}
					max={100}
					step={5}
					id="maxCost"
					name="maxCost"
					value={this.state.maxCost}
					onChange={this.handleSlider}
					style={{ width: '95%' }}
				/>
				{renderDisclaimer}
				{renderCommonBtn}
			</form>
		)
	}
}

const mapStateToProps = state => ({
	rides: state.rideReducer.rides
})
export default withRouter(connect(mapStateToProps)(EditForm))
