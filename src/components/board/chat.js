import React from 'react'
import io from 'socket.io-client'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Button } from '../utilities'
import './chat.css'
import ChatIcon from 'react-icons/lib/io/chatboxes'
import Return from 'react-icons/lib/io/arrow-return-left'

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

export class Chat extends React.Component {
	handleSubmit = e => {
		e.preventDefault()
		this.props.sendMessage(this.input.value)
		this.gotoBottom('chat')
	}
	gotoBottom(id) {
		const el = document.getElementById(id)
		el.scrollTop = el.scrollHeight + 1000
	}
	componentDidMount() {
		this.gotoBottom('chat')
	}
	renderSenderList(message) {
		return (
			<div>
				{<span style={authorStyles}>{message.author.firstName}</span>}
				{<span style={msgStyles}>{message.body}</span>}
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
						{message.body}
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
						{message.author.firstName}
					</span>
				}
				{<span style={dateStyles}>{message.createdOn}</span>}
			</div>
		)
	}
	render() {
		const { messages, currentUser } = this.props
		return (
			<div className="chat-outer">
				<header className="chat-header">
					<ChatIcon size={30} color="#29b4d6" />
					<h3 style={{ textAlign: 'center' }}>Instant Message Board</h3>
				</header>
				<main style={{ backgroundColor: '#FAFAFA' }}>
					<ul id="chat">
						{messages.map((message, index) => {
							if (message.type === 'broadcast') {
								return (
									<li key={index} style={{ margin: '0.8rem 0', color: 'grey' }}>
										{message.body}
									</li>
								)
							}
							return message.author.id === currentUser.id ? (
								<li key={index} style={{ margin: '0.8rem 0' }}>
									{this.renderSenderList(message)}
								</li>
							) : (
								<li key={index} style={{ margin: '0.8rem 0', textAlign: 'right' }}>
									{this.renderReceiverList(message)}
								</li>
							)
						})}
					</ul>
					<form onSubmit={this.handleSubmit}>
						<div style={{ width: '100%', display: 'inline-block', position: 'relative' }}>
							<input
								style={{ padding: '0.5rem 0.2rem', width: '100%', paddingRight: '45px' }}
								type="text"
								placeholder="message"
								ref={ref => (this.input = ref)}
							/>
							<Button
								type="submit"
								color="white"
								label={<Return size={12} />}
								style={{ position: 'absolute', right: '1px', top: '1px', boxShadow: 'none' }}
							/>
						</div>
					</form>
				</main>
			</div>
		)
	}
}

export default connect()(Chat)
