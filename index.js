/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'

const SECTIONS = ['home', 'opinion', 'world', 'national', 'politics', 'upshot', 'nyregion', 'business', 'technology', 'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'sundayreview', 'fashion', 'tmagazine', 'food', 'travel', 'magazine', 'food', 'travel', 'magazine', 'realestatem', 'automobiles', 'obituaries', 'insider', 'saved']
const apiURL = 'https://api.nytimes.com/svc/topstories/v2/'
const apiSECTION = 'home.json'
const apiKEY = '?api-key='
const buildAPI = (apiURL + apiSECTION + apiKEY)
let myStorage = window.localStorage
let stored = []
window.stored = stored
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value))
}
Storage.prototype.pushObject = function (key) {
  var value = this.getItem(key)
  console.log(key)
  if (!stored.includes(key)) {
    stored.push(value)
  }
  console.log(stored)
}
class APInput extends React.Component {
  render() {
    return (
      <div className="input-group">
        <span className="input-group-label primary">API Key:</span>
        <input className="input-group-field" type="text" placeholder='API Key here...' onChange={this.props.handleChange}></input>
        <div className="input-group-button">
          <input type="submit" className="button" onClick={this.props.handleSubmit}></input>
        </div>
      </div>
    )
  }
}
class Select extends React.Component {
  render() {
    return (
      <span>
        <select id='section' onChange={this.props.onSelectChange} style = {{width: 400}}> {
          SECTIONS.map((section, key) =>
            <option key={key} value={section}>{section}</option>
          )
        }
        </select>
      </span>
    )
  }
}
class Article extends React.Component {
  render() {
    return (
      <div className = 'resultlist'>
        {this.props.articles.map(result => (
          <div className='callout' id={result.title} key = {result.title}>
            <div className='media-object'>
              <div className='media-object-section'>
                <div className='thumbnail'>
                  {result.multimedia.length > 0 ? <img src={result.multimedia[0].url} /> : <img src='img/NYT_thumbnail.jpg'/>}
                </div>
              </div>
              <a href={result.url}>
                <div className='media-object-section'>
                  <h4>{result.title}</h4>
                  <h6>{result.byline}</h6>
                  <p>{result.abstract}</p>
                </div>
              </a>
            </div>
            <button type='button' className='button success' onClick={ () => this.props.onQueueCall(result)} style={{margin: 0}}>Save</button>
            <a className='button' href={result.url}>View</a>
          </div>
        ))}
      </div>
    )
  }
}
class Saved extends React.Component {
  render() {
    return stored.map(result =>
      <div className='callout' id={result.title} key = {result.title}>
        <div className='media-object'>
          <div className='media-object-section'>
            <div className='thumbnail'>
              {result.multimedia.length > 0 ? <img src={result.multimedia[0].url} /> : <img src='img/NYT_thumbnail.jpg'/>}
            </div>
          </div>
          <a href={result.url}>
            <div className='media-object-section'>
              <h4>{result.title}</h4>
              <h6>{result.byline}</h6>
              <p>{result.abstract}</p>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
class FilteredPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiInput: '',
      result: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleQueue = this.handleQueue.bind(this)
  }
  handleInputChange(e) {
    this.setState({
      apiInput: e.target.value
    })
  }
  handleInputSubmit() {
    fetch(buildAPI + this.state.apiInput)
      .then(res => res.json())
      .then(res =>
        this.setState({
          result: res.results
        }))
      .catch(err =>
        console.log(err)
      )
  }
  handleSelectChange(e) {
    console.log(e.target.value)
    if (e.target.value === 'saved') {
      this.setState({
        result: []
      })
    }
    else {
      fetch(apiURL + e.target.value + '.json' + apiKEY + this.state.apiInput)
        .then(res => res.json())
        .then(res =>
          this.setState({
            result: res.results
          }))
    }
  }
  handleQueue(result) {
    myStorage.setObject(result.title, result)
    myStorage.pushObject(result.title)
  }
  render() {
    return (
      <div>
        <div className='top-bar' data-topbar>
          <div className='top-bar-left'>
            <h1 style = {{display: 'inline'}}>New York Times Most Popular Stories</h1>
            <APInput
              handleChange={this.handleInputChange}
              handleSubmit={this.handleInputSubmit}
            />
            <span className='filter'>
              <Select
                onSelectChange={this.handleSelectChange}
              />
            </span>
          </div>
        </div>
        <div>
          <Article
            articles={this.state.result}
            onQueueCall={this.handleQueue}
          />
          <Saved
          />
        </div>
      </div>
    )
  }
}
export default FilteredPage
