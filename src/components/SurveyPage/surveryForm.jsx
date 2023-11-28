import { useRef, useState } from 'react'
import InputElement from '../AccountInputElement'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import {
  activityOptions,
  genderOptions,
  goalOptions,
  roleOptions,
  stateOptions,
} from './options.jsx'
import { useAuthContext } from '../../contexts/auth'

export default function SurveyForm() {
  const nav = useNavigate()
  const { user, setUser } = useAuthContext() //get user data like email

  const [serverRes, setServerRes] = useState('')
  const errorsRef = useRef({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    dob: '',
    gender: '',
    weight: '',
    height: '',
    role: '',
    activityLevel: '',
    goal: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const [formData, setFormData] = useState({
    firstName: {
      data: '',
      errorText: '',
    },
    lastName: {
      data: '',
      errorText: '',
    },
    email: {
      data: '',
      errorText: '',
    },
    phoneNum: {
      data: '',
      errorText: '',
    },
    dob: {
      data: '',
      errorText: '',
    },
    gender: {
      data: '',
      errorText: '',
    },
    weight: {
      data: '',
      errorText: '',
    },
    height: {
      data: '',
      errorText: '',
    },
    role: {
      data: '',
      errorText: '',
    },
    activityLevel: {
      data: '',
      errorText: '',
    },
    goal: {
      data: '',
      errorText: '',
    },
    streetAddress: {
      data: '',
      errorText: '',
    },
    city: {
      data: '',
      errorText: '',
    },
    state: {
      data: '',
      errorText: '',
    },
    zipCode: {
      data: '',
      errorText: '',
    },
  })

  function handleInputChange(key, value) {
    setFormData({
      ...formData,
      [key]: {
        errorText: formData[key].errorText,
        data: value,
      },
    })
  }

  function updateErrors() {
    if (formData.firstName.data.length < 2) {
      errorsRef.current['firstName'] = 'First Name must be longer than 2 characters'
    } else if (formData.firstName.data.match('[0-9]+|[-.!@#$%^&*()+/\\=<,>?_]+')) {
      errorsRef.current['firstName'] = 'First Name cannot contain numbers or special characters'
    } else {
      errorsRef.current['firstName'] = ''
    }

    if (formData.lastName.data.length < 2) {
      errorsRef.current['lastName'] = 'Last Name must be longer than 2 characters'
    } else if (formData.lastName.data.match('[0-9]+|[-.!@#$%^&*()+/\\=<,>?_]+')) {
      errorsRef.current['lastName'] = 'Last Name cannot contain numbers or special characters'
    } else {
      errorsRef.current['lastName'] = ''
    }

    if (formData.phoneNum.data.length !== 10) {
      errorsRef.current['phoneNum'] = 'Please enter a valid phone number. No Dashes'
    } else {
      errorsRef.current['phoneNum'] = ''
    }

    if (formData.weight.data <= 0) {
      errorsRef.current['weight'] = 'Please enter a valid weight'
    } else {
      errorsRef.current['weight'] = ''
    }

    if (formData.height.data <= 0) {
      errorsRef.current['height'] = 'Please enter a valid height'
    } else {
      errorsRef.current['height'] = ''
    }

    if (formData.streetAddress.data.length < 2) {
      errorsRef.current['streetAddress'] = 'Please enter a valid street address'
    } else {
      errorsRef.current['streetAddress'] = ''
    }

    if (formData.city.data.length < 2) {
      errorsRef.current['city'] = 'Please enter a valid city'
    } else {
      errorsRef.current['city'] = ''
    }

    if (formData.zipCode.data.length !== 5 || !formData.zipCode.data.match('^[0-9]{5}$')) {
      errorsRef.current['zipCode'] = 'Please enter a valid zipcode'
    } else if (formData.zipCode.data.length === 5) {
      errorsRef.current['zipCode'] = ''
    }

    if (
      !formData.email.data.match(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
      )
    ) {
      errorsRef.current['email'] = 'Please enter a valid email'
    } else {
      errorsRef.current['email'] = ''
    }

    if (formData.dob.data.length === 0) {
      errorsRef.current['dob'] = 'Please enter a date'
    } else {
      errorsRef.current['dob'] = ''
    }

    if (!formData.gender.data) {
      errorsRef.current['gender'] = 'Please choose a gender'
    } else {
      errorsRef.current['gender'] = ''
    }

    if (!formData.role.data) {
      errorsRef.current['role'] = 'Please choose a role'
    } else {
      errorsRef.current['role'] = ''
    }

    if (!formData.activityLevel.data) {
      errorsRef.current['activityLevel'] = 'Please choose an activity level'
    } else {
      errorsRef.current['activityLevel'] = ''
    }

    if (!formData.goal.data) {
      errorsRef.current['goal'] = 'Please choose a goal'
    } else {
      errorsRef.current['goal'] = ''
    }

    if (!formData.state.data) {
      errorsRef.current['state'] = 'Please select a state'
    } else {
      errorsRef.current['state'] = ''
    }
  }

  function showErrors() {
    const newFormData = {}
    for (const [key, value] of Object.entries(formData)) {
      newFormData[key] = {
        data: value.data,
        errorText: errorsRef.current[key],
      }
    }
    setFormData(newFormData) // This will trigger a re-render
  }

  async function handleSubmit(event) {
    event.preventDefault()

    updateErrors()
    showErrors()
    console.log('Done with validation')

    const sendFormData = {}
    for (const [key, value] of Object.entries(formData)) {
      const errorText = errorsRef.current[key]
      if (errorText.length > 0) {
        console.log('ERROR:', value.errorText)
        return
      }
      sendFormData[key] = value.data
    }

    console.log('Error check passed')
    alert('All Error Checks Passed!')

    // const { data, error } = await apiClient.registerSurvey(sendFormData)
    // setServerRes(data.message)

    // fetch('https://127.0.0.1:1313/register/survey', {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   body: JSON.stringify(formData),
    // }).then((response) => {
    //   if (response.status === 404) {
    //     setFormData({
    //       ...formData,
    //       email: {
    //         data: formData.email.data,
    //         errorText: response.error_message,
    //       },
    //     })
    //   } else if (response.status === 200) {
    //     nav('/UserDashboard')
    //   }
    // })
  }

  return (
    <div style={styles.formContainer}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <InputGridElement
          type='text'
          name='firstName'
          label='First Name'
          placeholder='First name'
          gridArea='a'
          elementError={formData.firstName.errorText}
          onChange={handleInputChange}
          value={formData.firstName.data}
        />
        <InputGridElement
          type='text'
          name='lastName'
          label='Last Name'
          placeholder='Last name'
          gridArea='b'
          elementError={formData.lastName.errorText}
          onChange={handleInputChange}
          value={formData.lastName.data}
        />
        <InputGridElement
          type='email'
          name='email'
          label='Email'
          placeholder='Email'
          gridArea='c'
          elementError={formData.email.errorText}
          onChange={handleInputChange}
          value={formData.email.data}
        />
        <InputGridElement
          type='tel'
          name='phoneNum'
          label='Phone Number'
          placeholder='Phone Number'
          gridArea='d'
          elementError={formData.phoneNum.errorText}
          onChange={handleInputChange}
          value={formData.phoneNum.data}
        />
        <InputGridElement
          type='date'
          name='dob'
          label='Date of Birth'
          gridArea='e'
          elementError={formData.dob.errorText}
          onChange={handleInputChange}
          value={formData.dob.data}
        />
        <InputGridElement
          type='select'
          name='gender'
          label='Gender'
          gridArea='f'
          options={genderOptions}
          elementError={formData.gender.errorText}
          onChange={handleInputChange}
        />
        <InputGridElement
          type='text'
          name='weight'
          label='Weight'
          placeholder='Weight'
          gridArea='g'
          units='lbs'
          elementError={formData.weight.errorText}
          onChange={handleInputChange}
          value={formData.weight.data}
        />
        <InputGridElement
          type='text'
          name='height'
          label='Height'
          placeholder='Height'
          gridArea='h'
          units='in'
          elementError={formData.height.errorText}
          onChange={handleInputChange}
          value={formData.height.data}
        />
        <InputGridElement
          type='select'
          name='role'
          label='Role'
          gridArea='i'
          options={roleOptions}
          elementError={formData.role.errorText}
          onChange={handleInputChange}
        />
        <InputGridElement
          type='select'
          name='activityLevel'
          label='Activity Level'
          gridArea='j'
          options={activityOptions}
          elementError={formData.activityLevel.errorText}
          onChange={handleInputChange}
        />
        <InputGridElement
          type='select'
          name='goal'
          label='Goal'
          gridArea='k'
          options={goalOptions}
          elementError={formData.goal.errorText}
          onChange={handleInputChange}
        />
        <InputGridElement
          type='text'
          name='streetAddress'
          label='Street Address'
          placeholder='Enter Your Street'
          gridArea='m'
          elementError={formData.streetAddress.errorText}
          onChange={handleInputChange}
          value={formData.streetAddress.data}
        />
        <InputGridElement
          type='text'
          name='city'
          label='City'
          placeholder='Enter Your City'
          gridArea='n'
          elementError={formData.city.errorText}
          onChange={handleInputChange}
          value={formData.city.data}
        />
        <InputGridElement
          type='select'
          name='state'
          label='State'
          gridArea='o'
          options={stateOptions}
          elementError={formData.state.errorText}
          onChange={handleInputChange}
        />
        <InputGridElement
          type='text'
          name='zipCode'
          label='Zip Code'
          placeholder='5 Digit Zip Code'
          gridArea='p'
          elementError={formData.zipCode.errorText}
          onChange={handleInputChange}
          value={formData.zipCode.data}
        />
        <Button name='Submit' type='submit' />
      </form>
    </div>
  )
}

function InputGridElement(props) {
  const gridPosition = {
    gridArea: props.gridArea,
  }
  const additionalStyles = {
    backgroundColor: '#FFFFFF',
  }
  function ShowUnits() {
    const units = props.units
    if (!units) return <></>
    return <span style={styles.inputUnit}>{units}</span>
  }
  return (
    <div style={gridPosition}>
      <ShowUnits />
      <InputElement {...props} additionalStyles={additionalStyles} />
    </div>
  )
}

function Button({ name }) {
  const hover = (e) => {
    e.target.style.background = '#252e3d'
    e.target.style.color = '#FFFFFF'
  }
  const unHover = (e) => {
    e.target.style.background = '#3F4D67'
    e.target.style.color = '#FFFFFF'
  }

  return (
    <button style={styles.submitButton} onMouseEnter={hover} onMouseLeave={unHover}>
      {name}
    </button>
  )
}

const styles = {
  div: {
    position: 'absolute',
    top: '50%',
    left: '27%',
  },
  form: {
    display: 'grid',
    gridTemplateAreas: `   "a a b b"
                                 "c c d d"
                                 "m n o p"
                                 "e f g h"
                                 "i j k k"
                                 "l l l l" `,
    gridGap: '50px 50px',
    margin: 'auto',
    width: '85%',
  },
  formContainer: {
    position: 'relative',
    top: '10%',
    margin: 'auto',
  },
  submitButton: {
    gridArea: 'l',
    backgroundColor: '#3F4D67',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '24px',
    cursor: 'pointer',
    borderRadius: '10px',
    border: 'none',
    width: '153px',
    height: '57px',
    display: 'block',
    margin: 'auto',
    marginBottom: '50px',
  },
  inputUnit: {
    position: 'relative',
    float: 'right',
    paddingRight: '5px',
    top: '75px',
    zIndex: '1',
    color: '#000000',
    fontWeight: 'bold',
  },
}