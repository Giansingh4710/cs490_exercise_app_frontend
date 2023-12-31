import React, { useState } from 'react'
import Modal from 'react-modal'
import './modal.css'
import apiClient from '../../../services/apiClient'

Modal.setAppElement('#root') // Set the root element for the modal

export default function ExerciseModal({ isOpen, closeModal, onSave }) {
  const [exerciseName, setExerciseName] = useState('')
  const [description, setDescription] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [equipment, setEquipment] = useState('')

  const handleSave = async () => {
    const exerciseData = {
      name: exerciseName,
      muscleGroup: muscleGroup,
      difficulty: 'Beginner',
      equipment: equipment,
      type: 'Compound',
      metric: 'Reps',
    }

    try {
      const { data } = await apiClient.createExercise(exerciseData)
      console.log('exercise data:', exerciseData)
      onSave(data) // Pass the response data to the parent component
      // Clear the input fields and close the modal
      console.log('The data in here', data)
      setExerciseName('')
      setMuscleGroup('')
      setDescription('')
      setEquipment('')
      closeModal()
      console.log('exercise created!')
      // window.location.reload() // Reloads the current page
    } catch (error) {
      console.error('Error creating exercise:', error)
      // Handle error scenarios here
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='Modal'
      overlayClassName='ReactModal__Overlay'>
      {' '}
      <h2>Add New Exercise</h2>
      <div>
        <label>Exercise Name:</label>
        <input
          type='text'
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
          name='exerciseName'
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          name='exerciseDescription'
        />
      </div>
      <div>
        <label>Muscle Group:</label>
        <select
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          required
          name='exerciseMuscleGroup'>
          <option value='' disabled selected>
            Select Muscle Group
          </option>
          <option value='Chest'>Chest</option>
          <option value='Back'>Back</option>
          <option value='Bicep'>Bicep</option>
          <option value='Tricep'>Tricep</option>
          <option value='Shoulder'>Shoulder</option>
          <option value='Abdominal'>Abdominal</option>
          <option value='Legs'>Bicep</option>

          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label>Equipment:</label>
        <select
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          required
          name='exerciseEquipment'>
          <option value='' disabled selected>
            Select Equipment
          </option>
          <option value='Barbell'>Barbell</option>
          <option value='Machine'>Machine</option>
          <option value='Bodyweight'>Bodyweight</option>
          <option value='Dumbells'>Dumbells</option>
          <option value='Bench Press'>Bench Press</option>
          <option value='Other'>Other</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className='save-exercise-button' onClick={handleSave}>
        Save
      </button>
      <button className='cancel-create-exercise-button' onClick={closeModal}>
        Cancel
      </button>
    </Modal>
  )
}
