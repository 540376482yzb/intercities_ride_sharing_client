import React from 'react'
// import { required, noEmpty, tooShort, isNumber } from './validators'
// import { serverValidate } from './asyncValidator'
// import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import './drawer-list.css'
import { connect } from 'react-redux'
import { hostFormOpen } from '../../actions/rides'
import SearchForm from './simple-form'
const textStyles = {
	textAlign: 'center',
	margin: '40px 0'
}
export class DrawerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startCity: null,
			arriveCity: null
		}
	}

	render() {
		const isHost = this.props.isHost
		return (
			<div style={{ width: '90%', margin: '0 auto' }} className="drawerList">
				<section>
					<h2 style={textStyles}>I want to host a ride</h2>
					<RaisedButton
						label="HOST"
						primary={true}
						fullWidth={true}
						disabled={isHost ? true : false}
						type="submit"
						onClick={() => {
							this.props.dispatch(hostFormOpen())
						}}
					/>
				</section>
				<hr style={{ margin: '1rem 0' }} />
				<h2 style={textStyles}>Narrow Search Result</h2>
				<SearchForm
					startLabel="Where does it start ?"
					arriveLabel="Where does it arrive ?"
					costLabel="Maximum cost"
					operation="search"
				/>
			</div>
		)
	}
}
export const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides,
		isHost: state.auth.currentUser.host
	}
}

export default withRouter(connect(mapStateToProps)(DrawerList))
