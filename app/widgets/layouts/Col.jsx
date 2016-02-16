import React, {Component} from 'react';

export default class Col extends Component {

	render() {
		let {
			size,
			children,
			...other
		} = this.props;

		if (!size) {
			size = 12;
		}

		let classes = 'col col-md-'+ size;

		return (
			<div className={classes} {...other} >
				{children}
			</div>
		);
	}
}
