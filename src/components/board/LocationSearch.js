import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './LocationSearch.css'
export class LocationSearch extends React.Component {
	constructor(props) {
		super(props)
		this.state = { address: '' }
	}

	handleChange = address => {
		this.setState({ address })
	}

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.getLocation({ address, coordinate: latLng }))
			.catch(error => console.error('Error', error))
		this.setState({ address })
	}

	render() {
		const options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				searchOptions={options}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps }) => (
					<div style={inputStyles.container}>
						<input
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input'
							})}
							style={inputStyles.input}
						/>
						<div style={inputStyles.autocompleteContainer}>
							{suggestions.map(suggestion => {
								const style = suggestion.active
									? inputStyles.autocompleteItemActive
									: inputStyles.autocompleteItem
								return (
									<div {...getSuggestionItemProps(suggestion, { style })}>
										<span style={style}>{suggestion.description}</span>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		)
	}
}

const inputStyles = {
	container: {
		position: 'relative'
	},
	input: {
		width: '100%',
		border: 0,
		borderBottom: '2px solid #00BCD4'
	},
	autocompleteContainer: {
		width: '100%',
		zIndex: '1050',
		position: 'absolute',
		backgroundColor: 'white'
	},
	autocompleteItem: {
		backgroundColor: '#ffffff',
		padding: '10px',
		color: '#555555',
		cursor: 'pointer'
	},
	autocompleteItemActive: {
		backgroundColor: '#fafafa',
		padding: '10px',
		color: '#555555',
		cursor: 'pointer'
	}
}
