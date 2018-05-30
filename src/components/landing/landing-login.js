import React from 'react'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form'
import {required, noEmpty, tooShort} from './validator'
import {TextInput} from './input-text'
import {connect} from 'react-redux'
import {authUser} from '../../actions/auth'
import {Button} from '../utilities'
import './landing-login.css'
import LoginIcon from 'react-icons/lib/io/log-in'
import {Link} from 'react-router-dom'

export class LogIn extends React.Component {
	submitMe = value => {
		return this.props.dispatch(authUser(value))
	}
	render() {
		const {submitSucceeded, error, handleSubmit, pristine, submitting} = this.props

		let successMessage
		if (submitSucceeded) {
			successMessage = <div>Log In Successful</div>
		}
		let errorMessage
		if (error) {
			errorMessage = <div>{error}</div>
		}

		return (
			<main role="main" className="login-page">
				<form onSubmit={handleSubmit(value => this.submitMe(value))}>
					<header className="login-header">
						<LoginIcon size={30} />
						<h3>Login</h3>
					</header>
					<Field
						label="email"
						name="email"
						type="email"
						component={TextInput}
						validate={[required, noEmpty]}
						placeholder="sally@fiction.com"
					/>
					<Field
						label="password"
						name="password"
						type="password"
						component={TextInput}
						validate={[required, noEmpty, tooShort]}
						placeholder="sallymolly"
					/>
					<div>
						<Button
							label="Log In"
							color="blue"
							fullWidth={true}
							type="submit"
							disabled={pristine || submitting}
						/>
						{successMessage}
						{errorMessage}
					</div>
				</form>
				<section className="login-info">
					<p>
						Don't have an account?{' '}
						<Link to="/landing/signup" className="login-link">
							Sign up
						</Link>
					</p>
				</section>
				<section className="login-info">
					<p>For demo purpose:</p>
					<Button
						label="Demo host"
						color="blue"
						onClick={this.demoLogIn({email: 'demo1@gmail.com', password: 'demo12345'})}
					/>
					<Button
						label="Demo passenger"
						color="blue"
						onClick={this.demoLogIn({email: 'demo2@gmail.com', password: 'demo12345'})}
					/>
				</section>
			</main>
		)
	}
}

export default reduxForm({
	form: 'logIn'
})(LogIn)
