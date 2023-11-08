import Navbar from "../components/login/navbar";
import WaterInputModal from "../components/userDashboard/waterInput";
import MealInputModal from "../components/userDashboard/mealInput";
import Logo from "../components/Logo";

function UserDashboard() {
    return (
      <div style={styles.container}>
          <Navbar />
          <div style={styles.logoContainer}>
              <Logo />
          </div>
          <WaterInputModal />
          <MealInputModal />
      </div>
    )
  }

const styles = {
    container: {
      textAlign: 'center',
      backgroundColor: "#ABABAB",
      height: "975px",
    },
    logoContainer: {
      margin: "auto",
      width: "fit-content",
      paddingTop: "10%",
    }
}
export default UserDashboard;