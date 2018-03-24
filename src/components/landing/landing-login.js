import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
import { required, noEmpty, tooShort } from './validator'
// import MenuItem from 'material-ui/MenuItem'
import TextInput from './input-text'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { authUser } from '../../actions/auth'

export class LogIn extends React.Component {
	submitMe = value => {
		return this.props.dispatch(authUser(value))
	}
	render() {
		const {
			submitSucceeded,
			error,
			handleSubmit,
			pristine,
			submitting
		} = this.props

		let successMessage
		if (submitSucceeded) {
			successMessage = <div>Log In Successful</div>
		}
		let errorMessage
		if (error) {
			errorMessage = <div>{error}</div>
		}

		return (
			<div>
				<form onSubmit={handleSubmit(value => this.submitMe(value))}>
					<Field
						label="email"
						name="email"
						type="email"
						component={TextInput}
						validate={[required, noEmpty]}
					/>
					<Field
						label="password"
						name="password"
						type="password"
						component={TextInput}
						validate={[required, noEmpty, tooShort]}
					/>
					<div>
						<RaisedButton
							label="Log In"
							primary={true}
							fullWidth={true}
							type="submit"
							disabled={pristine || submitting}
						/>
						{successMessage}
						{errorMessage}
					</div>
				</form>
			</div>
		)
	}
}

export default reduxForm({
	form: 'logIn'
})(LogIn)
