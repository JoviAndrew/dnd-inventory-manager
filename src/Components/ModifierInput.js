import React from 'react'

const ModifierInput = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <div style={{ border: 'solid 1px #000000', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: 20 }}>
        <input type='number' value={props.strMod} min={-5} max={10} style={{ fontSize: 40, textAlign: 'center' }} onChange={(e) => props.changeStrMod(e.target.value)} />
        <h4 style={{ textAlign: 'center' }}>Strength Modifier</h4>
      </div>
    </div>
  )
}

export default ModifierInput
