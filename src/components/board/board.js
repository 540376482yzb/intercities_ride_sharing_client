import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import DrawerList from './drawer-list'
import LandingHeader from '../landing/landing-header'
import '../landing/landing-header.css'
import './board.css'
import HostForm from './host-form.js'
import { connect } from 'react-redux'
import { fetchRides, clearSearch, askForRide } from '../../actions/rides'
import { refreshAuthToken, fetchUser } from '../../actions/auth'
import Chip from 'material-ui/Chip'
import { blue300 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import requiresLogin from '../hoc/requireLogin'
import Snackbar from 'material-ui/Snackbar'
import Profile from './profile'
import * as moment from 'moment'
import jwtDecode from 'jwt-decode'
export class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			snackBar: false
			// location: ''
		}
	}
	openDrawer = () => this.setState({ open: true })
	closeDrawer = () => this.setState({ open: false })

	componentDidMount() {
		this.getNewDate()
	}

	getNewDate() {
		this.props.dispatch(fetchUser(jwtDecode(this.props.authToken).user.id))
		this.props.dispatch(fetchRides())
		this.props.dispatch(refreshAuthToken())
	}
	getRating(value) {
		switch (value) {
		case 1:
			return '★☆☆☆☆'
		case 2:
			return '★★☆☆☆'
		case 3:
			return '★★★☆☆'
		case 4:
			return '★★★★☆'
		case 5:
			return '★★★★★'
		default:
			return '★★★★★'
		}
	}

	fireRequest(e) {
		const rideId = e.currentTarget.closest('li').id
		this.props.dispatch(askForRide(rideId, this.props.currentUser.id))
	}
	snackBarOpen = () => this.setState({ snackBar: true })

	snackBarClose = () => this.setState({ snackBar: false })

	openMyHost() {
		return true
	}

	render() {
		let renderComponents = <div />
		if (!this.props.currentUser) return renderComponents
		const rides = this.props.filteredRides || this.props.rides
		if (rides) {
			const isHost = this.props.currentUser.host
			const ridesWithNoMatch = rides.filter(ride => ride.match.length === 0)
			renderComponents = ridesWithNoMatch.map((ride, index) => {
				const requested = this.props.currentUser.sentRequests.find(
					request => request === ride.id
				)
				if (ride.match.length === 0) {
				}
				return (
					<li key={index} id={ride.id} style={{ listStyle: 'none' }}>
						<Card>
							<CardHeader
								title={`${ride.driver.firstName} ${ride.driver.lastName}`}
								titleStyle={{ fontWeight: 600, fontSize: '1rem' }}
								subtitle={this.getRating(Number(ride.driver.rating))}
								subtitleStyle={{ fontSize: '1rem', color: 'orange' }}
								avatar="/images/person.svg"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText>
								<div className="shortDesc">
									<span className="shortDesc-prefix">FROM</span>
									<span className="shortDesc-suffix">
										<Chip backgroundColor="#A5D6A7">{`${ride.startCity},${
											ride.startState
										}`}</Chip>
									</span>
								</div>
								<div className="shortDesc">
									<span className="shortDesc-prefix">TO</span>
									<span className="shortDesc-suffix">
										<Chip backgroundColor="#FFA726">{`${ride.arriveCity},${
											ride.arriveState
										}`}</Chip>
									</span>
								</div>
								<div className="date">
									<span className="date-prefix">DEPART</span>
									<span className="date-suffix">
										<Chip backgroundColor={blue300}>
											{moment(ride.scheduleDate).fromNow()}
										</Chip>
									</span>
								</div>
							</CardText>
							<CardText expandable={true}>
								<header />
								<section>
									<div>
										<Chip backgroundColor="#FCE4EC">
											<strong>Fare Cost is ${ride.rideCost}</strong>
										</Chip>
									</div>
									<header>
										<h3>Rules to follow:</h3>
									</header>
									<p>{ride.disClaimer}</p>
								</section>
							</CardText>
							<CardActions expandable={true}>
								<RaisedButton
									label="REQUEST"
									primary={true}
									disabled={requested || isHost ? true : false}
									onClick={e => {
										this.snackBarOpen()
										this.fireRequest(e)
									}}
								/>
							</CardActions>
						</Card>
					</li>
				)
			})
		}
		let renderClearSearch = ''
		if (this.props.filteredRides) {
			renderClearSearch = (
				<RaisedButton onClick={() => this.props.dispatch(clearSearch())}>
					Clear Search
				</RaisedButton>
			)
		}
		return (
			<div className="board-container" style={{ marginBottom: '2rem' }}>
				<Snackbar
					open={this.state.snackBar}
					message="Your request has been sent"
					autoHideDuration={3000}
					onRequestClose={() => this.snackBarClose()}
				/>
				<AppBar
					className="board-navbar"
					title={`Hello, ${this.props.currentUser.firstName}`}
					onLeftIconButtonClick={() => this.openDrawer()}
					iconElementRight={!this.props.rides ? <div /> : <Profile />}
				/>
				{/* <div>{this.state.location}</div> */}
				{renderClearSearch}
				{renderComponents}
				<Drawer
					docked={false}
					width={350}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					<header className="header-container">
						<div className="board-logo">
							<LandingHeader filter={true} opacityValue={1} height={4} />
						</div>
						<div className="board-close-btn">
							<FlatButton
								label="&#11164;"
								labelStyle={{ fontSize: '1.3rem', color: 'white' }}
								onClick={() => this.closeDrawer()}
							/>
						</div>
					</header>
					<DrawerList onClick={() => this.closeDrawer()} />
				</Drawer>
				<HostForm />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides,
		filteredRides: state.rideReducer.filteredRides,
		currentUser: state.auth.currentUser,
		authToken: state.auth.authToken
	}
}

export default requiresLogin()(connect(mapStateToProps)(Board))
