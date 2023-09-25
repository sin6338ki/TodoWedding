import React from 'react'
import NewItemForm from './NewItemForm'
import '../../assets/budget-css/NewItem.css'


const NewItem = () => {
  return (
    <div className='new-item'>
    <h1 className='fs-normal fw-bold text-2xl'>내역추가</h1>
    <NewItemForm />
    </div>
  )
}

export default NewItem