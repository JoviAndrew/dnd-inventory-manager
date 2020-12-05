import React from 'react'
// import fetch from 'node-fetch'

const ModifierInput = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', padding: 20 }}>
        <input className='form-control cursor-pointer' type='number' value={props.strMod} min={-5} max={10} style={{ fontSize: 40, textAlign: 'center' }} onChange={(e) => props.changeStrMod(e.target.value)} />
        <h4 style={{ textAlign: 'center' }}>Strength Modifier</h4>
      </div>
    </div>
  )
}

export default ModifierInput
