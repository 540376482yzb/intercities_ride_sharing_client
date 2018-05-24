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
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import Profile from './profile'
import CardInfo from './card-info'
import { initializeSocket } from '../../actions/socket'
import io from 'socket.io-client'
import Loader from '../loader'
import BoardHead from './BoardHead'
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
		this.props.dispatch(fetchRides())
	}

	openDrawer = () => this.setState({ open: true })
	closeDrawer = () => this.setState({ open: false })

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
		const { rides, currentUser } = this.props
		if (!rides) {
			return <Loader />
		}
		const isHost = currentUser.host
		const ridesWithNoMatch = rides.filter(ride => ride.match.length === 0)
		let renderComponents = ridesWithNoMatch.map((ride, index) => {
			const requested = currentUser.sentRequests.find(request => request === ride.id)
			const isDriver = currentUser.id === ride.driver.id
			return (
				<li key={index} id={ride.id} className="entry-list">
					<CardInfo
						isHost={isHost}
						requested={requested}
						ride={ride}
						isDriver={isDriver}
						onClick={e => {
							this.fireRequest(e)
						}}
					/>
				</li>
			)
		})
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
				<BoardHead />
				{/* <AppBar
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
				/> */}
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
					<DrawerList onClick={() => console.log('close')} />
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
		hasSocket: !!state.socket.socket
	}
}

export default requiresLogin()(connect(mapStateToProps)(Board))
