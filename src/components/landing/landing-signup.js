import React from 'react'
import { reduxForm, Field, SubmissionError, focus } from 'redux-form'
import { required, noEmpty, tooShort, confirmPassword } from './validator'
import { TextInput } from './input-text'
import { registerUser } from '../../actions/auth'
import { Button } from '../utilities'
import Register from 'react-icons/lib/io/link'
import './landing-login.css'
import { Link } from 'react-router-dom'

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
		<main role="sign up" className="login-page">
			<form onSubmit={handleSubmit(value => submitMe(value))}>
				<header className="login-header">
					<Register size={30} />
					<h3>Sign Up</h3>
				</header>
				<Field
					label="EMAIL"
					name="email"
					type="email"
					component={TextInput}
					validate={[required, noEmpty]}
				/>
				<Field
					label="first name"
					name="firstName"
					type="text"
					component={TextInput}
					validate={[required, noEmpty]}
				/>
				<Field
					label="last name"
					name="lastName"
					type="text"
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
				<Field
					label="confirm password"
					name="checkedPassword"
					type="password"
					component={TextInput}
					validate={[required, noEmpty, tooShort, matched]}
				/>
				<Button
					label="Sign Up"
					fullWidth={true}
					color="blue"
					type="submit"
					disabled={pristine || submitting}
				/>
				<div style={{ minHeight: '20px' }}>
					{successMessage}
					{errorMessage}
				</div>
			</form>
			<section className="login-info">
				Have an account?
				<Link className="login-link" to="/landing/login">
					Log in
				</Link>
			</section>
		</main>
	)
}

export default reduxForm({
	form: 'signUp'
})(SignUp)
