import React from 'react'
import {connect} from 'react-redux'
import { fetchCheese } from '../actions/scratch'

export class CheeseList extends React.Component{
	componentDidMount(){
		this.props.dispatch(fetchCheese())
	}
	loadCheeses(){
		let cheesesList
		if(this.props.cheeses.length !==0){
			cheesesList = this.props.cheeses.map((cheese,index) => {
				return(<li key={index}>{cheese}</li>)
			})
		}
		return cheesesList
	}
	render(){
		const loadingMSG = this.props.loading
			?'Loading'
			:''
		const errorMSG = this.props.error
			?`${this.props.error}`
			:''

		return(
			<div>
				<h1>
					{loadingMSG}
					{errorMSG}
				</h1>
				<ul>
					{this.loadCheeses()}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.loading,
	cheeses:state.cheeses,
	error:state.error
})

export default connect(mapStateToProps)(CheeseList)
