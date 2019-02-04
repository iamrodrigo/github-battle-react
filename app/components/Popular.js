import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage({ selectedLanguage, onSelect }) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']; 

	return(
		<ul className = 'languages'>
			{languages.map(language => {
				return(
					<li 
						style={language === selectedLanguage ? {color: '#d0021b'}: null}
						onClick={() => onSelect(language)}
						key={language}>
							{language}
					</li>
				)
			})}
		</ul>
	)
}


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
	return(
		<ul className='popular-list'>
		{props.repos.map((repo, index) => {
			return(
				<li key={repo.name} className='popular-item'>
					<div className='popular-rank'>#{index + 1} </div>
					<ul className='space-list-items'>
						<li>
							<img
								className='avatar'
								src={repo.owner.avatar_url}
								alt={'Avatar for ' + repo.owner.login}
							/>
						</li>
						<li><a href={repo.html_url}>{repo.name}</a></li>
						<li>@{repo.owner.login}</li>
						<li>{repo.stargazers_count} stars</li>
					</ul>
				</li>
			)
		})}
		</ul>
	);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
	state = {
		selectedLanguage : 'All',
		repos: null,
	};

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(language) {
		this.setState(() => ({
			selectedLanguage: language,
			repos: null
			}));

		fetchPopularRepos(language)
		.then(repos => {
			this.setState(() => ({ repos: repos	}))
		});
	} 

	render() {
		const { selectedLanguage, repos } = this.state;

		return ( 
			<div>
 				<SelectLanguage
					selectedLanguage = {selectedLanguage}
					onSelect = {this.updateLanguage}
				/>
				
				{!this.state.repos ? <Loading /> : <RepoGrid repos={repos} />}
			</div>
		);
	}
}

export default Popular;