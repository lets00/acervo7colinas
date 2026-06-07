import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/auth";

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();

  // Task 1 - Se não existir token, redirecionar para /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.tipo) {
    return <Navigate to="/login" replace />;
  }

  // Verificar se o tipo de usuário está na lista de roles permitidas (Task 3)
  if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(payload.tipo)) {
          // Se o usuário está logado mas não tem permissão, volta pro dashboard
          return <Navigate to="/" replace />;
      }
  }

  return children;
};

export default ProtectedRoute;
