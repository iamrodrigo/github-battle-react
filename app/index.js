var React = require('react');
var ReactDom = require('react-dom');
require('./index.css');

class App extends React.Component {
	render() {
		return (
			<div>
				Hello World! Que onda que pez!
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));