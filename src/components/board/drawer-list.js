import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
// import { required, noEmpty, tooShort, isNumber } from './validators'
// import { serverValidate } from './asyncValidator'
// import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router-dom'
import TextInput from '../landing/input-text'
import RaisedButton from 'material-ui/RaisedButton'
import SelectInput from './select-input'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import './drawer-list.css'
import { connect } from 'react-redux'
import { hostFormOpen } from '../../actions/rides'

const textStyles = {
	fontSize: '1rem',
	textAlign: 'center',
	margin: '40px 0'
}
export class DrawerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cities: null,
			startState: null,
			arriveState: null,
			lastTimeFreshed: null
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.rides && nextProps.rides) {
			this.mapCities(nextProps.rides)
		}
	}
	componentDidMount() {
		this.setState({ lastTimeFreshed: new Date().getTime() })
	}
	onSubmit(value) {
		console.log(value)
		const newTime = new Date().getTime()
		const timeLasted = Math.round(
			(Number(newTime) - Number(this.state.lastTimeFreshed)) / (1000 * 60)
		)
		const {
			startCity,
			startState,
			arriveState,
			arriveCity,
			min = 0,
			max = Infinity,
			rating
		} = value
		if (timeLasted > 0.5) {
			//To do ....
			//refresh page after certain time
		}
		//local search
		const result = this.props.rides.filter(ride => {
			if (startCity && startCity !== ride.startCity.city) return false
			if (startState && startState !== ride.startCity.state) return false
			if (arriveCity && arriveCity !== ride.arriveCity.city) return false
			if (arriveState && arriveState !== ride.arriveCity.state) return false
			if (
				Number(ride.rideCost) < Number(min) ||
				Number(ride.rideCost) > Number(max)
			)
				return false
			if (Number(ride.driver.rating) < Number(rating)) return false
			return true
		})
		console.log(result)
	}
	mapCities(rides) {
		const cities = {}
		rides.forEach(ride => {
			if (!Object.keys(cities).includes(ride.startCity.state)) {
				cities[ride.startCity.state] = []
			}
			if (!Object.keys(cities).includes(ride.arriveCity.state)) {
				cities[ride.arriveCity.state] = []
			}
			if (Object.keys(cities).includes(ride.startCity.state)) {
				if (!cities[ride.startCity.state].includes(ride.startCity.city)) {
					cities[ride.startCity.state].push(ride.startCity.city)
				}
			}
			if (Object.keys(cities).includes(ride.arriveCity.state)) {
				if (!cities[ride.arriveCity.state].includes(ride.arriveCity.city)) {
					cities[ride.arriveCity.state].push(ride.arriveCity.city)
				}
			}
		})
		this.setState({ cities })
	}
	renderState(locations) {
		return Object.keys(locations).map((state, index) => {
			return (
				<MenuItem value={`${state}`} primaryText={`${state}`} key={index} />
			)
		})
	}
	renderCities(cities) {
		return cities.map((city, index) => {
			return (
				<MenuItem
					key={index}
					value={`${city}`}
					primaryText={`${city.toUpperCase()}`}
				/>
			)
		})
	}
	render() {
		const { submitting } = this.props
		let renderStartState = <MenuItem />
		if (this.state.cities) {
			renderStartState = this.renderState(this.state.cities)
		}
		let renderStartCity = <MenuItem />
		if (this.state.startState) {
			const availableCities = this.state.cities[this.state.startState]
			renderStartCity = this.renderCities(availableCities)
		}

		let renderArriveState = <MenuItem />
		if (this.state.cities) {
			renderArriveState = this.renderState(this.state.cities)
		}
		let renderArriveCity = <MenuItem />
		if (this.state.arriveState) {
			const availableCities = this.state.cities[this.state.arriveState]
			renderArriveCity = this.renderCities(availableCities)
		}
		return (
			<div style={{ width: '90%', margin: '0 auto' }} className="drawerList">
				<section>
					<h2 style={textStyles}>I want to host a ride</h2>
					<RaisedButton
						label="HOST"
						primary={true}
						fullWidth={true}
						type="submit"
						onClick={() => {
							this.props.dispatch(hostFormOpen())
						}}
					/>
				</section>
				<hr style={{ margin: '1rem 0' }} />
				<form onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
					<section>
						<h2 style={textStyles}>narrow search scope</h2>
						<div>
							<header>Starting City</header>
							<div style={{ width: '30%', display: 'inline-block' }}>
								<Field
									label="state"
									name="startState"
									id="startState"
									type="text"
									component={SelectInput}
									onChange={(event, value) =>
										this.setState({ startState: value })
									}
								>
									{renderStartState}
								</Field>
							</div>
							<div style={{ width: '70%', display: 'inline-block' }}>
								<Field
									label="city"
									name="startCity"
									id="startCity"
									type="text"
									component={SelectInput}
								>
									{renderStartCity}
								</Field>
							</div>
						</div>
						<div>
							<header>Arriving City</header>
							<div style={{ width: '30%', display: 'inline-block' }}>
								<Field
									label="state"
									name="arriveState"
									id="arriveState"
									type="text"
									component={SelectInput}
									onChange={(event, value) =>
										this.setState({ arriveState: value })
									}
								>
									{renderArriveState}
								</Field>
							</div>
							<div style={{ width: '70%', display: 'inline-block' }}>
								<Field
									label="city"
									name="arriveCity"
									id="arriveCity"
									type="text"
									component={SelectInput}
								>
									{renderArriveCity}
								</Field>
							</div>
						</div>
						<div>
							<div>ride cost</div>
							<section>
								<Field
									label="$min"
									name="min"
									id="min"
									type="text"
									component={TextInput}
								/>
							</section>
							<section>
								<Field
									label="$max"
									name="max"
									id="max"
									type="text"
									component={TextInput}
								/>
							</section>
						</div>
						<div>
							<label htmlFor="rating">host rating</label>
							<Field
								name="rating"
								id="rating"
								type="text"
								component={SelectInput}
							>
								<MenuItem value="1" primaryText="★☆☆☆☆" />
								<MenuItem value="2" primaryText="★★☆☆☆" />
								<MenuItem value="3" primaryText="★★★☆☆" />
								<MenuItem value="4" primaryText="★★★★☆" />
								<MenuItem value="5" primaryText="★★★★★" />
							</Field>
						</div>
						<RaisedButton
							label="Search"
							primary={true}
							fullWidth={true}
							type="submit"
							disabled={submitting}
						/>
					</section>
				</form>
			</div>
		)
	}
}
export const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides
	}
}
export default withRouter(
	reduxForm({
		form: 'search-form'
	})(connect(mapStateToProps)(DrawerList))
)