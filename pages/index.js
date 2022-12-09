import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/router';


const Home = () => {
	const Router = useRouter();

	const [userInput, setUserInput] = useState('');
	const [inputValue, setInputValue] = useState('');

	const onUserChangedText = (event) => {
		console.log(event.target.value);
		setUserInput(event.target.value);

	};
	const onUserChangedKey = (event) => {
		console.log(event.target.value);
		setInputValue(event.target.value);
		process.env.OPENAI_API_KEY = event.target.value;
	};

	const [apiOutput, setApiOutput] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)

	const callGenerateEndpoint = async () => {
		setIsGenerating(true);

		console.log("Calling OpenAI...")
			const response = await fetch(`/api/generate/`, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userInput }),
			});

			const data = await response.json();
			const { output } = data;
			console.log("OpenAI replied...", output.text)

			setApiOutput(`${output.text}`);
			setIsGenerating(false);
	}

	const encode = (input) => {
		return btoa(input);
	};

	const apiKeyRegex = /^[a-f0-9]{32}$/;




	return (
		<div className="root">
		<Head>
			<title>GPT-3 Writer | 4IR </title>
		</Head>
		<div className="container">
			<div className="header">
			<div className="header-title">
				<h1>How the 4th Industrial Revolution is affecting industries—through numbers, trends, and predictions</h1>
			</div>
			<br></br>
			<br></br>
			<br></br>

			<div className="header-subtitle">
				<h2>How would the 4IR be helpful? How will it optimize certain industries? Select an industry to answer these questions: </h2>
				{/* <p>1. Insert your OpenAI's API key (it will not be stored)</p>
				<p>2. Select an industry you'd like to know it's future after the 4IR</p> */}
			</div>
			</div>
			{/* <div id="key_needed">
				<p>To get started, add your OpenAI API Key!</p>
				<input id="key_input"
					type="text"
					value={inputValue}
					onChange={onUserChangedKey}
				/>
				<button id="save_key_button" >Add key</button>
			</div>
			<div id="key_entered">
				<p>You entered your OpenAI API Key.</p>
				<button id="change_key_button">Change key</button>
			</div> */}
			<Textarea
				className="bText"
				label="Write your thoughts"
				color="default"
				placeholder="Enter your amazing ideas."
				value={userInput}
				onChange={onUserChangedText}
			/>
			<div className="prompt-buttons">
			<a
				className={isGenerating ? 'generate-button loading' : 'generate-button'}
				onClick={callGenerateEndpoint}
			>
				<div className="generate">
				{isGenerating ? <span className="loader"></span> : <p>Generate</p>}
				</div>
			</a>
			</div>
			{apiOutput && (
			<div className="output">
				<div className="output-header-container">
				<div className="output-header">
					<h3>Output</h3>
				</div>
				</div>
				<div className="output-content">
				<p>{apiOutput}</p>
				</div>
			</div>
			)}
		</div>
		<div className="badge-container grow">
			<a
			href="https://buildspace.so/builds/ai-writer"
			target="_blank"
			rel="noreferrer"
			>
			<div className="badge">
				<Image src={buildspaceLogo} alt="buildspace logo" />
				<p>build with buildspace</p>
			</div>
			</a>
		</div>
		</div>
	);
};

export default Home;
