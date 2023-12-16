import React from 'react'
import { useState } from 'react'
import './CoachesOverview.css'
import apiClient from '../../../services/apiClient'
import { useEffect } from 'react'
import { Tabs } from '../../ExploreComponents/Tabs/Tabs'
import { List, ItemCard } from '../../ExploreComponents/ItemList/ItemList'
import { useAuthContext } from '../../../contexts/auth'
import Dropdown from '../../ExploreComponents/Dropdown/Dropdown'

export default function CoachesOverview({
  coaches,
  setCoaches,
  selectedCoach,
  setSelectedCoach,
  coachesToDisplay,
  setCoachesToDisplay,
  sentRequests,
  fetchSentRequests,
  setRequestStatusForSelectedCoach,
  specializations,
}) {
  // search/filter managemnet
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const handleSearch = async () => {
    try {
      const { data, error } = await apiClient.getAllCoachesBySearchTermAndFilters(
        searchTerm,
        selectedSpecialization,
        selectedMaxPrice,
        selectedState,
        selectedCity,
      )
      setCoachesToDisplay(data)
    } catch (error) {
      console.error('Error fetching coaches:', error)
    }
  }
  useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedSpecialization, selectedMaxPrice, selectedState, selectedCity])

  // location management
  const [locations, setLocations] = useState([{ state: 'Any State', cities: [] }])
  const fetchLocations = async () => {
    try {
      const { data, error } = await apiClient.getCoachLocations()
      setLocations(data)
    } catch (error) {
      setLocations([{ state: 'Any State', cities: [] }])
      throw new Error('Error fetching states and cities')
    }
  }
  useEffect(() => {
    fetchLocations()
  }, [])

  // tab management
  const [selectedTab, setSelectedTab] = useState('Coaches')
  const tabs = [
    {
      label: 'Coaches',
      handler: () => {
        if (selectedTab == 'Sent Requests') {
          setSelectedTab('Coaches')
          setCoachesToDisplay(coaches)
        }
      },
    },
    {
      label: 'Sent Requests',
      handler: () => {
        if (selectedTab == 'Coaches') {
          setSelectedTab('Sent Requests')
          setCoachesToDisplay(sentRequests)
        }
      },
    },
  ]

  return (
    <div className='coaches-overview'>
      <Tabs tabs={tabs} activeTab={selectedTab} />
      <SearchForCoachByName
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {/* conditionally render the filter options based on the selectedTab */}
      {selectedTab === 'Coaches' ? (
        <FilterForCoaches
          specializations={specializations}
          locations={locations}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      ) : (
        <></>
      )}
      <CoachList
        coaches={coachesToDisplay}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
        selectedTab={selectedTab}
        setRequestStatusForSelectedCoach={setRequestStatusForSelectedCoach}
      />
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

export function FilterForCoaches({
  specializations,
  locations,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedMaxPrice,
  setSelectedMaxPrice,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}) {
  const states = ['Any State', ...locations?.map((location) => location.state)]
  const [cities, setCities] = useState(['Any City'])

  useEffect(() => {
    const selectedStateObj = locations.find((loc) => loc.state === selectedState)
    if (selectedStateObj) {
      setCities(['Any City', ...selectedStateObj?.cities])
    }
  }, [selectedState])

  return (
    <div className='filter-container'>
      <div className='filter-label'>
        <span class='material-symbols-outlined'>filter_alt</span>
        <p>Filters</p>
      </div>
      <div className='filter-select-container'>
        <Dropdown
          options={specializations}
          value={selectedSpecialization}
          onChange={(evt) => {
            setSelectedSpecialization(
              evt.target.value === 'Any Specialization' ? '' : evt.target.value,
            )
          }}
        />
        <div className='select-location-container'>
          <Dropdown
            options={states}
            value={selectedState}
            onChange={(evt) => {
              setSelectedState(evt.target.value == 'Any State' ? '' : evt.target.value)
            }}
          />
          <Dropdown
            options={cities}
            value={selectedCity}
            onChange={(evt) => {
              setSelectedCity(evt.target.value === 'Any City' ? '' : evt.target.value)
            }}
          />
        </div>
        <div className='select-price-input'>
          <input
            name='selectPrice'
            placeholder='Type in a maximum monthly price'
            onChange={(evt) => {
              setSelectedMaxPrice(evt.target.value)
            }}
            value={selectedMaxPrice}
          />
        </div>{' '}
      </div>
    </div>
  )
}

export function CoachList({
  coaches,
  setSelectedCoach,
  selectedCoach,
  selectedTab,
  setRequestStatusForSelectedCoach,
}) {
  const { user } = useAuthContext()
  const handleOnCoachClick = async (coach) => {
    try {
      const { data, error } = await apiClient.getCoachByID(coach.coachID)
      setSelectedCoach(data)
      fetchRequestStatus(coach.coachID)
    } catch (error) {
      console.error('Failed to fetch coach details:', error)
    }
  }

  const fetchRequestStatus = async (coachID) => {
    const { data, error } = await apiClient.getRequestStatus({
      userID: user.id,
      coachID: coachID,
    })
    if (data) {
      if (data?.exists == true) {
        setRequestStatusForSelectedCoach(data)
      } else {
        setRequestStatusForSelectedCoach('')
      }
    }
    if (error) {
      setRequestStatusForSelectedCoach('')
    }
  }

  return (
    <List
      items={coaches}
      renderItem={(item, index) =>
        selectedTab === 'Sent Requests' ? (
          <ItemCard
            key={index}
            item={item.Coach}
            isSelected={selectedCoach?.coachID === item?.Coach?.coachID}
            handleClick={() => handleOnCoachClick(item.Coach)}>
            <p>
              {item.Coach.firstName} {item.Coach.lastName}
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
