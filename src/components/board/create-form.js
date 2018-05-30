/*global google*/
import React from 'react'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import {withRouter} from 'react-router-dom'
import {addRide, fetchRides} from '../../actions/rides'
import {refreshAuthToken, fetchUser, fetchUserSuccess} from '../../actions/auth'
import {Button} from '../utilities'
import {hostClose} from '../../actions/utils'
import {LocationSearch} from './LocationSearch'
import './create-form.css'
const labelStyles = {
	display: 'block',
	fontWeight: '400',
	padding: '1rem 0',
	width: '100%'
}

class CreateForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			startCoor: [],
			arriveCoor: [],
			scheduleDate: new Date()
		}
		this.initialState = {
			maxCost: 100,
			startLoc: '',
			arriveLoc: '',
			startCoor: [],
			arriveCoor: [],
			scheduleDate: new Date(),
			disClaimer: ''
		}

		this.handleSlider = (event, value) => this.setState({maxCost: value})
	}
	getStartLocation = location => {
		this.setState({startLoc: location.address, startCoor: location.coordinate})
	}
	getArriveLocation = location => {
		this.setState({arriveLoc: location.address, arriveCoor: location.coordinate})
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
		const scheduleDate = this.state.scheduleDate.getTime()
		const rideCost = this.state.maxCost
		const {startCoor, arriveCoor} = this.state
		this.handleHost({
			...simpleForm,
			scheduleDate,
			rideCost,
			startCoordinate: startCoor,
			arriveCoordinate: arriveCoor,
			maxOccupancy: this.select.value,
			driver: this.props.driver
		})
	}

	handleHost(submitForm) {
		this.props.dispatch(hostClose())
		this.props
			.dispatch(addRide(submitForm))
			.then(() => {
				return this.props.dispatch(fetchUser(this.props.driver))
			})
			.then(user => this.props.dispatch(fetchUserSuccess(user)))
			.catch(err => alert('something is not right'))
	}

	render() {
		const {startLabel, arriveLabel, costLabel, dateLabel} = this.props
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
					onChange={(event, date) => this.setState({scheduleDate: date})}
				/>
				<br />
			</div>
		)
		const renderCommonBtn = (
			<div>
				<Button label="Submit" color="blue" type="submit" />
				<Button
					label="Cancel"
					color="white"
					type="button"
					onClick={() => this.props.dispatch(hostClose())}
				/>
			</div>
		)
		return (
			<form onSubmit={e => this.handleSubmit(e)} style={{paddingBottom: '2rem'}}>
				<label style={labelStyles} htmlFor="startLocation">
					{startLabel}
				</label>
				<LocationSearch getLocation={this.getStartLocation} />
				<br />
				<label style={labelStyles} htmlFor="arriveLocation">
					{arriveLabel}
				</label>
				<LocationSearch getLocation={this.getArriveLocation} />
				<br />
				<div className="random-css">
					{renderDatePicker}
					<label style={labelStyles} htmlFor="max-occupancy">
						Max-occupancy
					</label>
					<div>
						<select ref={ref => (this.select = ref)}>
							<option value="2">2</option>
							<option value="4">4</option>
							<option value="7">7</option>
							<option value="9">9</option>
						</select>
					</div>
				</div>
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
					style={{width: '95%'}}
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
