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
import { searchClose } from '../../actions/utils'
import { LocationSearch } from './LocationSearch'

const labelStyles = {
	display: 'block',
	fontWeight: 'bold',
	padding: '1rem 0',
	color: 'rgba(0, 0, 0, 0.6)',
	width: '100%'
}
class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			scheduleDate: new Date()
		}
		this.initialState = {
			maxCost: 100,
			scheduleDate: new Date()
		}
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
		this.props.dispatch(searchClose())
	}

	render() {
		const options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}

		const renderSearchBtn = <Button label="Search" color="blue" fullWidth={true} type="submit" />
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<label style={labelStyles} htmlFor="startLocation">
					Origination
				</label>
				<LocationSearch getLocation={location => this.getStartLocation(location)} />
				<br />
				<label style={labelStyles} htmlFor="arriveLocation">
					Destination
				</label>
				<LocationSearch />
				<br />
				<label style={labelStyles} htmlFor="maxCost">
					Acceptable cost
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
					style={{ width: '100%' }}
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
