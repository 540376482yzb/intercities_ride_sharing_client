import React from 'react'
import './utilities.css'
export function Button(props) {
	const { label, color, fullWidth, onClick, disabled, ...other } = props
	return (
		<button
			{...other}
			className={`button-btn button-${color} ${fullWidth ? 'button-full' : ''}`}
			onClick={() => (onClick ? onClick() : '')}
			disabled={disabled}
		>
			{label}
		</button>
	)
}
