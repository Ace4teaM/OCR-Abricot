import { createContext, useEffect, useContext, useState, useRef } from "react";


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // false si l'initialisation n'a pas encore eu lieu
  const didInit = useRef(false)

   async function fetchData() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_USER_API_URL}/auth/profile`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        console.log("response.status", response.status);

        if (
            response.ok &&
            response.headers.get("content-type")?.includes("application/json")
        ) {
            const data = await response.json();
            console.log("get user data");
            setUserData(data.data.user);
        } else {
            console.log("no user data");
            setUserData(null);
        }

    } catch (err) {
        console.log("get user data ERROR", err);
        setUserData(null);
    }
  }

  useEffect(() => {
    console.log("AuthProvider monté");
    if (didInit.current) return
    didInit.current = true

    // obtient les infos sur l'user en cours
    fetchData();
    
    setIsReady(true);

    return () => console.log("AuthProvider démonté");
  }, [])

  useEffect(()=>{
    if (!didInit.current) return
    
    if(userData instanceof Object)
    {
      console.log("userData",userData)

      Object.defineProperty(userData, "firstname", {
          get() {
              return this.name?.split(" ", 2)[0] ?? "";
          },
          enumerable: true
      });

      Object.defineProperty(userData, "lastname", {
          get() {
              return this.name?.split(" ", 2)[1] ?? "";
          },
          enumerable: true
      });

      setIsLogged(true)
    }
    else
    {
      setIsLogged(false)
    }
  }, [userData])


  return (
    <AuthContext.Provider value={{ userData, setUserData, isLogged, isReady}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}