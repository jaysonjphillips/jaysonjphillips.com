import React from 'react'
import Gist from 'react-gist'

const Preview = ({value}) => {
        // if the script is a gist override it with our react component.
        if (!value.url || !value.url.includes('gist.github.com')) {
            return (<div></div>)
        } else {
            return <Gist id={value.url.split('/')[4].split('.')[0]}/>
        }
}


export default {
    name: 'gist',
    type: 'object',
    title: 'Github Gist Embed',
    fields: [
      {
        name: 'url',
        type: 'string',
        title: 'Github Gist Embed Url'
      },
      {
        name: 'file',
        type: 'string',
        title: 'File string'
      }
    ],
    preview: {
        select: {
            url: 'url',
            file: 'file'
        },
        component: Preview
    }
  
  }