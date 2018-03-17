import React from 'react'
import DatePicker from 'material-ui/DatePicker'
export default function DateInput({ input, label, meta, ...rest }) {
	return (
		<DatePicker
			{...input}
			{...rest}
			floatingLabelText={label}
			errorText={meta.touched && meta.error}
			value={input.value !== '' ? new Date(input.value) : null}
			onChange={(event, date) => {
				return input.onChange(date)
			}}
		/>
	)
}
