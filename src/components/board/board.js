import React from 'react'
import DrawerList from './drawer-list'
import LandingHeader from '../landing/landing-header'
import '../landing/landing-header.css'
import './board.css'
import HostForm from './host-form.js'
import { connect } from 'react-redux'
import { fetchRides, clearSearch, askForRide } from '../../actions/rides'
import { refreshAuthToken, fetchUser } from '../../actions/auth'
import RaisedButton from 'material-ui/RaisedButton'
import requiresLogin from '../hoc/requireLogin'
import Snackbar from 'material-ui/Snackbar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import Profile from './profile'
import jwtDecode from 'jwt-decode'
import CardInfo from './card-info'
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
					<li key={index} id={ride.id} className="entry-list">
						<CardInfo
							isHost={isHost}
							requested={requested}
							ride={ride}
							onClick={e => {
								this.snackBarOpen()
								this.fireRequest(e)
							}}
						/>
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
			<div className="board-container">
				<Snackbar
					open={this.state.snackBar}
					message="Your request has been sent"
					autoHideDuration={3000}
					onRequestClose={() => this.snackBarClose()}
				/>
				<AppBar
					style={{ backgroundColor: '#FFA726' }}
					title={`Hello, ${this.props.currentUser.firstName}`}
					onLeftIconButtonClick={() => this.openDrawer()}
					iconElementRight={!this.props.rides ? <div /> : <Profile />}
				/>
				{renderClearSearch}
				<ul className="entry-list-container">{renderComponents}</ul>

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
