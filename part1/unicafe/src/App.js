import React, { useState } from 'react';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	// const handleGoodClick = () => {
	// 	setGood(good + 1);
	// };

	// const handleNeutralClick = () => {
	// 	setNeutral(neutral + 1);
	// };

	// const handleBadClick = () => {
	// 	setBad(bad + 1);
	// };

	return (
		<div>
			<h1>Give feedback</h1>
			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>
			<h1>Statistics</h1>
			good {good}
			<br />
			neutral {neutral}
			<br />
			bad {bad}
			<br />
			all {good + neutral + bad}
			<br />
			average {(good - bad) / (good + neutral + bad)}
			<br />
			positive {(good / (good + neutral + bad)) * 100} %
		</div>
	);
};

export default App;

// import { useState } from 'react';

// const Button = (props) => (
// 	<button onClick={props.handleClick}>{props.text}</button>
// );

// const StatisticLine = (props) => {
// 	return (
// 		<div>
// 			<p>
// 				{props.text} {props.value}
// 			</p>
// 		</div>
// 	);
// };

// const Statistics = ({ good, neutral, bad }) => {
// 	const total = good + neutral + bad;
// 	const average = (good - bad) / total;
// 	const positive = good / total;
// 	return (
// 		<>
// 			<StatisticLine text='Good' value={good} />
// 			<StatisticLine text='Neutral' value={neutral} />
// 			<StatisticLine text='Bad' value={bad} />
// 			<StatisticLine text='All' value={good + neutral + bad} />
// 			<StatisticLine text='Average' value={average.toFixed(2) + '%'} />
// 			<StatisticLine text='Positive' value={positive.toFixed(2) * 100 + '%'} />
// 		</>
// 	);
// };

// const NoFeedback = (props) => {
// 	if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
// 		return (
// 			<div>
// 				<p>No feedback given</p>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<Statistics good={props.good} neutral={props.neutral} bad={props.bad} />
// 		);
// 	}
// };

// const App = () => {
// 	const [good, setGood] = useState(0);
// 	const [neutral, setNeutral] = useState(0);
// 	const [bad, setBad] = useState(0);

// 	const handleGoodClick = () => {
// 		setGood(good + 1);
// 	};

// 	const handleNeutralClick = () => {
// 		setNeutral(neutral + 1);
// 	};

// 	const handleBadClick = () => {
// 		setBad(bad + 1);
// 	};

// 	return (
// 		<>
// 			<h1>Give Feedback</h1>
// 			<Button handleClick={handleGoodClick} text='good' />
// 			<Button handleClick={handleNeutralClick} text='neutral' />
// 			<Button handleClick={handleBadClick} text='bad' />
// 			<h1>Statistics</h1>
// 			<NoFeedback good={good} neutral={neutral} bad={bad} />
// 			<StatisticLine />
// 		</>
// 	);
// };

// export default App;
