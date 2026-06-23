import { createContext, useEffect, useContext, useState, useRef } from "react";


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [logged, setLogged] = useState(null)
  const [isReady, setIsReady] = useState(false)

  // false si l'initialisation n'a pas encore eu lieu
  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    // Ajustement premier rendu uniquement
    setUserToken(localStorage.getItem("token"))
    setUserId(localStorage.getItem("userId"))
    setLogged(localStorage.getItem("token") != null)
    setIsReady(true)
  }, [])

  useEffect(()=>{
    if (!didInit.current) return
    if(userToken == null)
      localStorage.removeItem("token");
    else
      localStorage.setItem("token", userToken);
  }, [userToken])

  useEffect(()=>{
    if (!didInit.current) return
    if(userToken == null)
      localStorage.removeItem("userId");
    else
      localStorage.setItem("userId", userId);
  }, [userId])

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, userId, setUserId, logged, setLogged, isReady}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}