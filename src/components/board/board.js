import React from 'react'
import '../landing/landing-header.css'
import './board.css'
import { connect } from 'react-redux'
import { fetchRides, clearSearch, askForRide, deleteRideSuccess } from '../../actions/rides'
import { refreshAuthToken, fetchUser, fetchUserSuccess } from '../../actions/auth'
import requiresLogin from '../hoc/requireLogin'
import Profile from './profile'
import CardInfo from './card-info'
import Loader from '../loader'
import BoardHead from './BoardHead'
import Overlay from './Overlay'
import SearchForm from './search-form'
import { Button } from '../utilities'
import { hostOpen } from '../../actions/utils'
import HostForm from './host-form.js'
export class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchOn: false
		}
	}
	componentDidMount() {
		this.props.dispatch(fetchUser(this.props.currentUser.id)).then(user => {
			this.props.dispatch(fetchUserSuccess(user))
			this.props.dispatch(fetchRides())
		})
	}
	fireRequest(e) {
		const rideId = e.currentTarget.closest('li').id
		this.props.dispatch(askForRide(rideId, this.props.currentUser.id))
	}

	openMyHost() {
		return true
	}

	render() {
		const {
			rides,
			filteredRides,
			currentUser,
			isSearchOpen,
			isHostOpen,
			dispatch,
			history
		} = this.props
		if (!rides || !currentUser) {
			return <Loader />
		}
		if (currentUser && currentUser['match']) {
			history.push('/match')
		}
		const ridesWithNoLock = filteredRides
			? filteredRides.filter(ride => ride.match.length < ride.maxOccupation && !ride.lock)
			: rides.filter(ride => ride.match.length < ride.maxOccupation && !ride.lock)
		let renderComponents = ridesWithNoLock.map((ride, index) => {
			const requested = currentUser.sentRequests.find(request => request === ride.id)
			const isDriver = currentUser.id === ride.driver.id
			return (
				<li key={index} id={ride.id} className="entry-list">
					<CardInfo
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

		return (
			<main className="board-container">
				<BoardHead currentUser={currentUser} />
				<section className="board-foot">
					{filteredRides ? (
						<Button label="Clear Search" color="red" onClick={() => dispatch(clearSearch())} />
					) : (
						''
					)}
					<Button label="Hosting a trip" color="blue" onClick={() => dispatch(hostOpen())} />
				</section>
				{isSearchOpen ? (
					<Overlay>
						<SearchForm />
					</Overlay>
				) : (
					''
				)}
				{isHostOpen ? (
					<Overlay>
						<HostForm />
					</Overlay>
				) : (
					''
				)}
				<ul className="entry-list-container">{renderComponents}</ul>
				<section className="board-search-box">
					<SearchForm />
				</section>
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides,
		filteredRides: state.rideReducer.filteredRides,
		currentUser: state.auth.currentUser,
		isSearchOpen: state.control.searchOpen,
		isHostOpen: state.control.hostOpen
	}
}

export default requiresLogin()(connect(mapStateToProps)(Board))
