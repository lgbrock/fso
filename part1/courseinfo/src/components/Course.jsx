import React from 'react';

const Header = (props) => {
	console.log(props);
	// name of course
	return (
		<div>
			<h2>{props.course}</h2>
		</div>
	);
};

const Part = (props) => {
	console.log(props);
	// name of part
	// exercise count
	return (
		<div>
			<p>
				{props.part} {props.exercises}
			</p>
		</div>
	);
};

const Content = (props) => {
	console.log(props);
	// parts and number of exercises
	return (
		<div>
			{props.parts.map((part) => (
				<Part key={part.id} part={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

const Total = (props) => {
	console.log(props);
	// total number of exercises
	return (
		<div>
			<p>
				<b>
					Total of{' '}
					{props.parts.reduce((total, part) => total + part.exercises, 0)}{' '}
					exercises
				</b>
			</p>
		</div>
	);
};

const Course = (props) => {
	console.log(props);
	return (
		<div>
			<Header course={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</div>
	);
};

export default Course;

// *-- OLD VERSION --*

// import React from 'react';

// // need to fix - wont render

// const Header = () => {
// 	const name = 'Web development curriculum';
// 	return (
// 		<div>
// 			<h1>{name}</h1>
// 		</div>
// 	);
// };

// const Part = ({ part }) => {
// 	console.log(part);
// 	return (
// 		<p>
// 			{part.name} {part.exercises}
// 		</p>
// 	);
// };

// const Content = ({ parts }) => {
// 	return (
// 		<div>
// 			{parts.map((part) => (
// 				<Part key={part.id} part={part} />
// 			))}
// 		</div>
// 	);
// };

// const Total = ({ parts }) => {
// 	const total = parts.reduce((acc, part) => acc + part.exercises, 0);

// 	return (
// 		<p>
// 			<b>Total of {total} exercises</b>
// 		</p>
// 	);
// };

// const Course = () => {
// 	const courses = [
// 		{
// 			name: 'Half Stack application development',
// 			id: 1,
// 			parts: [
// 				{
// 					name: 'Fundamentals of React',
// 					exercises: 10,
// 					id: 1,
// 				},
// 				{
// 					name: 'Using props to pass data',
// 					exercises: 7,
// 					id: 2,
// 				},
// 				{
// 					name: 'State of a component',
// 					exercises: 14,
// 					id: 3,
// 				},
// 				{
// 					name: 'Redux',
// 					exercises: 11,
// 					id: 4,
// 				},
// 			],
// 		},
// 		{
// 			name: 'Node.js',
// 			id: 2,
// 			parts: [
// 				{
// 					name: 'Routing',
// 					exercises: 3,
// 					id: 1,
// 				},
// 				{
// 					name: 'Middlewares',
// 					exercises: 7,
// 					id: 2,
// 				},
// 			],
// 		},
// 	];
// 	return (
// 		<div>
// 			<Header parts={courses[0].name} />
// 			<Content parts={courses[0].parts} />
// 			<Total parts={courses[0].parts} />
// 		</div>
// 	);
// };

// export default Course;
