import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const styles = {
	smallIcon: {
		width: 38,
		height: 38
	},
	mediumIcon: {
		width: 48,
		height: 48
	},
	largeIcon: {
		width: 60,
		height: 60
	},
	small: {
		width: 48,
		height: 48,
		padding: 5
	},
	medium: {
		width: 96,
		height: 96,
		padding: 24
	},
	large: {
		width: 120,
		height: 120,
		padding: 30
	}
}
export class SingleBoardHeader extends React.Component {
	render() {
		const titleText = this.props.location ? this.props.location : '&nbsp;'
		return (
			<AppBar
				title={`${titleText}`}
				iconElementLeft={
					<IconButton
						style={styles.small}
						iconStyle={styles.smallIcon}
						onClick={() => this.props.history.push('/board')}
					>
						<img src="/images/return.svg" alt="return" />
					</IconButton>
				}
			/>
		)
	}
}
const mapStateToProps = state => {
	return {
		location: state.locationReducer.location
	}
}
export default withRouter(connect(mapStateToProps)(SingleBoardHeader))
