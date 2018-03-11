import React from "react"
import { connect } from "react-redux"
import { fetchCheese } from "../actions/scratch"
import Form from "./form"
import "./cheeseList.css"
export class CheeseList extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchCheese())
	}
	loadCheeses() {
		let cheesesList
		if (this.props.cheeses.length !== 0) {
			cheesesList = this.props.cheeses.map((cheese, index) => {
				return <li key={index}>{cheese.name}</li>
			})
		}
		return cheesesList
	}
	render() {
		const loadingMSG = this.props.loading ? "Loading" : ""
		const errorMSG = this.props.error ? `${this.props.error}` : ""

		return (
			<div className="cheeseList">
				<h1>
					{loadingMSG}
					{errorMSG}
				</h1>
				<ul>{this.loadCheeses()}</ul>
				<Form />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.cheeseReducer.loading,
		cheeses: state.cheeseReducer.cheeses,
		error: state.cheeseReducer.error
	}
}

export default connect(mapStateToProps)(CheeseList)
