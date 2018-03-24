import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'
import SignUp from './landing-signup'
import LogIn from './landing-login'
import './landing-form.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
export class TabForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slideIndex: 0
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.currentUser && nextProps.currentUser) {
			this.props.history.push('/board')
		}
	}
	handleChange = value => {
		this.setState({
			slideIndex: value
		})
	}
	render() {
		console.log(this.state)
		const activeStyle = { backgroundColor: '#00BCD4', color: 'white' }
		const inActiveStyle = { backgroundColor: '#E5E5E5', color: 'grey' }
		return (
			<div style={{ backgroundColor: 'white' }}>
				<Tabs onChange={this.handleChange} value={this.state.slideIndex}>
					<Tab
						label="Sign Up"
						value={0}
						buttonStyle={
							this.state.slideIndex === 0 ? activeStyle : inActiveStyle
						}
					/>
					<Tab
						label="Log In"
						value={1}
						buttonStyle={
							this.state.slideIndex === 1 ? activeStyle : inActiveStyle
						}
					/>
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={this.handleChange}
				>
					<SignUp />
					<LogIn />
				</SwipeableViews>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser
	}
}

export default withRouter(connect(mapStateToProps)(TabForm))
