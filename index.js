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
        <select id='section'> {
          SECTIONS.map(section =>
            <option key={section} value={section}>{section}</option>
          )
        }
        </select>
      </div>
    )
  }
}
class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      results: []
    }
  }
  componentDidMount() {
    fetch(buildAPI)
      .then(response => response.json())
      .then(
        (response) => {
          console.log(response)
          this.setState({
            isLoaded: true,
            results: response.results
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          })
        }
      )
  }
  render() {
    const {error, isLoaded, results} = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading Data...</div>
    }
    else {
      return (
        <div className = 'resultlist'>
          {results.map(result => (
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
}
class FilteredPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section: 'home'
    }
  }
  render() {
    return (
      <div>
        <nav className='top-bar' data-topbar>
          <div className='name'>
            <h1>New York Times Most Popular Stories</h1>
          </div>
          <div className='filter'>
            <Select />
          </div>
        </nav>
        <div>
          <Story />
        </div>
      </div>
    )
  }
}
export default FilteredPage
