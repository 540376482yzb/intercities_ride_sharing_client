import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
// import { required, noEmpty, tooShort, isNumber } from './validators'
// import { serverValidate } from './asyncValidator'
// import MenuItem from 'material-ui/MenuItem'
import TextInput from './input-text'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { authUser } from '../../actions/auth'
export const LogIn = ({
	submitSucceeded,
	error,
	handleSubmit,
	pristine,
	submitting,
	dispatch
}) => {
	const submitMe = value => {
		dispatch(authUser(value))
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
				<Field label="EMAIL" name="email" type="email" component={TextInput} />
				<Field
					label="PASSWORD"
					name="password"
					type="password"
					component={TextInput}
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

export default reduxForm({
	form: 'logIn'
})(connect()(LogIn))
