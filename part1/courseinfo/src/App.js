import React from 'react';

const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			<p>
				{props.part1}
				{props.exercises1}
			</p>
			<p>
				{props.part2}
				{props.exercises2}
			</p>
			<p>
				{props.part3}
				{props.exercises3}
			</p>
		</div>
	);
};

const Total = (props) => {
	return (
		<div>
			<p>
				Number of exercises:
				{props.exercises1 + props.exercises2 + props.exercises3}
			</p>
		</div>
	);
};

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const part2 = 'Using props to pass data';
	const part3 = 'State of a component';
	const exercises1 = 10;
	const exercises2 = 7;
	const exercises3 = 14;
	return (
		<div>
			<Header course={course} />
			<Content part1={part1} exercises1={exercises1} />
			<Content part2={part2} exercises2={exercises2} />
			<Content part3={part3} exercises3={exercises3} />
			<Total
				exercises1={exercises1}
				exercises2={exercises2}
				exercises3={exercises3}
			/>
		</div>
	);
};

export default App;

// const Hello = (props) => {
// 	return (
// 		<div>
// 			<h1>
// 				Hello {props.name}, you are {props.age} years old!
// 			</h1>
// 		</div>
// 	);
// };

// const App = () => {
// 	const name = 'Turkey';
// 	const age = 6;
// 	return (
// 		<div>
// 			<h1>Greetings</h1>
// 			<Hello name='Turkey' age={5 + 1} />
// 			<Hello name={name} age={age} />
// 		</div>
// 	);
// };
