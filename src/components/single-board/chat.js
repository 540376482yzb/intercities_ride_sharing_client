import React from 'react'
import io from 'socket.io-client'
import FlatButton from 'material-ui/FlatButton'
import * as moment from 'moment'
import { connect } from 'react-redux'
const msgStyles = {
	display: 'inline-block',
	maxWidth: '200px',
	padding: '0.5rem 1rem',
	textAlign: 'center',
	backgroundColor: '#EEEEEE',
	borderRadius: '2px',
	overflowWrap: 'break-word',
	wordWrap: 'break-word',
	verticalAlign: 'top',
	color: '#37474F',
	fontWeight: 400
}
const authorStyles = {
	display: 'inline-Block',
	width: '2rem',
	height: '2rem',
	textAlign: 'center',
	lineHeight: '2rem',
	borderRadius: '100%',
	textTransform: 'Uppercase',
	backgroundColor: '#7CB342',
	color: '#F5F5F5',
	marginRight: '2rem'
}
const dateStyles = {
	display: 'block',
	fontWeight: 300,
	color: '#9E9E9E',
	fontSize: '0.8rem',
	fontStyle: 'italic',
	padding: '0.5rem 2rem'
}

const mapStateToProps = state => {
	return {
		socket: state.socket.socket
	}
}

export class Chat extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			message: '',
			msgHistory: [],
			numberInRoom: 1
		}
	}

	sendMessage(e) {
		e.preventDefault()

		this.props.socket.emit('SEND_MESSAGE', {
			roomId: this.props.roomId,
			messageBody: {
				author: this.state.username,
				message: this.state.message,
				createdOn: moment().format('MMMM Do YYYY, h:mm:ss a')
			}
		})

		this.setState({ message: '' })
	}

	gotoBottom(id) {
		const el = document.getElementById(id)
		el.scrollTop = el.scrollHeight - el.clientHeight
	}

	componentDidMount() {
		const { currentUser, roomId } = this.props
		this.props.socket.emit('JOIN_ROOM', { roomId, currentUser })

		const addMessage = data => {
			const msg = {
				body: data
			}
			// console.log(msg)
			this.setState({ msgHistory: [...this.state.msgHistory, msg] })
			this.gotoBottom('chat')
		}

		this.props.socket.on('RECEIVE_MESSAGE', function(data) {
			//object inside callback lost ref of this
			addMessage(data)
			// console.log(data)
		})

		this.props.socket.on('JOIN_ROOM', data => {
			const msg = {
				type: 'broadcast',
				body: data
			}

			this.setState({
				numberInRoom: this.state.numberInRoom + 1,
				msgHistory: [...this.state.msgHistory, msg]
			})
		})

		this.props.socket.on('LEAVING_ROOM', data => {
			const msg = {
				type: 'broadcast',
				body: data
			}

			this.setState({
				numberInRoom: this.state.numberInRoom - 1,
				msgHistory: [...this.state.msgHistory, msg]
			})
		})
		this.setState({
			username: currentUser.firstName
		})
	}

	componentWillUnmount() {
		this.props.socket.emit('LEAVING_ROOM', {
			roomId: this.props.roomId,
			username: this.state.username
		})
	}

	renderSenderList(message) {
		return (
			<div>
				{<span style={authorStyles}>{message.author[0]}</span>}
				{<span style={msgStyles}>{message.message}</span>}
				{<span style={dateStyles}>{message.createdOn}</span>}
			</div>
		)
	}
	renderReceiverList(message) {
		return (
			<div>
				{
					<span
						style={{
							...msgStyles,
							backgroundColor: '#3F51B5',
							color: '#E3F2FD'
						}}
					>
						{message.message}
					</span>
				}
				{
					<span
						style={{
							...authorStyles,
							backgroundColor: '#303F9F',
							color: '#F5F5F5',
							marginLeft: '2rem'
						}}
					>
						{message.author[0]}
					</span>
				}
				{<span style={dateStyles}>{message.createdOn}</span>}
			</div>
		)
	}
	render() {
		return (
			<div>
				<header>
					<h3 style={{ textAlign: 'center' }}>Welcome To the Chat Room</h3>
				</header>
				<main style={{ backgroundColor: '#FAFAFA' }}>
					<ul
						id="chat"
						style={{
							overflowY: 'scroll',
							minHeight: '300px',
							maxHeight: '300px',
							listStyleType: 'none',
							paddingLeft: '12px',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						{this.state.msgHistory.map((message, index) => {
							if (message.type === 'broadcast') {
								return (
									<li key={index} style={{ margin: '0.8rem 0', color: 'grey' }}>
										{message.body}
									</li>
								)
							}
							return message.body.author === this.state.username ? (
								<li key={index} style={{ margin: '0.8rem 0' }}>
									{this.renderSenderList(message.body)}
								</li>
							) : (
								<li key={index} style={{ margin: '0.8rem 0', textAlign: 'right' }}>
									{this.renderReceiverList(message.body)}
								</li>
							)
						})}
					</ul>
					<footer>
						<form onSubmit={e => e.preventDefault()}>
							<div style={{ width: '80%', display: 'inline-block' }}>
								<input
									style={{ padding: '0.5rem 0.2rem', width: '90%' }}
									type="text"
									placeholder="message"
									value={this.state.message}
									onChange={e => this.setState({ message: e.target.value })}
								/>
							</div>
							<div style={{ width: '20%', display: 'inline-block' }}>
								<FlatButton label="Send" type="submit" onClick={e => this.sendMessage(e)} />
							</div>
						</form>
					</footer>
				</main>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Chat)
