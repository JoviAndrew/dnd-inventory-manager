import React, { useState } from 'react'
import { UpperCase } from '../Utils'
// import {  } from 'react-bootstrap'
import { PlusOutlined, CheckOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Slot = (props) => {
  const [showAddIndex, setIndex] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [editSlotIndex, setEditSlotIndex] = useState(null)
  const [editItemName, setEditItemName] = useState('')
  const [itemName, setItemName] = useState('')

  const handleShow = (index) => {
    setIndex(index)
  }

  const addNewItem = (slotIndex) => {
    let itemObj = {
      name: itemName
    }
    props.addItem(props.slotData.type, itemObj, slotIndex)
    setIndex(null)
    setItemName('')
  }

  const editItem = (slotIndex) => {
    let itemObj = {
      name: editItemName
    }
    props.editItem(props.slotData.type, itemObj, slotIndex, editIndex)
    setEditIndex(null)
    setEditItemName('')
  }

  let maxSlots = (props.slotData.type === 'small') ? props.maxSmall : (props.slotData.type === 'medium') ? props.maxMedium : props.maxLarge
  let info = (props.slotData.type === 'small') ? '1 - 5 lbs' : (props.slotData.type === 'medium') ? '6 - 10 lbs' : '11 - 75 lbs'

  return (
    <div className='slot'>
      <div className='slot-header'>
        <span className='text-center' style={{ fontSize: 12, fontWeight: 'bold', color: (props.slotData.slots.length >= maxSlots) ? 'red' : 'black' }}>{`${props.slotData.slots.length}/${maxSlots} slots`}</span>
        <div className='flex-grow-1 padding-top-xxs'>
          <span className='d-inline-block' tabindex='0' data-toggle='tooltip' title={`Capacity: ${info}`} style={{ width: '100%' }}>
            <h6 className='text-center cursor-pointer' style={{ fontWeight: 'bold' }}>{UpperCase(props.slotData.type)}</h6>
          </span>
        </div>
        <div className='align-self-start'>
          <Button disabled={props.slotData.slots.length >= maxSlots} onClick={() => props.addNewSlot(props.slotData.type)} type='primary' shape='circle'>
            <div className='d-flex justify-content-center'>
              <PlusOutlined />
            </div>
          </Button>
        </div>
      </div>
      <div className='slot-container'>
        <div className='d-flex flex-wrap margin-top-s'>
          {props.slotData.slots.map((slot, index) => (
            <div className={'col-md-12 margin-bottom-xs slot-container-small no-padding'} key={`slot ${index}`}>
              {slot.item.map((itemData, itemIndex) => (
                <div className='padding-s card-item' key={`slot items ${itemIndex}`}>
                  {(editIndex === itemIndex && editSlotIndex === index)
                    ? <>
                      <input className='form-control' type='text' value={editItemName} onChange={(e) => setEditItemName(e.target.value)} placeholder='Item Name' />
                      <button className='btn btn-primary' onClick={() => editItem(index)}>
                        <div className='d-flex justify-content-center'>
                          <CheckOutlined />
                        </div>
                      </button>
                      <button className='btn btn-danger' onClick={() => setEditIndex(null)}>
                        <div className='d-flex justify-content-center'>
                          <CloseOutlined />
                        </div>
                      </button>
                  </>
                    : <>
                      <span className='cursor-pointer' onClick={() => { setEditIndex(itemIndex); setEditItemName(itemData.name); setEditSlotIndex(index) }} style={{ fontWeight: 'bold' }}>{itemData.name}</span>
                      <div className='d-flex align-items-center'>
                        <div className='cursor-pointer card-button' onClick={() => { setEditIndex(itemIndex); setEditItemName(itemData.name); setEditSlotIndex(index) }}>
                          <EditOutlined style={{ fontSize: 24 }} />
                        </div>
                        <div className='cursor-pointer card-button' onClick={() => props.deleteItem(itemIndex, props.slotData.type, index)} style={{ marginLeft: 10 }}>
                          <DeleteOutlined style={{ fontSize: 24 }} />
                        </div>
                      </div>
                  </>
                  }
                </div>
              ))}
              {(showAddIndex === index)
                ? <div className='d-flex flex-row' style={{ padding: 10 }}>
                  <input className='form-control' type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Item Name' />
                  <button className='btn btn-primary' onClick={() => addNewItem(index)}>
                    <div className='d-flex justify-content-center'>
                      <CheckOutlined />
                    </div>
                  </button>
                </div>
                : null
              }
              <div className='d-flex flex-direction-row justify-content-around'>
                <div className='slot-button' onClick={() => handleShow(index)}>
                  <p style={{ textAlign: 'center', fontWeight: 'bold', margin: 0, padding: 10 }}>+ Add New Item</p>
                </div>
                <div className='slot-button' onClick={() => props.removeSlot(index, props.slotData.type)}>
                  <p style={{ textAlign: 'center', fontWeight: 'bold', margin: 0, padding: 10 }}>- Remove Slot</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slot
