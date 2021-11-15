import React from 'react';

const Header = (props) => {
	console.log(props);
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};

const Part = (props) => {
	console.log(props);
	return (
		<div>
			<p>
				{props.part}
				{props.exercises}
			</p>
		</div>
	);
};

const Content = () => {
	const part1 = 'Fundamentals of React';
	const part2 = 'Using props to pass data';
	const part3 = 'State of a component';
	const exercises1 = 10;
	const exercises2 = 7;
	const exercises3 = 14;
	return (
		<div>
			<Part part={part1} exercises={exercises1} />
			<Part part={part2} exercises={exercises2} />
			<Part part={part3} exercises={exercises3} />
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

	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10,
	};
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7,
	};
	const part3 = {
		name: 'State of a component',
		exercises: 14,
	};

	return (
		<div>
			<Header course={course} />
			<Content />
			<Total
				exercises1={part1.exercises}
				exercises2={part2.exercises}
				exercises3={part3.exercises}
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
