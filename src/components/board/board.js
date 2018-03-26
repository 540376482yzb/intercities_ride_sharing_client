import React from 'react'
import DrawerList from './drawer-list'
import LandingHeader from '../landing/landing-header'
import '../landing/landing-header.css'
import './board.css'
import HostForm from './host-form.js'
import { connect } from 'react-redux'
import { fetchRides, clearSearch, askForRide, deleteRideSuccess } from '../../actions/rides'
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
import { initializeSocket } from '../../actions/socket'
import io from 'socket.io-client'
import Loader from '../loader'
export class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			snackBar: false,
			message: ''
		}

		this.fireNotification = message =>
			new Promise((resolve, reject) => {
				return resolve(message)
			})
	}
	componentDidMount() {
		const socket = io('https://ride-share-server.herokuapp.com')
		if (!this.props.hasSocket) {
			this.props.dispatch(initializeSocket())
		}
		this.getNewData()
	}
	componentWillReceiveProps(nextProps) {
		if (
			(!this.props.deletingRide && nextProps.deletingRide) ||
			(this.props.currentUser && this.props.currentUser.match !== nextProps.currentUser.match)
		) {
			console.log('match')
			this.getNewData()
		}
	}
	openDrawer = () => this.setState({ open: true })
	closeDrawer = () => this.setState({ open: false })

	getNewData() {
		this.props.dispatch(fetchUser(jwtDecode(this.props.authToken).user.id))
		this.props.dispatch(fetchRides())
		this.props.dispatch(deleteRideSuccess())
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
		let renderComponents = <Loader />
		if (!this.props.currentUser && !this.props.rides) return renderComponents
		const rides = this.props.filteredRides || this.props.rides
		if (rides) {
			const isHost = this.props.currentUser.host
			const ridesWithNoMatch = rides.filter(ride => ride.match.length === 0)
			renderComponents = ridesWithNoMatch.map((ride, index) => {
				const requested = this.props.currentUser.sentRequests.find(request => request === ride.id)
				if (ride.match.length === 0) {
				}
				return (
					<li key={index} id={ride.id} className="entry-list">
						<CardInfo
							isHost={isHost}
							requested={requested}
							ride={ride}
							onClick={e => {
								this.fireRequest(e)
								this.fireNotification('request has been sent')
									.then(msg => this.setState({ message: msg }))
									.then(() => {
										this.snackBarOpen()
									})
							}}
						/>
					</li>
				)
			})
		}
		let renderClearSearch = ''
		if (this.props.filteredRides) {
			renderClearSearch = (
				<div
					style={{
						width: '100%',
						height: '50px',
						backgroundColor: 'rgb(238, 238, 238)',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<RaisedButton label="Clear Search" onClick={() => this.props.dispatch(clearSearch())} />
				</div>
			)
		}
		return (
			<main className="board-container">
				<Snackbar
					open={this.state.snackBar}
					message={this.state.message}
					autoHideDuration={3000}
					onRequestClose={() => this.snackBarClose()}
				/>
				<AppBar
					style={{ backgroundColor: '#FFA726' }}
					title={`Hello, ${this.props.currentUser.firstName}`}
					onLeftIconButtonClick={() => this.openDrawer()}
					iconElementRight={
						!this.props.rides ? (
							<div />
						) : (
							<Profile
								onAction={msg => {
									this.fireNotification(msg)
										.then(message => this.setState({ message }))
										.then(() => this.snackBarOpen())
								}}
							/>
						)
					}
				/>
				{renderClearSearch}
				<ul className="entry-list-container">{renderComponents}</ul>

				<Drawer docked={false} width={350} open={this.state.open} onRequestChange={open => this.setState({ open })}>
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
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides,
		filteredRides: state.rideReducer.filteredRides,
		currentUser: state.auth.currentUser,
		authToken: state.auth.authToken,
		deletingRide: state.rideReducer.deletingRide,
		hasSocket: !!state.socket.socket,
		isLoading: state.rideReducer.loading
	}
}

export default requiresLogin()(connect(mapStateToProps)(Board))
