import React, { useState } from 'react';

const History = (props) => {
	if (props.allClicks.length === 0) {
		return <div>the app is used by pressing the buttons</div>;
	}
	return <div>button press history: {props.allClicks.join(' ')}</div>;
};

const Display = (props) => <div>{props.value}</div>;

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);
	const [allClicks, setAll] = useState([]);
	const [value, setValue] = useState(0);

	const handleLeftClick = () => {
		setAll(allClicks.concat('L'));
		setLeft(left + 1);
	};

	const handleRightClick = () => {
		setAll(allClicks.concat('R'));
		setRight(right + 1);
	};

	const setToValue = (newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			{left}
			<Button handleClick={handleLeftClick} text='left' />
			<Button handleClick={handleRightClick} text='right' />
			{right}
			<History allClicks={allClicks} />
			<Display value={value} />
			<Button handleClick={() => setValue(1000)} text='thousand' />
			<Button handleClick={() => setValue(0)} text='reset' />
			<Button handleClick={() => setValue(value + 1)} text='increment +1' />
		</div>
	);
};

// const App = () => {
// 	const [counter, setCounter] = useState(0);

// 	const increaseByOne = () => setCounter(counter + 1);
// 	const decreaseByOne = () => setCounter(counter - 1);
// 	const setToZero = () => setCounter(0);

// 	return (
// 		<div>
// 			<Display counter={counter} />
// 			<Button onClick={increaseByOne} text='plus' />
// 			<Button onClick={setToZero} text='zero' />
// 			<Button onClick={decreaseByOne} text='minus' />
// 		</div>
// 	);
// };

// const Hello = ({ name, age }) => {
// 	const bornYear = () => new Date().getFullYear() - age;

// 	return (
// 		<div>
// 			<p>
// 				Hello {name}, you are {age} years old
// 			</p>
// 			<p>So you were probably born in {bornYear()}</p>
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

// const Header = (props) => {
// 	console.log(props);
// 	return (
// 		<div>
// 			<h1>{props.course}</h1>
// 		</div>
// 	);
// };

// const Part = (props) => {
// 	console.log(props);
// 	return (
// 		<div>
// 			<p>
// 				{props.part}
// 				{props.exercises}
// 			</p>
// 		</div>
// 	);
// };

// const Content = () => {
// 	const part1 = 'Fundamentals of React';
// 	const part2 = 'Using props to pass data';
// 	const part3 = 'State of a component';
// 	const exercises1 = 10;
// 	const exercises2 = 7;
// 	const exercises3 = 14;
// 	return (
// 		<div>
// 			<Part part={part1} exercises={exercises1} />
// 			<Part part={part2} exercises={exercises2} />
// 			<Part part={part3} exercises={exercises3} />
// 		</div>
// 	);
// };

// const Total = (props) => {
// 	return (
// 		<div>
// 			<p>
// 				Number of exercises:
// 				{props.exercises1 + props.exercises2 + props.exercises3}
// 			</p>
// 		</div>
// 	);
// };

// const App = () => {
// 	const course = 'Half Stack application development';
// 	const parts = [
// 		{
// 			name: 'Fundamentals of React',
// 			exercises: 10,
// 		},
// 		{
// 			name: 'Using props to pass data',
// 			exercises: 7,
// 		},
// 		{
// 			name: 'State of a component',
// 			exercises: 14,
// 		},
// 	];

// 	return (
// 		<div>
// 			<Header course={course} />
// 			<Content parts={parts} />
// 			<Total
// 				exercises1={parts[0].exercises}
// 				exercises2={parts[1].exercises}
// 				exercises3={parts[2].exercises}
// 			/>
// 			<Total parts={parts} />
// 		</div>
// 	);
// };

export default App;
