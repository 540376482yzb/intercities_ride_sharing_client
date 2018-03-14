import React from 'react'
import TextField from 'material-ui/TextField'
export default function TextInput({ multiLine, input, label, meta, ...rest }) {
	const styles = { width: '95%', margin: '0 auto' }
	return (
		<div style={styles}>
			<TextField
				{...input}
				{...rest}
				multiLine={multiLine}
				hintText={label}
				floatingLabelText={label}
				errorText={meta.touched && meta.error}
				autoComplete="off"
				fullWidth={true}
			/>
		</div>
	)
}
