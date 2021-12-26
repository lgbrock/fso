import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

// axios.get('http://localhost:3001/notes').then((response) => {
// 	const notes = response.data;
// 	console.log(notes);
// });

// *-- Unpractical Usages --*
// axios.get('http://localhost:3001/notes').then((response) => {
// 	const notes = response.data;
// 	console.log(notes);
// });

// const promise = axios.get('http://localhost:3001/notes');
// promise.then((response) => {
// 	console.log(response);
// });

// const promise2 = axios.get('http://localhost:3001/foobar');
// console.log(promise2);

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );
