// import { inputFields } from '../ExploreCoaches/RequestCoachModal/RequestCoachModal'
import { BlueCancelButton, BlueSubmitButton } from '../Buttons/Buttons'
import './Modal.css'

export default function Modal({ headerName, setModalIsOpen, handleOnSubmitClick, inputFields }) {
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        {/* modal header: header text & a close button */}
        <div className='header'>
          <p> {headerName}</p>
          <button
            className='close-modal-btn'
            onClick={() => {
              setModalIsOpen(false)
            }}>
            X
          </button>
        </div>

        {/* form area to send a request */}
        <div className='form'>
          <div className='form-area'>
            <div className='column'>{inputFields}</div>
          </div>
          {/* cancel and submit buttons */}
          <div className='modal-buttons'>
            <BlueCancelButton
              handleOnClick={() => {
                setModalIsOpen(false)
              }}
            />
            <BlueSubmitButton handleOnClick={handleOnSubmitClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
