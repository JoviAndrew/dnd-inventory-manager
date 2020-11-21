import React, { useState } from 'react'
import { UpperCase } from '../Utils'
// import {  } from 'react-bootstrap'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Slot = (props) => {
  const [showAddIndex, setIndex] = useState(null)
  const [itemName, setItemName] = useState('')

  const handleShow = (index) => {
    setIndex(index)
  }

  const addNewItem = (itemIndex) => {
    let itemObj = {
      name: itemName
    }
    props.addItem(props.slotData.type, itemObj, itemIndex)
    setIndex(null)
  }

  let maxSlots = (props.slotData.type === 'small') ? props.maxSmall : (props.slotData.type === 'medium') ? props.maxMedium : props.maxLarge

  return (
    <div className='padding-xs' style={{ border: 'solid 1px' }}>
      <div>
        <span className='text-center' style={{ fontSize: 12 }}>{`${props.slotData.slots.length}/${maxSlots} slots`}</span>
      </div>
      <div className='flex-row d-flex align-items-center justify-content-center'>
        <div className='flex-grow-1 padding-top-xxs'>
          <h6 className='text-center'>{UpperCase(props.slotData.type)}</h6>
        </div>
        <div className='align-self-start'>
          <Button disabled={props.slotData.slots.length === maxSlots} onClick={() => props.addNewSlot(props.slotData.type)} type='primary' shape='circle'>
            <div className='d-flex justify-content-center'>
              <PlusOutlined />
            </div>
          </Button>
        </div>
      </div>
      <div className='d-flex flex-wrap'>
        {props.slotData.slots.map((slot, index) => (
          <div className='col-xs-6 col-md-12 margin-bottom-xs' style={{ border: 'solid 1px', borderRadius: 5 }} key={`slot ${index}`}>
            {slot.item.map((itemData, itemIndex) => (
              <div className='padding-top-s' style={{ borderBottomWidth: '1px' }} key={`slot items ${itemIndex}`}>
                <span>{itemData.name}</span>
              </div>
            ))}
            {(showAddIndex === index)
              ? <div className='d-flex flex-row' style={{ padding: 10 }}>
                <input className='input' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Item Name' />
                <Button onClick={() => addNewItem(index)}>
                  <div className='d-flex justify-content-center'>
                    <CheckOutlined />
                  </div>
                </Button>
              </div>
              : null
            }
            <Button onClick={() => handleShow(index)}>
              Add New Item
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slot
