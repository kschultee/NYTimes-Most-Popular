import React from 'react'

function ArticleImage(props) {
  const multimedia = props.img
  return (
    <div className='multimedia'>
      {multimedia.length > 0 ? <img src={multimedia[0].url} /> : <img src='img/NYT_thumbnail.jpg'/>}
    </div>
  )
}

export default ArticleImage
