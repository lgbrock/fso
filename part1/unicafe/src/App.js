import React, { useState } from 'react';

const Button = (props) => {
	console.log(props);
	return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
	// displays statistics about feedback
	console.log(props);
	if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</div>
		);
	}

	return (
		<div>
			<h1>Statistics</h1>
			<StatisticLine text='good' value={props.good} />
			<StatisticLine text='neutral' value={props.neutral} />
			<StatisticLine text='bad' value={props.bad} />
			<StatisticLine
				text='all'
				value={props.good + props.neutral + props.bad}
			/>
			<StatisticLine
				text='average'
				value={
					(props.good - props.bad) / (props.good + props.neutral + props.bad)
				}
			/>
			<StatisticLine
				text='positive'
				value={
					(props.good / (props.good + props.neutral + props.bad)) * 100 + ' %'
				}
			/>
		</div>
	);
};

const StatisticLine = (props) => {
	// always displays a single statistic
	// show output in a table
	console.log(props);
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text='good' />
			<Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
			<Button handleClick={() => setBad(bad + 1)} text='bad' />
			<Statistics good={good} neutral={neutral} bad={bad} />
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
