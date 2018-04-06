import React from 'react'
import ReactDOM from 'react-dom'
import APInput from './components/APInput.js'
import Article from './components/Article.js'
import Saved from './components/Saved.js'
import Select from './components/Select.js'

const apiURL = 'https://api.nytimes.com/svc/topstories/v2/'
const apiSECTION = 'home.json'
const apiKEY = '?api-key='
const buildAPI = (apiURL + apiSECTION + apiKEY)
const myStorage = window.localStorage

class FilteredPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiInput: '',
      result: [],
      saved: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleQueue = this.handleQueue.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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
    myStorage.setItem(result.title, JSON.stringify(result))
    this.loadSaved()
  }
  handleRemove(result) {
    myStorage.removeItem(result.title)
    this.loadSaved()
  }
  componentDidMount() {
    this.loadSaved()
  }
  loadSaved() {
    this.setState({
      saved: Object.keys(myStorage).map(result =>
        JSON.parse(myStorage.getItem(result))
      )
    })
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
            onSaveCall={this.handleQueue}
            onRemoveCall={this.handleRemove}
            isSaved={this.state.isSaved}
            saved={this.state.saved}
          />
          <Saved
            saved={this.state.saved}
            onRemoveCall={this.handleRemove}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <FilteredPage />,
  document.getElementById('root')
)
