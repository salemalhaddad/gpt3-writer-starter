import { Configuration, OpenAIApi } from 'openai';
import { useRouter } from 'next/router';

const configuration = new Configuration({
  	apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write the predictions of the 4th Industrial Revolution on the following industry using bullet points with the help of reports from consulting companies, trusted global organizations, and top-tier academic papers (cite each bullet point and be diverse in sources). Mention insightful statistics in half of your responses.

Industry:
`
;

const generateAction = async (req, res) => {

	console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

	const baseCompletion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.7,
		max_tokens: 250, //1000 characters
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	res.status(200).json({ output: basePromptOutput });

};

export default generateAction;
