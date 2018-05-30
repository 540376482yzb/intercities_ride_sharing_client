/*global google*/
import React from 'react'
import {connect} from 'react-redux'
import CardInfo from './card-info'
import MatchHead from './MatchHead'
import Chat from './chat'
import {fetchRide, fetchRideSuccess} from '../../actions/rides'
import {fetchUser, fetchUserSuccess, fetchUserError} from '../../actions/auth'
import './Match.css'
import io from 'socket.io-client'
import {initializeSocket} from '../../actions/socket'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps'
import RequireLogin from '../hoc/requireLogin'
import {withRouter} from 'react-router-dom'
import Loader from '../loader'

export class Match extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			onlineUsers: []
		}
	}
	loadingSocket(socket, ride, user) {
		socket.emit('JOIN_ROOM', {roomId: ride.id, user})
		socket.on('JOIN_ROOM', ({user, room}) => {
			const msg = {
				type: 'broadcast',
				author: user,
				body: `${user.firstName} has joined the room`,
				createdOn: Date.now()
			}
			this.props
				.dispatch(fetchRide(user.match))
				.then(_ride => {
					this.props.dispatch(fetchRideSuccess({..._ride, messages: [..._ride.messages, msg]}))
					this.setState({
						onlineUsers: room
					})
				})
				.catch(err => alert('something is not right'))
		})
		socket.on('LEAVING_ROOM', ({user, room}) => {
			const msg = {
				type: 'broadcast',
				author: user,
				body: `${user.firstName} has left the room`,
				createdOn: Date.now()
			}
			const updateRide = {...ride, messages: [...ride.messages, msg]}
			this.props.dispatch(fetchRideSuccess(updateRide))
			this.setState({
				onlineUsers: room
			})
		})
		socket.on('RECEIVE_MESSAGE', messages => {
			this.props.dispatch(fetchRideSuccess({...this.props.ride, messages}))
		})

		socket.on('RECEIVE_RIDE', message => {
			const updateRide = {...this.props.ride, messages: [...this.props.ride.messages, message]}
			this.props.dispatch(fetchRideSuccess(updateRide))
		})
		socket.on('ACCEPT_RIDE_SUCCESS', rideId => {
			this.props
				.dispatch(fetchRide(rideId))
				.then(ride => this.props.dispatch(fetchRideSuccess(ride)))
				.catch(err => console.log(err))
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
				return dispatch(fetchRide(this.user.match))
			})
			.then(ride => {
				this.ride = ride
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
				this.loadingSocket(socket, this.ride, this.user)
			})
			.catch(err => {
				if ((err.message = 'no match found')) {
					history.push('/board')
				}
			})
	}
	handleSendMessage = message => {
		const {socket, user} = this.props
		const {ride} = this.props
		socket.emit('SEND_MESSAGE', {
			roomId: ride.id,
			message: {author: user, body: message, createdOn: Date.now()}
		})
	}
	componentDidMount() {
		this.load = false
		const {user, dispatch, socket, history} = this.props
		this.loadingData(user, dispatch, socket, history)
	}
	componentWillMount() {
		this.load = true
	}
	componentWillReceiveProps(nexProps) {
		const {user, dispatch, socket, history} = this.props
		if (user.match && !nexProps.user['match']) {
			history.push('/board')
		}
	}

	render() {
		const {user, ride} = this.props
		const {onlineUsers} = this.state
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
								loadingElement={<div style={{height: '100%'}} />}
								containerElement={<div className="match-map" />}
								mapElement={<div style={{height: '100%'}} />}
								startCoordinate={ride.startCoordinate}
								arriveCoordinate={ride.arriveCoordinate}
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
		<Map startCoordinate={props.startCoordinate} arriveCoordinate={props.arriveCoordinate} />
	))
)

class Map extends React.Component {
	constructor(props) {
		super(props)
		this.state = {directions: null, distance: null, estimate: null}
	}
	componentDidMount() {
		const {startCoordinate, arriveCoordinate} = this.props
		const DirectionsService = new google.maps.DirectionsService()
		DirectionsService.route(
			{
				origin: new google.maps.LatLng(startCoordinate[0], startCoordinate[1]),
				destination: new google.maps.LatLng(arriveCoordinate[0], arriveCoordinate[1]),
				travelMode: google.maps.TravelMode.DRIVING
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result
					})
				} else {
					console.error(`error fetching directions ${result}`)
				}
			}
		)
		const DistanceMatrixService = new google.maps.DistanceMatrixService()
		DistanceMatrixService.getDistanceMatrix(
			{
				origins: [new google.maps.LatLng(startCoordinate[0], startCoordinate[1])],
				destinations: [new google.maps.LatLng(arriveCoordinate[0], arriveCoordinate[1])],
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.IMPERIAL
			},
			(response, status) => {
				if (status === 'OK') {
					this.setState({
						originAddress: response.originAddresses,
						destinationAddress: response.destinationAddresses,
						distance: response.rows[0].elements[0].distance.text,
						estimate: response.rows[0].elements[0].duration.text
					})
				}
			}
		)
	}
	render() {
		const {startCoordinate} = this.props
		const {distance, estimate, originAddress, destinationAddress} = this.state
		return (
			<main className="map-container">
				<GoogleMap
					defaultZoom={7}
					defaultCenter={new google.maps.LatLng(startCoordinate[0], startCoordinate[1])}
				>
					{this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
				</GoogleMap>
				<section className="map-button">
					<a
						href={`https://www.google.com/maps/dir/${originAddress}/${destinationAddress}/@${
							startCoordinate[0]
						},${startCoordinate[1]},9.85z`}
						target="_blank"
					>
						Go
					</a>
					<span>{distance}</span>
				</section>
				<section className="info-section">
					<span>Travel time estimate</span>
					<span>{estimate}</span>
				</section>
			</main>
		)
	}
}
