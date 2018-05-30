import React from 'react'
import Rating from 'react-rating'
import {Button} from '../utilities'
import './Review.css'
import {reviewUser} from '../../actions/user-status'
import {fetchUser, fetchUserSuccess} from '../../actions/auth'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
export class Review extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 5
		}
	}
	handleChange = value => {
		this.setState({value})
	}
	handleSubmit = () => {
		const {user, dispatch, history} = this.props
		dispatch(reviewUser(user.id, user.pendingReview, this.state.value))
			.then(msg => history.push('/board'))
			.catch(err => alert('something not right'))
	}
	componentDidMount() {
		const {dispatch, user, history} = this.props
		dispatch(fetchUser(user.id))
			.then(user => {
				if (user.pendingReview) {
					dispatch(fetchUserSuccess(user))
				} else {
					history.push('/board')
				}
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<main className="review-container">
				<h2>How would you rate this journey ?</h2>
				<Rating initialRating={this.state.value} onChange={this.handleChange} />
				<br />
				<Button label="Submit" color="blue" fullWidth={true} onClick={this.handleSubmit} />
			</main>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.currentUser
	}
}

export default withRouter(connect(mapStateToProps)(Review))
