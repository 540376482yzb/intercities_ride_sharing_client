/*global google*/
import React from 'react'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import PlacesAutocomplete from 'react-places-autocomplete'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import { withRouter } from 'react-router-dom'
import { addRide, fetchRides } from '../../actions/rides'
import { refreshAuthToken, fetchUser } from '../../actions/auth'
import { Button } from '../utilities'
import { hostClose } from '../../actions/utils'

const labelStyles = {
	display: 'block',
	fontWeight: '400',
	padding: '1rem 0'
}
const inputStyles = {
	input: {
		width: '100%',
		border: 0,
		borderBottom: '2px solid #00BCD4'
	},
	autocompleteContainer: {
		width: '100%',
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
class CreateForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			scheduleDate: new Date(),
			disClaimer: ''
		}
		this.initialState = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			scheduleDate: new Date(),
			disClaimer: ''
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
		const rideCost = this.state.maxCost
		this.handleHost({
			...simpleForm,
			scheduleDate,
			rideCost,
			driver: this.props.driver
		})
	}
	handleHost(submitForm) {
		this.props.dispatch(hostClose())
		this.props
			.dispatch(addRide(submitForm))
			.then(() => {
				this.props.dispatch(fetchRides())
				this.props.dispatch(fetchUser(this.props.driver))
				this.props.dispatch(refreshAuthToken())
			})
			.catch(err => console.log(err))
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

		const renderCommonBtn = (
			<div>
				<Button label="Submit" color="blue" type="submit" backgroundColor="#8BC34A" />
				<Button
					label="Cancel"
					color="white"
					type="button"
					onClick={() => this.props.dispatch(hostClose())}
				/>
			</div>
		)
		return (
			<form onSubmit={e => this.handleSubmit(e)} style={{ paddingBottom: '2rem' }}>
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
				{renderCommonBtn}
			</form>
		)
	}
}

const mapStateToProps = state => ({
	rides: state.rideReducer.rides
})
export default withRouter(connect(mapStateToProps)(CreateForm))
