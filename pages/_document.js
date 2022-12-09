import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react';
import React from 'react';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return {
		  ...initialProps,
		  styles: React.Children.toArray([initialProps.styles])
		};
	  }
	render() {
		return (
			<Html>
			<Head>
				{CssBaseline.flush()}
				{/* // <meta property="og:title" content="GPT-3 Writer" key="title"/>
				// <meta property="og:description" content="build with buildspace" key="description"/>
				// <meta
				//   property="og:image"
				//   content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg"
				// />
				// <meta name="twitter:card" content="summary_large_image"></meta> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
			</Html>
		);
	}
}
