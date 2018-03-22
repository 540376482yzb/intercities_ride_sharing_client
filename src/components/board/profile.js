import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clearAuthToken } from '../../actions/auth'
import { clearLocalAuthToken } from '../../local-storage'
import { deleteRide } from '../../actions/rides'
import './profile.css'
export class Profile extends React.Component {
	logOut() {
		this.props.dispatch(clearAuthToken())
		clearLocalAuthToken()
	}
	render() {
		if (!this.props.currentUser && !this.props.rides) return <div />
		const myRide = this.props.rides.find(
			ride => ride.driver.id === this.props.currentUser.id
		)
		const hasMatch = this.props.currentUser.match
		const editBtnRender = myRide ? (
			<MenuItem
				primaryText="Edit My Ride"
				disabled={hasMatch ? true : false}
				onClick={() =>
					this.props.history.push(`/single-board/${myRide.id}/edit`)
				}
			/>
		) : (
			undefined
		)
		const deleteBtnRender = myRide ? (
			<MenuItem
				className="deleteBtn"
				primaryText="Delete My Ride"
				disabled={hasMatch ? true : false}
				onClick={() => {
					this.props.onAction('You Ride is Deleted')
					this.props.dispatch(deleteRide(myRide.id, this.props.currentUser.id))
				}}
			/>
		) : (
			undefined
		)
		const numberRequests = myRide ? myRide.requests.length : 0
		const requestBtnRender =
			numberRequests !== 0 ? (
				<MenuItem
					primaryText={`Pending Requests: ${numberRequests}`}
					onClick={() =>
						this.props.history.push(`/single-board/${myRide.id}/requests`)
					}
					disabled={hasMatch ? true : false}
				/>
			) : (
				undefined
			)
		const matchRoomId = this.props.currentUser.match
		const matchBtnRender = matchRoomId ? (
			<MenuItem
				primaryText="Match Room"
				onClick={() =>
					this.props.history.push(`/single-board/${matchRoomId}/match`)
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
				{deleteBtnRender}
				{requestBtnRender}
				{matchBtnRender}

				<MenuItem primaryText="Sign out" onClick={() => this.logOut()} />
			</IconMenu>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser,
		rides: state.rideReducer.rides
	}
}
export default withRouter(connect(mapStateToProps)(Profile))
