import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

import { actionTypes } from '@servicenow/ui-core';

import {
	CAT_LOAD_REQUESTED
} from '../constants';

const view = (state, { updateState }) => {
	const {
		catImageURL
	} = state;

	return (
		<div>
			<img className="catImages" src={catImageURL} />
		</div>
	);
};

createCustomElement('x-784437-demo-component-external-url', {
	renderer: { type: snabbdom },
	view,
	styles,
	actionHandlers: {
		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
			dispatch(CAT_LOAD_REQUESTED);

		},
		[CAT_LOAD_REQUESTED]: ({ updateState }) => {
			const https = require('https');

			https.get('https://api.thecatapi.com/v1/images/search', (resp) => {
				let data = '';

				resp.on('data', (chunk) => {
					data += chunk;
				});

				resp.on('end', () => {
					updateState({ catImageURL: JSON.parse(data)[0].url });
				});

			}).on("error", (err) => {
				console.log("Error: " + err.message);
			});
		}
	}
});