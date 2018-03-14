import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import DrawerList from './drawer-list'
import LandingHeader from '../landing/landing-header'
import '../landing/landing-header.css'
import './board.css'
import HostForm from './host-form.js'
import { connect } from 'react-redux'
import { fetchRides } from '../../actions/rides'
import Chip from 'material-ui/Chip'
import { blue300, indigo900 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
export class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}
	openDrawer = () => this.setState({ open: !this.state.open })
	closeDrawer = () => this.setState({ open: false })

	componentDidMount() {
		this.props.dispatch(fetchRides())
	}

	getRating(value) {
		switch (value) {
		case 1:
			return '★☆☆☆☆'
		case 2:
			return '★★☆☆☆'
		case 3:
			return '★★★☆☆'
		case 4:
			return '★★★★☆'
		case 5:
			return '★★★★★'
		default:
			return '★★★★★'
		}
	}
	getSanitizedDate(date) {
		const re = 'T00'
		const charIndex = date.search(re)
		return date.slice(0, charIndex)
	}
	render() {
		const rides = this.props.rides
		let renderComponents = <div />
		if (rides) {
			renderComponents = rides.map((ride, index) => {
				return (
					<Card key={index}>
						<CardHeader
							title={`${ride.driver.firstName} ${ride.driver.lastName}`}
							titleStyle={{ fontWeight: 600, fontSize: '1rem' }}
							subtitle={this.getRating(Number(ride.driver.rating))}
							subtitleStyle={{ fontSize: '1rem', color: 'orange' }}
							avatar="/images/person.svg"
							actAsExpander={true}
							showExpandableButton={true}
						/>
						<CardText>
							<div className="shortDesc">
								<span className="shortDesc-prefix">FROM</span>
								<span className="shortDesc-suffix">
									<Chip backgroundColor="#A5D6A7">{`${ride.startCity.city},${
										ride.startCity.state
									}`}</Chip>
								</span>
							</div>
							<div className="shortDesc">
								<span className="shortDesc-prefix">TO</span>
								<span className="shortDesc-suffix">
									<Chip backgroundColor="#FFA726">{`${ride.arriveCity.city},${
										ride.arriveCity.state
									}`}</Chip>
								</span>
							</div>
							<div className="date">
								<span className="date-prefix">ON</span>
								<span className="date-suffix">
									<Chip backgroundColor={blue300}>
										{this.getSanitizedDate(ride.scheduleDate)}
									</Chip>
								</span>
							</div>
						</CardText>
						<CardText expandable={true}>
							<header />
							<section>
								<div>
									<Chip backgroundColor="#FCE4EC">
										<strong>Fare Cost is ${ride.rideCost}</strong>
									</Chip>
								</div>
								<header>
									<h3>Rules to follow:</h3>
								</header>
								<p>{ride.disClaimer}</p>
							</section>
						</CardText>
						<CardActions expandable={true}>
							<RaisedButton label="REQUEST" primary={true} />
						</CardActions>
					</Card>
				)
			})
		}
		return (
			<div className="board-container">
				<AppBar
					className="board-navbar"
					title="Ride Sharing Infomation"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					onLeftIconButtonClick={() => this.openDrawer()}
				/>
				{renderComponents}
				<Drawer
					docked={false}
					width={350}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
				>
					<header className="header-container">
						<div className="board-logo">
							<LandingHeader filter={true} opacityValue={1} height={4} />
						</div>
						<div className="board-close-btn">
							<FlatButton
								label="&#11164;"
								labelStyle={{ fontSize: '1.3rem', color: 'white' }}
								onClick={() => this.closeDrawer()}
							/>
						</div>
					</header>
					<DrawerList onClick={() => this.closeDrawer()} />
				</Drawer>
				<HostForm />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		rides: state.rideReducer.rides
	}
}

export default connect(mapStateToProps)(Board)
