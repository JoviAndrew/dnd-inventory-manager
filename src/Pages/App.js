import { useState } from 'react'
import '../Styles/App.css'
import Slot from '../Components/Slot'
// import config from '../config'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'

// Components
import ModifierInput from '../Components/ModifierInput'
import FileManagement from '../Components/FileManagement'

function App () {
  const [open, setOpen] = useState(false)
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

  const addItem = (type, item, slotIndex) => {
    let tempInventory = [...inventory]
    let selectedSlot = inventory.find((data) => data.type === type)
    let selectedInventoryIndex = inventory.findIndex((data) => data.type === type)
    let tempItem = { ...selectedSlot.slots[slotIndex] }
    let tempItemArr = [...tempItem.item]
    tempItemArr.push(item)
    tempItem.item = tempItemArr
    selectedSlot.slots[slotIndex] = tempItem
    tempInventory[selectedInventoryIndex] = selectedSlot
    setInventory(tempInventory)
  }

  const addNewSlot = (type) => {
    let newSlot = {
      'item': []
    }
    let tempInventory = [...inventory]
    let selectedSlot = tempInventory.find((data) => (data.type === type))
    selectedSlot.slots.push(newSlot)
    setInventory(tempInventory)
  }

  const deleteItem = (itemIndex, type, slotIndex) => {
    let tempInventory = [...inventory]
    let selectedSlot = inventory.find((data) => data.type === type)
    let selectedInventoryIndex = inventory.findIndex((data) => data.type === type)
    let tempItem = { ...selectedSlot.slots[slotIndex] }
    let tempItemArr = [...tempItem.item]
    tempItemArr.splice(itemIndex, 1)
    tempItem.item = tempItemArr
    selectedSlot.slots[slotIndex] = tempItem
    tempInventory[selectedInventoryIndex] = selectedSlot
    setInventory(tempInventory)
  }

  const editItem = (type, item, slotIndex, itemIndex) => {
    let tempInventory = [...inventory]
    let selectedSlot = inventory.find((data) => data.type === type)
    let selectedInventoryIndex = inventory.findIndex((data) => data.type === type)
    let tempItem = { ...selectedSlot.slots[slotIndex] }
    let tempItemArr = [...tempItem.item]
    tempItemArr[itemIndex] = item
    tempItem.item = tempItemArr
    selectedSlot.slots[slotIndex] = tempItem
    tempInventory[selectedInventoryIndex] = selectedSlot
    setInventory(tempInventory)
  }

  const downloadTxtFile = () => {
    const element = document.createElement('a')
    let exportData = {
      data: {
        str_mod: strMod,
        inventory
      }
    }
    let data = JSON.stringify(exportData)
    const file = new Blob([data], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'myFile.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const setupData = (data) => {
    changeStrMod(data.data.str_mod)
    setInventory(data.data.inventory)
  }

  const removeSlot = (slotIndex, type) => {
    let tempInventory = [...inventory]
    let selectedSlot = inventory.find((data) => data.type === type)
    let selectedInventoryIndex = inventory.findIndex((data) => data.type === type)
    selectedSlot.slots.splice(slotIndex, 1)
    tempInventory[selectedInventoryIndex] = selectedSlot
    setInventory(tempInventory)
  }

  return (
    <div className='padding-xs'>
      <div className='header border-bottom border-dark'>
        <span>D&D Inventory Tracker</span>
      </div>
      <ModifierInput strMod={strMod} changeStrMod={changeStrMod} />
      <div className='d-flex justify-content-center'>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls='import-export-collapse'
          aria-expanded={open}
        >
        Import / Export file
        </Button>
      </div>
      <Collapse in={open}>
        <div id='import-export-collapse'>
          <FileManagement setupData={setupData} downloadTxtFile={downloadTxtFile} />
        </div>
      </Collapse>
      <h4 className='margin-top-s'>Inventory Slots</h4>
      <div className='col-md-12 margin-top-s row no-padding'>
        {inventory.map((slotData, index) => (
          <div className='col-md-4' key={`inventory slot ${index}`}>
            <Slot
              addItem={addItem}
              addNewSlot={addNewSlot}
              deleteItem={deleteItem}
              editItem={editItem}
              removeSlot={removeSlot}
              slotData={slotData}
              maxSmall={maxSmall}
              maxMedium={maxMedium}
              maxLarge={maxLarge} />
          </div>
        ))}
      </div>
      <div className='footer'>
        <span style={{ fontSize: 10 }}>Version {/*config.version*/}</span>
      </div>
    </div>
  )
}

export default App
