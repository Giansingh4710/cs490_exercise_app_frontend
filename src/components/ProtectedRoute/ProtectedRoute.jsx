import AccessForbidden from '../AccessForbidden/AccessForbidden'
import { useAuthContext } from '../../contexts/auth'

export default function ProtectedRoute({ element }) {
  const { user, isProcessing } = useAuthContext()
  // return <>{element}</>
  if (isProcessing) {
    return <h1>Is Processing</h1>
  }
  if (!user?.email) {
    return <AccessForbidden />
  }
  return <>{element}</>
}
