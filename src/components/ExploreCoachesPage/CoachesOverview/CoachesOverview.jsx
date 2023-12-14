import React from 'react'
import { useState } from 'react'
import './CoachesOverview.css'
import apiClient from '../../../services/apiClient'
import { useEffect } from 'react'
import { Tabs } from '../../ExploreComponents/Tabs/Tabs'
import { List, ItemCard } from '../../ExploreComponents/ItemList/ItemList'
import {} from '../../ExploreComponents/ItemList/ItemList'
/*
components broken down:
    CoachesOverveiw 
        * the overall container where a user can search, filter and view the results for coaches 
        * holds all of the following components

    CoachOrSentRequest
        * The heading area, holds 2 tabs, Coaches or Sent Requests, user cna click on either tab
       
    SearchForCoachByName
        * the search bar and button 
       
    FilterForCoaches
        * the filters, & has 3 dropdown componenets Specialization, LocationDropdown, PriceDropdown
       
    CoachList
        * the container that will hold all the coaches available based on the filter and search
    
    CoachCard
        * an individual card that holds the name of the coach 
*/
export default function CoachesOverview({
  coaches,
  setCoaches,
  selectedCoach,
  setSelectedCoach,
  coachesToDisplay,
  setCoachesToDisplay,
  sentRequests,
  fetchSentRequests,
}) {
  const [viewCoachesOrSentRequests, setViewCoachesOrSentRequests] = useState('Coaches')
  const [searchTerm, setSearchTerm] = useState('')
  const [locations, setLocations] = useState([{ state: 'Any State', cities: [] }])
  const [specializations, setSpecializations] = useState(['Any Specialization'])
  const handleOnSentRequestsTabClick = () => {
    if (viewCoachesOrSentRequests == 'Coaches') {
      setViewCoachesOrSentRequests('Sent Requests')
      setCoachesToDisplay(sentRequests)
    }
  }

  const handleOnCoachesTabClick = () => {
    if (viewCoachesOrSentRequests == 'Sent Requests') {
      setViewCoachesOrSentRequests('Coaches')
      setCoachesToDisplay(coaches)
    }
  }

  const tabs = [
    { label: 'Coaches', handler: handleOnCoachesTabClick },
    { label: 'Sent Requests', handler: handleOnSentRequestsTabClick },
  ]

  const fetchLocations = async () => {
    try {
      const { data, error } = await apiClient.getCoachLocations()
      setLocations(data)
    } catch (error) {
      setLocations([{ state: 'Any State', cities: [] }])
      throw new Error('Error fetching states and cities')
    }
  }
  const fetchSpecializations = async () => {
    try {
      const { data, error } = await apiClient.getCoachSpecializations()
      // if (error) {
      //   setSpecializations(['Any specialization'])
      //   throw new Error('Error fetching specializations')
      // }
      const specializationList = data.map((spec) => spec.specialties)
      setSpecializations(['Any Specialization', ...specializationList])
    } catch (error) {
      setSpecializations(['Any specialization'])
      throw new Error('Error fetching specializations')
    }
  }
  const handleSearch = async () => {
    try {
      const { data, error } = await apiClient.getAllCoachesBySearchTerm(searchTerm)
      console.log('DATA: ', data)
      setCoachesToDisplay(data)
    } catch (error) {
      console.error('Error fetching coaches:', error)
      // Handle the error appropriately
    }
  }

  useEffect(() => {
    fetchLocations()
    fetchSpecializations()
  }, [])
  return (
    <div className='coaches-overview'>
      <CoachOverviewContent
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnCoachesTabClick={handleOnCoachesTabClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        specializations={specializations}
        locations={locations}
        coaches={coachesToDisplay}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
        tabs={tabs}
      />
    </div>
  )
}

export function CoachOverviewContent({
  viewCoachesOrSentRequests,
  handleOnSentRequestsTabClick,
  handleOnCoachesTabClick,
  searchTerm,
  setSearchTerm,
  handleSearch,
  specializations,
  locations,
  coaches,
  setSelectedCoach,
  selectedCoach,
  tabs,
}) {
  return (
    <>
      <Tabs tabs={tabs} activeTab={viewCoachesOrSentRequests} />
      {/* 
      <CoachOrSentRequest
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnCoachesTabClick={handleOnCoachesTabClick}
      /> */}
      <SearchForCoachByName
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <FilterForCoaches specializations={specializations} locations={locations} />
      <CoachList
        coaches={coaches}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
      />
    </>
  )
}

export function CoachOrSentRequest({
  viewCoachesOrSentRequests,
  handleOnSentRequestsTabClick,
  handleOnCoachesTabClick,
}) {
  return (
    <div className='coaches-or-sent-requests-tab'>
      <div
        className={viewCoachesOrSentRequests === 'Coaches' ? 'coaches-tab selected' : 'coaches-tab'}
        onClick={handleOnCoachesTabClick}>
        <p className='tab'>Coaches</p>
      </div>
      <div className='divider'>|</div>
      <div
        className={
          viewCoachesOrSentRequests === 'Sent Requests'
            ? 'sent-requests-tab selected'
            : 'sent-requests-tab'
        }
        onClick={handleOnSentRequestsTabClick}>
        <p className='tab'>Sent Requests</p>
      </div>
    </div>
  )
}

export function SearchForCoachByName({ setSearchTerm, searchTerm, handleSearch }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }
  return (
    <div className='coach-search'>
      <form onSubmit={handleSubmit} className='coach-search'>
        <input
          className='search-input'
          type='text'
          name='search'
          placeholder='search for a coach'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='search-btn'>
          <i className='material-icons'>search</i>
        </button>
      </form>
    </div>
  )
}

export function FilterForCoaches({ specializations, locations }) {
  return (
    <div className='filter-container'>
      <div className='filter-label'>
        <span class='material-symbols-outlined'>filter_alt</span>

        <p>Filters</p>
      </div>
      <div className='filter-select-container'>
        <SpecializationDropdown specializations={specializations} />
        <LocationDropdown locations={locations} />
        <MaxPrice />
      </div>
    </div>
  )
}

export function SpecializationDropdown({ specializations }) {
  return (
    <div className='select-dropdown'>
      <select
        required
        name='selectList'
        id='selectList'
        placeholder='Select specialization'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {/* <option value="">Example Placeholder</option> */}

        {specializations?.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
export function LocationDropdown({ locations }) {
  const [selectedState, setSelectedState] = useState('Any State')
  const [selectedCity, setSelectedCity] = useState('Any City')
  const [states, setStates] = useState(['Any State'])
  const [cities, setCities] = useState(['Any City'])
  const handleOnStateChange = (evt) => {
    setSelectedState(evt.target.value)
  }

  useEffect(() => {
    // Find the selected state object
    const selectedStateObj = locations.find((loc) => loc.state === selectedState)

    console.log('selected state: ', selectedStateObj)
    console.log('CITY:', ...selectedStateObj?.cities)
    // Update cities based on selected state
    if (selectedStateObj) {
      setCities(['Any City', ...selectedStateObj?.cities])
    }
  }, [selectedState])

  return (
    <div className='select-location-container'>
      <select
        name='selectList'
        id='selectList'
        placeholder='Select state'
        onChange={(evt) => setSelectedState(evt.target.value)}
        value={selectedState}>
        {locations?.map((c) => (
          <option value={c.state} key={c.state}>
            {c.state}
          </option>
        ))}
      </select>
      <select
        name='cityList'
        id='cityList'
        placeholder='Select city'
        value={selectedCity}
        onChange={(evt) => setSelectedCity(evt.target.value)}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  )
}
export function MaxPrice() {
  return (
    <div className='select-price-input'>
      <input
        name='selectPrice'
        placeholder='Type in a maximum monthly price'
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      />
    </div>
  )
}

export function CoachList({ coaches, setSelectedCoach, selectedCoach, viewCoachesOrSentRequests }) {
  const handleOnCoachClick = async (coach) => {
    try {
      const { data, error } = await apiClient.getCoachByID(coach.coachID)
      console.log('Selected coach: ', data)
      setSelectedCoach(data)
    } catch (error) {
      console.error('Failed to fetch coach details:', error)
    }
  }

  return (
    <List
      items={coaches}
      renderItem={(item, index) =>
        viewCoachesOrSentRequests === 'Sent Requests' ? (
          <ItemCard
            key={index}
            item={item.coach}
            isSelected={selectedCoach?.coachID === item?.coach?.coachID}
            handleClick={() => handleOnCoachClick(item.coach)}>
            <p>
              {item.coach.firstName} {item.coach.lastName}
            </p>
            {/* You can add more content specific to coaches here */}
          </ItemCard>
        ) : (
          <ItemCard
            key={index}
            item={item}
            isSelected={selectedCoach?.coachID === item.coachID}
            handleClick={() => handleOnCoachClick(item)}>
            <p>
              {item.firstName} {item.lastName}
            </p>
          </ItemCard>
        )
      }
      noAvailableItemsMessage='No coaches available.'
    />
  )
}
// export function CoachList({ coaches, setSelectedCoach, selectedCoach, viewCoachesOrSentRequests }) {
//   const [isLoading, setIsLoading] = useState(false)
//   useEffect(() => {}, [viewCoachesOrSentRequests])
//   return (
//     <div className='coach-list-container'>
//       {coaches?.length <= 0 ? (
//         <div>No Coaches Available!</div>
//       ) : (
//         coaches?.map((coach) => (
//           <CoachCard
//             coach={coach}
//             selectedCoach={selectedCoach}
//             setSelectedCoach={setSelectedCoach}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             // handleOnCoachClick={() => handleOnCoachClick(coach.CoachID)}
//           />
//         ))
//       )}
//     </div>
//   )
// }
// export function CoachCard({ coach, selectedCoach, setSelectedCoach, isLoading }) {
//   const handleOnCoachClick = async () => {
//     try {
//       const { data, error } = await apiClient.getCoachByID(coach.coachID)
//       console.log('Selected coach: ', data)
//       setSelectedCoach(data)
//     } catch (error) {
//       console.error('Failed to fetch coach details:', error)
//     }
//   }

//   return (
//     <>
//       {isLoading ? (
//         <div className='loading-indicator'>Loading...</div>
//       ) : (
//         <div
//           className={
//             coach.coachID === selectedCoach?.coachID
//               ? 'coach-card coach-card-selected'
//               : 'coach-card'
//           }
//           onClick={() => handleOnCoachClick()}>
//           <p>
//             {coach?.firstName} {coach.lastName}
//           </p>
//         </div>
//       )}
//     </>
//   )
// }