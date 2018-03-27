/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'

const apiURL = 'https://api.nytimes.com/svc/topstories/v2/home.json'
const apiKEY = '?api-key=af2ca657204e4b729d70302b9a7c17a2'
const buildAPI = new Request(apiURL + apiKEY)
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
            <div className='media-object' key={result}>
              <div className='media-object-section'>
                <div className='thumbnail'>
                  {result.multimedia.length > 0 && <img src={result.multimedia[0].url} />}
                </div>
              </div>
              <div className='media-object-section'>
                <h4>{result.title}</h4>
                <p>{result.abstract}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}
export default Story
