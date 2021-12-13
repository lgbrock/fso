import React from 'react';

// need to fix - wont render

const Header = () => {
	const name = 'Web development curriculum';
	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
};

const Part = ({ part }) => {
	console.log(part);
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((acc, part) => acc + part.exercises, 0);

	return (
		<p>
			<b>Total of {total} exercises</b>
		</p>
	);
};

const Course = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
			parts: [
				{
					name: 'Fundamentals of React',
					exercises: 10,
					id: 1,
				},
				{
					name: 'Using props to pass data',
					exercises: 7,
					id: 2,
				},
				{
					name: 'State of a component',
					exercises: 14,
					id: 3,
				},
				{
					name: 'Redux',
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1,
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2,
				},
			],
		},
	];
	return (
		<div>
			<Header parts={courses[0].name} />
			<Content parts={courses[0].parts} />
			<Total parts={courses[0].parts} />
		</div>
	);
};

export default Course;
