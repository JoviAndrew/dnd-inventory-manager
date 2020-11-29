import React from 'react'

const FileManagement = (props) => {
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new window.FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      props.setupData(JSON.parse(text))
    }
    reader.readAsText(e.target.files[0])
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontWeight: 'bold' }}>Choose file to upload:</label>
      <div className='d-flex flex-direction-row'>
        <input className='form-control border-0' type='file' onChange={(e) => showFile(e)} id='uploadInput' />
      </div>
      <label style={{ fontWeight: 'bold', marginTop: 10 }}>Export to txt file:</label>
      <button onClick={() => props.downloadTxtFile()} className='btn btn-primary'>
        <span style={{ fontWeight: 'bold' }}>
              Export
        </span>
      </button>
    </div>
  )
}

export default FileManagement
