/*global google*/
import React from 'react'
import Slider from 'material-ui/Slider'
import PlacesAutocomplete from 'react-places-autocomplete'
import { narrowSearch } from '../../actions/rides'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import { withRouter } from 'react-router-dom'
import { hostFormClose, fetchRides } from '../../actions/rides'
import { addRide } from '../../actions/rides'
import { editRide } from '../../actions/rides'
import { refreshAuthToken, fetchUser } from '../../actions/auth'
import { Button } from '../utilities'

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
class SearchForm extends React.Component {
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
			scheduleDate: new Date()
		}
		this.startLocOnChange = value => this.setState({ startLoc: value })
		this.arriveLocOnChange = value => this.setState({ arriveLoc: value })
		this.handleSlider = (event, value) => this.setState({ maxCost: value })
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
		// submit in search form
		this.handleSearch(simpleForm)
	}
	handleSearch(mySearchTerms) {
		const results = this.props.rides.filter(ride => {
			let pass = true
			Object.keys(mySearchTerms).forEach(key => {
				if (
					mySearchTerms[key] &&
					mySearchTerms[key].toLowerCase().trim() !== ride[key].toLowerCase().trim()
				) {
					pass = false
				}
				if (Number(ride.rideCost) > Number(this.state.maxCost)) {
					pass = false
				}
			})
			return pass
		})
		this.props.dispatch(narrowSearch(results))
		this.setState(this.initialState)
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

		const renderSearchBtn = <Button label="Search" color="blue" fullWidth={true} type="submit" />
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
				{renderSearchBtn}
			</form>
		)
	}
}

const mapStateToProps = state => ({
	rides: state.rideReducer.rides
})
export default withRouter(connect(mapStateToProps)(SearchForm))
