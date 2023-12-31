import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import { useAuthContext } from '../../contexts/auth'

export default function Sidebar({ setSidebarIsOpen }) {
  const { logoutUser } = useAuthContext()
  const { user } = useAuthContext()

  /* Valid role options: 
      null   => initial survey is not completed, has Client access to links
      'Admin'  => access to only the Manage Coaches and Manage Exercises link
      'Coach'  => access to all links except Admin links 
      'Client' => access to all links except Admin links and My Clients link
  */
  const role = user?.role
  return (
    <div
      className='sidebar'
      onMouseOver={() => setSidebarIsOpen(true)}
      onMouseOut={() => setSidebarIsOpen(false)}>
      <div className='sidebar-icons'>
        <div className='top-sidebar'>
          <div className='sidebar-logo'>
            <Link to='/'>
              <div className='sidebar-icon sidebar-dashboard-btn'>
                <span className='material-symbols-outlined'>run_circle</span>
                <span className='icon-text'> FITFUSION </span>
              </div>
            </Link>
          </div>

          {role !== 'Admin' && (
            <>
              {/* make dashboard link redirect to survey page if the user has not filled it out yet */}
              <Link to={user?.role === null ? '/Register/Survey' : '/UserDashboard'}>
                <div className='sidebar-icon dashboard sidebar-dashboard-btn'>
                  <span className='material-symbols-outlined dashboard'>desktop_windows</span>
                  <span className='icon-text'> Dashboard </span>
                </div>
              </Link>
              <Link to='/ExploreCoaches'>
                <div className='sidebar-icon sidebar-explore coaches-btn'>
                  <span className='material-symbols-outlined'>explore</span>
                  <span className='icon-text'> EXPLORE COACHES</span>
                </div>
              </Link>

              <Link to='/MyCoach'>
                <div className='sidebar-icon sidebar-my-coach-btn'>
                  <span className='material-symbols-outlined'>group</span>
                  <span className='icon-text'> MY COACH </span>
                </div>
              </Link>
              <Link to='/Workouts'>
                <div className='sidebar-icon sidebar-my-workouts-btn'>
                  <span className='material-symbols-outlined'>exercise</span>
                  <span className='icon-text'> MY WORKOUTS </span>
                </div>
              </Link>
            </>
          )}

          {/* START Coach Specific Links */}
          {role === 'Coach' && (
            <Link to='/MyClients'>
              <div className='sidebar-icon sidebar-my-clients-btn'>
                <span class='material-symbols-outlined'>groups_3</span>{' '}
                <span className='icon-text'> MY CLIENTS </span>
              </div>
            </Link>
          )}
          {/* END Coach Specific Links */}

          {/* START Admin Specific Links */}
          {role === 'Admin' && (
            <>
              <Link to='/ManageCoaches'>
                <div className='sidebar-icon sidebar-manage-coaches-btn'>
                  <span class='material-symbols-outlined'>manage_accounts</span>{' '}
                  <span className='icon-text'> MANAGE COACHES </span>
                </div>
              </Link>
              <Link to='/ManageExercises'>
                <div className='sidebar-icon sidebar-manage-exercises-btn'>
                  <span class='material-symbols-outlined'>folder_managed</span>
                  <span className='icon-text'> MANAGE EXERCISES </span>
                </div>
              </Link>
            </>
          )}
          {/* END Admin Specific Links */}
        </div>

        <div className='bottom-sidebar'>
          <Link to='/Profile'>
            <div className='sidebar-icon sidebar-profile-btn'>
              <span className='material-symbols-outlined'>account_circle</span>
              <span className='icon-text'> PROFILE </span>
            </div>
          </Link>
          <Link to='/'>
            <div className='sidebar-icon sidebar-logout-btn' onClick={logoutUser}>
              <span className='material-symbols-outlined'>logout</span>
              <span className='icon-text'> LOG OUT </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
