/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'

const SECTIONS = ['home', 'opinion', 'world', 'national', 'politics', 'upshot', 'nyregion', 'business', 'technology', 'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'sundayreview', 'fashion', 'tmagazine', 'food', 'travel', 'magazine', 'food', 'travel', 'magazine', 'realestatem', 'automobiles', 'obituaries', 'insider']
const apiURL = 'https://api.nytimes.com/svc/topstories/v2/'
const apiSECTION = 'home.json'
const apiKEY = '?api-key=af2ca657204e4b729d70302b9a7c17a2'
const buildAPI = new Request(apiURL + apiSECTION + apiKEY)
class Select extends React.Component {
  render() {
    return (
      <div>
        <select id='section' onChange={this.props.onSelectChange} style = {{width: 400}}> {
          SECTIONS.map((section, key) =>
            <option key={key} value={section}>{section}</option>
          )
        }
        </select>
      </div>
    )
  }
}
class Article extends React.Component {
  render() {
    console.log(this.props.articles)
    return (
      <div className = 'resultlist'>
        {this.props.articles.map(result => (
          <div className='media-object' key = {result.title}>
            <div className='media-object-section'>
              <div className='thumbnail'>
                {result.multimedia.length > 0 ? <img src={result.multimedia[0].url} /> : <img src='img/NYT_thumbnail.jpg'/>}
              </div>
            </div>
            <a href={result.url}>
              <div className='media-object-section'>
                <span><h4>{result.title}</h4></span><span><h6>{result.byline}</h6></span>
                <p>{result.abstract}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    )
  }
}
class FilteredPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleSelectChange(e) {
    fetch(apiURL + e.target.value + '.json' + apiKEY)
      .then(res => res.json())
      .then(res =>
        this.setState({
          result: res.results
        }))
  }
  componentDidMount() {
    fetch(buildAPI)
      .then(res => res.json())
      .then(res =>
        this.setState({
          result: res.results
        }))
  }
  render() {
    return (
      <div>
        <div className='top-bar' data-topbar>
          <div className='name'>
            <h1>New York Times Most Popular Stories</h1>
          </div>
          <div className='filter'>
            <Select
              onSelectChange={this.handleSelectChange}
            />
          </div>
        </div>
        <div>
          <Article
            articles={this.state.result}
          />
        </div>
      </div>
    )
  }
}
export default FilteredPage
