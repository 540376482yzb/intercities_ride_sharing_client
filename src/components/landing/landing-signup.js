import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
// import { required, noEmpty, tooShort, isNumber } from './validators'
// import { serverValidate } from './asyncValidator'
import TextInput from './input-text'
import RaisedButton from 'material-ui/RaisedButton'
import { registerUser } from '../../actions/auth'
export const SignUp = ({
	submitSucceeded,
	error,
	handleSubmit,
	pristine,
	submitting,
	dispatch
}) => {
	const submitMe = value => {
		console.log(value)
		dispatch(registerUser(value))
	}

	let successMessage
	if (submitSucceeded) {
		successMessage = <div>Complaint successfully submitted</div>
	}
	let errorMessage
	if (error) {
		errorMessage = <div>{error}</div>
	}

	return (
		<div>
			<form onSubmit={handleSubmit(value => submitMe(value))}>
				<Field label="EMAIL" name="email" type="email" component={TextInput} />
				<Field
					label="FIRST NAME"
					name="firstName"
					type="text"
					component={TextInput}
				/>
				<Field
					label="LAST NAME"
					name="lastName"
					type="text"
					component={TextInput}
				/>
				<Field
					label="PASSWORD"
					name="password"
					type="password"
					component={TextInput}
				/>
				<Field
					label="CONFIRM PASSWORD"
					name="confirmPassword"
					type="password"
					component={TextInput}
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
