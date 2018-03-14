import React from 'react'
import SelectField from 'material-ui/SelectField'
export default function SelectInput({ input, label, meta, children, ...rest }) {
	return (
		<SelectField
			floatingLabelText={label}
			errorText={meta.touched && meta.error}
			{...input}
			{...rest}
			fullWidth={true}
			onChange={(event, index, value) => input.onChange(value)}
			children={children}
		/>
	)
}
