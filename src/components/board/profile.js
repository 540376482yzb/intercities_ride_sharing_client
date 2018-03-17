import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clearAuthToken } from '../../actions/auth'
import { clearLocalAuthToken } from '../../local-storage'
export class Profile extends React.Component {
	logOut() {
		this.props.dispatch(clearAuthToken())
		clearLocalAuthToken()
	}
	render() {
		const editBtnRender = this.props.isHost ? (
			<MenuItem
				primaryText="Edit Hosting Ride"
				onClick={() =>
					this.props.history.push(`/single-board/${this.props.myRide.id}/edit`)
				}
			/>
		) : (
			undefined
		)
		const requestBtnRender =
			this.props.numberRequests !== 0 ? (
				<MenuItem
					primaryText={`Pending Requests: ${this.props.numberRequests}`}
					onClick={() =>
						this.props.history.push(
							`/single-board/${this.props.myRide.id}/requests`
						)
					}
				/>
			) : (
				undefined
			)
		const matchBtnRender = this.props.matchRoomId ? (
			<MenuItem
				primaryText="Match Room"
				onClick={() =>
					this.props.history.push(
						`/single-board/${this.props.matchRoomId}/match`
					)
				}
			/>
		) : (
			undefined
		)

		return (
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton>
						<img src="/images/profile.png" alt="profile" height="30px" />
					</IconButton>
				}
				targetOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				{editBtnRender}
				{requestBtnRender}
				{matchBtnRender}

				<MenuItem primaryText="Sign out" onClick={() => this.logOut()} />
			</IconMenu>
		)
	}
}

function findMyRide(user, rideState) {
	const myRide = rideState.rides.filter(ride => ride.driver.id === user.id)
	if (myRide.length === 0) return null
	return myRide[0]
}
const mapStateToProps = state => {
	const currentUser = jwtDecode(state.auth.authToken).user
	const ride = findMyRide(currentUser, state.rideReducer)
	return {
		isHost: currentUser.host,
		myRide: ride,
		numberRequests: ride === null ? 0 : ride.requests.length,
		matchRoomId: currentUser.match ? currentUser.match : null
	}
}
export default withRouter(connect(mapStateToProps)(Profile))
