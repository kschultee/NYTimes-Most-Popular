import React from 'react'
import ArticleImage from './ArticleImage.js'

class Article extends React.Component {
  render() {
    return (
      <div className = 'resultlist'>
        {this.props.articles.map(result => (
          <div className='callout' id={result.title} key = {result.title}>
            <div className='media-object'>
              <div className='media-object-section'>
                <div className='thumbnail'>
                  <ArticleImage img={result.multimedia}/>
                </div>
              </div>
              <div className='media-object-section'>
                <h4>{result.title}</h4>
                <h6>{result.byline}</h6>
                <p>{result.abstract}</p>
              </div>
            </div>
            <button type='button' className='button alert' onClick={ () => this.props.onRemoveCall(result)} style={{margin: 0}}>Clear</button>
            <button type='button' className='button success' onClick={ () => this.props.onSaveCall(result)} style={{margin: 0}}>Save</button>
            <a className='button' href={result.url}>View</a>
          </div>
        ))}
      </div>
    )
  }
}

export default Article
