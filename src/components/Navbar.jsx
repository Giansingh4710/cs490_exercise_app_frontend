import Button from './LandingPageButton.js'
import Logo from './Logo.js'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const page = props.page
  if (page === 'register') {
    return <RegistrationNav />
  }
  if (page === 'survey') {
    return <SurveyNav />
  }
  if (page === 'landing') {
    return <LandingNav />
  }
  if (page === 'login' || page === 'userDashboard') {
    return <LoginNav />
  }
}

function RegistrationNav() {
  const styles = {
    navbar: {
      backgroundColor: '#3F4D67',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    spacer: {
      flexGrow: '1',
    },
    button: {
      width: '166px',
      height: '61px',
      float: 'right',
      marginRight: '10px',
      position: 'relative',
    },
  }
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <Logo size='50' />
      </div>
      <div style={styles.spacer}></div>
      <Link to='/Login'>
        <Button name='LOGIN' additionalStyles={styles.button} />
      </Link>
    </div>
  )
}

function SurveyNav() {
  const styles = {
    navbar: {
      backgroundColor: '#3F4D67',
      padding: '5px',
    },
    logo: {
      width: 'fit-content',
      height: 'fit-content',
      marginTop: '18px',
    },
    title: {
      height: 'fit-content',
      width: 'fit-content',
      color: '#FFFFFF',
      fontSize: '20pt',
      padding: '0px',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '100px 500px',
    },
  }

  return (
    <div style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Logo size='50' />
        </div>
        <h3 style={styles.title}>SET UP PROFILE</h3>
      </div>
    </div>
  )
}

function LandingNav() {
  let buttonSizeStyle = {
    width: '166px',
    height: '61px',
    marginRight: '10px',
  }

  const styles = {
    navbar: {
      backgroundColor: '#3F4D67',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    spacer: {
      flexGrow: '1',
    },
  }
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <Logo size='50' />
      </div>
      <div style={styles.spacer}></div>
      <div style={styles.navbarButtonsContainer}>
        <Link to='/Login'>
          <Button name='LOGIN' additionalStyles={buttonSizeStyle} />
        </Link>
        <Link to='/Register'>
          <Button name='REGISTER' additionalStyles={buttonSizeStyle} />
        </Link>
      </div>
    </div>
  )
}

function LoginNav() {
  const styles = {
    navbar: {
      backgroundColor: '#3F4D67',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    spacer: {
      flexGrow: '1',
    },
  }

  let additionalStyles = {
    width: '166px',
    height: '61px',
    float: 'right',
    marginRight: '10px',
    position: 'relative',
  }
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <Logo size='50' />
      </div>
      <div style={styles.spacer}></div>
      <Link to='/Register'>
        <Button name='REGISTER' additionalStyles={additionalStyles} />
      </Link>
    </div>
  )
}