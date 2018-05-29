import React from 'react'
import { connect } from 'react-redux'
import CardInfo from './card-info'
import MatchHead from './MatchHead'
import Chat from './chat'
import { fetchRide, fetchRideSuccess } from '../../actions/rides'
import { fetchUser, fetchUserSuccess, fetchUserError } from '../../actions/auth'
import './Match.css'
import io from 'socket.io-client'
import { initializeSocket } from '../../actions/socket'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import RequireLogin from '../hoc/requireLogin'
import { withRouter } from 'react-router-dom'
import Loader from '../loader'

export class Match extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			onlineUsers: []
		}
	}
	loadingSocket(socket, roomId, user) {
		socket.emit('JOIN_ROOM', { roomId, user })
		socket.on('JOIN_ROOM', user => {
			const msg = {
				type: 'broadcast',
				author: user,
				body: `${user.firstName} has joined the room`,
				createdOn: Date.now()
			}
			const updateRide = { ...this.props.ride, messages: [...this.props.ride.messages, msg] }
			this.props.dispatch(fetchRideSuccess(updateRide))
			this.setState({
				onlineUsers: [...this.state.onlineUsers, user]
			})
		})
		socket.on('LEAVING_ROOM', user => {
			const msg = {
				type: 'broadcast',
				author: user,
				body: `${user.firstName} has left the room`,
				createdOn: Date.now()
			}
			const updateRide = { ...this.props.ride, messages: [...this.props.ride.messages, msg] }
			this.props.dispatch(fetchRideSuccess(updateRide))
			this.setState({
				onlineUsers: [...this.state.onlineUsers, user]
			})
			this.setState({
				onlineUsers: [...this.state.onlineUsers.filter(_user => _user.id === user.id)]
			})
		})
		socket.on('RECEIVE_MESSAGE', message => {
			const updateRide = { ...this.props.ride, messages: [...this.props.ride.messages, message] }
			this.props.dispatch(fetchRideSuccess(updateRide))
		})
	}
	loadingData = (user, dispatch, socket, history) => {
		dispatch(fetchUser(user.id))
			.then(user => {
				this.user = user
				return dispatch(fetchUserSuccess(user))
			})
			.then(() => {
				if (!this.user.match) {
					const err = new Error('no match found')
					throw err
				}
				console.log('this.user.match', this.user.match)
				return dispatch(fetchRide(this.user.match))
			})
			.then(ride => {
				dispatch(fetchRideSuccess(ride))
			})
			.then(() => {
				// init socket if not already
				if (!socket) {
					const newSocket = io('localhost:8080')
					return dispatch(initializeSocket(newSocket))
				}
			})
			.then(() => {
				// loading socket
				this.loadingSocket(socket, this.props.ride.id, this.user)
			})
			.catch(err => {
				console.log(err)
				if ((err.message = 'no match found')) {
					history.push('/board')
				}
			})
	}
	handleSendMessage = message => {
		const { socket, user } = this.props
		const { ride } = this.props
		socket.emit('SEND_MESSAGE', {
			roomId: ride.id,
			message: { author: user, body: message, createdOn: Date.now() }
		})
	}
	componentDidMount() {
		this.load = false
		const { user, dispatch, socket, history } = this.props
		this.loadingData(user, dispatch, socket, history)
	}
	componentWillMount() {
		this.load = true
	}
	componentWillReceiveProps(nexProps) {
		// const { user, dispatch, socket, history } = this.props
		// if (user.match && !nexProps.user['match']) {
		// 	this.loadingData(user, dispatch, socket, history)
		// }
	}
	render() {
		const { user, ride } = this.props
		const { onlineUsers } = this.state
		if (!user || !ride || this.load) {
			return <Loader />
		}

		return (
			<main>
				<MatchHead currentUser={user} />
				<div className="match-container">
					<section className="entry-container">
						<div className="entry">
							<CardInfo
								users={ride.match}
								isDriver={user.host}
								isMatch={true}
								ride={ride}
								onlineUsers={onlineUsers}
							/>
						</div>
						<div className="entry">
							<MapWithAMarker
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
								loadingElement={<div style={{ height: '100%' }} />}
								containerElement={<div className="match-map" />}
								mapElement={<div style={{ height: '100%' }} />}
							/>
						</div>
					</section>
					<section className="chat-container">
						<div className="entry">
							<Chat
								currentUser={user}
								sendMessage={this.handleSendMessage}
								messages={ride.messages ? ride.messages : []}
							/>
						</div>
					</section>
				</div>
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.currentUser,
		socket: state.socket.socket,
		ride: state.rideReducer.matchedRide
	}
}

export default withRouter(RequireLogin()(connect(mapStateToProps)(Match)))

const MapWithAMarker = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
			<Marker position={{ lat: -34.397, lng: 150.644 }} />
		</GoogleMap>
	))
)
