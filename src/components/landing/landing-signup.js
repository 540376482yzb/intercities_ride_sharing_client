import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
import { required, noEmpty, tooShort, confirmPassword } from './validator'
import TextInput from './input-text'
import RaisedButton from 'material-ui/RaisedButton'
import { registerUser } from '../../actions/auth'

const matched = confirmPassword('password')
export const SignUp = props => {
	const { submitSucceeded, error, handleSubmit, pristine, submitting, dispatch } = props

	const submitMe = value => {
		const { checkedPassword, ...newUser } = value
		return dispatch(registerUser(newUser))
	}

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
			<form onSubmit={handleSubmit(value => submitMe(value))}>
				<Field label="EMAIL" name="email" type="email" component={TextInput} validate={[required, noEmpty]} />
				<Field label="first name" name="firstName" type="text" component={TextInput} validate={[required, noEmpty]} />
				<Field label="last name" name="lastName" type="text" component={TextInput} validate={[required, noEmpty]} />
				<Field
					label="password"
					name="password"
					type="password"
					component={TextInput}
					validate={[required, noEmpty, tooShort]}
				/>
				<Field
					label="confirm password"
					name="checkedPassword"
					type="password"
					component={TextInput}
					validate={[required, noEmpty, tooShort, matched]}
				/>
				<div>
					<RaisedButton
						label="Sign Up"
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

export default reduxForm({
	form: 'signUp'
})(SignUp)
