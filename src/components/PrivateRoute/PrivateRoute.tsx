import { Navigate } from 'react-router-dom'

import { PrivateRouteProps } from '../../types/type'

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, auth }) => {
  return auth ? element : <Navigate to="/sign-in" />
}

export default PrivateRoute
