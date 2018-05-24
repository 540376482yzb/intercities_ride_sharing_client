import React from 'react'
import './input-text.css'
export function TextInput({ input, type, label, placeholder, meta, ...rest }) {
	return (
		<section>
			<label className="input-label" htmlFor={label}>
				{label}
			</label>
			<input
				{...input}
				{...rest}
				type={type}
				label={label}
				name={label}
				className="input-input"
				placeholder={placeholder}
			/>
			<div className="input-error">{meta.touched && meta.error ? meta.error : ''}</div>
		</section>
	)
}
