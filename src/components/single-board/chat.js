import React from 'react'
import io from 'socket.io-client'
import FlatButton from 'material-ui/FlatButton'
import * as moment from 'moment'

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
export default class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			message: '',
			msgHistory: []
		}

		//set up io
		this.socket = io('localhost:8080')
		this.socket.on('RECEIVE_MESSAGE', function(data) {
			addMessage(data)
		})

		const addMessage = data => {
			console.log(data)
			this.setState({ msgHistory: [...this.state.msgHistory, data] })
			console.log(this.state.msgHistory)
		}

		this.sendMessage = e => {
			e.preventDefault()
			this.socket.emit('SEND_MESSAGE', {
				author: this.state.username,
				message: this.state.message
			})
			this.setState({ message: '' })
		}
	}
	componentDidMount() {
		this.setState({ username: this.props.currentUserName })
	}
	render() {
		return (
			<div>
				<header>
					<h3 style={{ textAlign: 'center' }}>Welcome To the Chat Room</h3>
				</header>
				<main>
					<ul
						style={{
							overflowY: 'scroll',
							minHeight: '300px',
							maxHeight: '300px',
							listStyleType: 'none',
							paddingLeft: '12px',
							background: '#FAFAFA',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						{this.state.msgHistory.map(
							(message, index) =>
								message.author === this.state.username ? (
									<li key={index} style={{ margin: '0.8rem 0' }}>
										{<span style={authorStyles}>{message.author[0]}</span>}
										{<span style={msgStyles}>{message.message}</span>}
										{
											<span style={dateStyles}>
												{moment().format('MMMM Do YYYY, h:mm:ss a')}
											</span>
										}
									</li>
								) : (
									<li
										key={index}
										style={{ margin: '0.8rem 0', textAlign: 'right' }}
									>
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
										{
											<span style={dateStyles}>
												{moment().format('MMMM Do YYYY, h:mm:ss a')}
											</span>
										}
									</li>
								)
						)}
					</ul>
					<footer>
						<form onSubmit={e => e.preventDefault()}>
							<input
								style={{ padding: '0.5rem 0.5rem', width: '250px' }}
								type="text"
								placeholder="message"
								value={this.state.message}
								onChange={e => this.setState({ message: e.target.value })}
							/>
							<FlatButton
								label="Send"
								type="submit"
								onClick={e => this.sendMessage(e)}
							/>
						</form>
					</footer>
				</main>
			</div>
		)
	}
}
