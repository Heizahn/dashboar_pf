'use client';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

export default function BarGraphs({
	labels,
	dataset,
}: {
	labels: string[];
	dataset: { data: number[] }[];
}) {
	const datasets = [
		{
			label: 'Donaciones',
			data: dataset[0].data,
			backgroundColor: ['rgba(14, 128, 65, .6)'],
			borderColor: ['rgb(27, 148, 79)'],
			borderWidth: 3,
			barPercentage: 0.9,
			borderRadius: {
				topLeft: 5,
				topRight: 5,
			},
		},
		{
			label: 'Libros',
			data: dataset[1].data,
			backgroundColor: ['rgba(255, 205, 86, 0.6)'],
			borderColor: ['rgb(255, 205, 86)'],
			borderWidth: 3,
			barPercentage: 0.9,
			borderRadius: {
				topLeft: 5,
				topRight: 5,
			},
		},
		{
			label: 'Usuarios',
			data: dataset[2].data,
			backgroundColor: ['rgba(140, 3, 12, 0.6)'],
			borderColor: ['rgb(137, 5, 40)'],
			borderWidth: 3,
			barPercentage: 0.9,
			borderRadius: {
				topLeft: 5,
				topRight: 5,
			},
		},
	];

	const [datasetUpdate, setDatasetUpdate] = useState(datasets);

	const data = {
		labels: labelsFormatter(labels),
		datasets: datasetUpdate,
	};
	const options = {
		scales: {
			y: {
				display: true,

				min: 0,
			},
			x: {
				display: true,
			},
		},
	};

	const updateChar = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === 'Donaciones') {
			const newDatasets = [];
			newDatasets.push(datasets[0]);
			setDatasetUpdate(newDatasets);
		}
		if (e.target.value === 'Libros') {
			const newDatasets = [];
			newDatasets.push(datasets[1]);
			setDatasetUpdate(newDatasets);
		}
		if (e.target.value === 'Usuarios') {
			const newDatasets = [];
			newDatasets.push(datasets[2]);
			setDatasetUpdate(newDatasets);
		}

		if (e.target.value === 'Todos') {
			setDatasetUpdate(datasets);
		}
	};

	return (
		<div className='my-8 border-2 border-gray-200 rounded-xl flex items-center justify-center'>
			<div className='mx-auto w-11/12 '>
				<div className='flex items-center justify-end py-4'>
					<select
						onChange={updateChar}
						name='select'
						id='select'
						defaultValue='Todos'
					>
						<option defaultValue='Todos'>Todos</option>
						<option defaultValue='Donaciones'>Donaciones</option>
						<option defaultValue='Libros'>Libros</option>
						<option defaultValue='Usuarios'>Usuarios</option>
					</select>
				</div>
				<Bar data={data} options={options} />
			</div>
		</div>
	);
}

function labelsFormatter(labels: string[]) {
	return labels.map((label) => {
		const date = new Date(label);
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'short',
			timeZone: 'UTC',
		};
		const formatter = new Intl.DateTimeFormat('es-ES', options);
		return formatter.format(date);
	});
}
