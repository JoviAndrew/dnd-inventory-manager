import { useState } from 'react'
import '../Styles/App.css'
import ModifierInput from '../Components/ModifierInput'
import Slot from '../Components/Slot'

function App () {
  const [strMod, setStrMod] = useState(0)
  const [maxSmall, setMaxSmall] = useState(5)
  const [maxMedium, setMaxMed] = useState(3)
  const [maxLarge, setMaxLarge] = useState(1)
  const [inventory, setInventory] = useState([
    {
      type: 'small',
      slots: []
    },
    {
      type: 'medium',
      slots: []
    },
    {
      type: 'large',
      slots: []
    }
  ])

  const changeStrMod = (value) => {
    value = Number(value)
    setStrMod(value)

    // Small Slot validation
    if (value <= 0) {
      setMaxSmall(value + 5)
    } else {
      setMaxSmall((value + 1) * 5)
    }

    // Medium Slot Validation
    if (value <= -2) {
      setMaxMed(0)
    } else if (value === -1) {
      setMaxMed(1)
    } else {
      setMaxMed((value * 2) + 3)
    }

    // Large Slot Validation
    if (value < 0) {
      setMaxLarge(0)
    } else {
      setMaxLarge(Math.round((value + 1) / 2))
    }
  }

  const addItem = (type, item, index) => {
    let tempInventory = [...inventory]
    let tempSlot = inventory.find((data) => data.type === type)
    let selectedInventoryIndex = inventory.findIndex((data) => data.type === type)
    let tempItem = { ...tempSlot.slots[index] }
    let tempItemArr = [...tempItem.item]
    tempItemArr[tempItemArr.length - 1] = item
    tempItem.item = tempItemArr
    tempSlot.slots[index] = tempItem
    tempInventory[selectedInventoryIndex] = tempSlot
    setInventory(tempInventory)
  }

  const addNewSlot = (type) => {
    let newSlot = {
      'item': [
        {
          'name': ''
        }
      ]
    }
    let tempInventory = [...inventory]
    let selectedSlot = tempInventory.find((data) => (data.type === type))
    selectedSlot.slots.push(newSlot)
    setInventory(tempInventory)
  }

  return (
    <div className='padding-xs'>
      <ModifierInput strMod={strMod} changeStrMod={changeStrMod} />
      <h4 className='margin-top-s'>Inventory Slots</h4>
      <div className='col-md-12 margin-top-s row no-padding'>
        {inventory.map((slotData, index) => (
          <div className='col-md-4' key={`inventory slot ${index}`}>
            <Slot
              addItem={addItem}
              addNewSlot={addNewSlot}
              slotData={slotData}
              maxSmall={maxSmall}
              maxMedium={maxMedium}
              maxLarge={maxLarge} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
