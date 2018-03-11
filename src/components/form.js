import React from "react"
import { reduxForm, Field } from "redux-form"
import { addCheeseRequest, addCheese } from "../actions/scratch"

export class Form extends React.Component {
	sendCheese(value) {
		console.log(value)
		this.props.dispatch(addCheeseRequest())
		this.props.dispatch(addCheese(value))
	}
	render() {
		console.log(this.props)
		const { handleSubmit } = this.props
		return (
			<div>
				<form onSubmit={handleSubmit(value => this.sendCheese(value))}>
					<label htmlFor="name" style={{ display: "block" }} />
					<Field component="input" name="name" id="name" type="text" />
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}
export default reduxForm({
	form: "cheeseForm"
})(Form)
