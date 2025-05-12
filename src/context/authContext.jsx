import React, {createContext, useState, useEffect} from "react";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null)
    const [token,setToken] = useState(null)
    // console.log(auth)

    useEffect(() => {
        const userDetail = localStorage.getItem("userInfo");
        // console.log("userDetail:", userDetail);
        if (userDetail) {
            const authentication = JSON.parse(userDetail);
            // console.log("Parsed userDetail:", authentication);
            setAuth(authentication.authType);
            setToken(authentication.token);
        }
    }, []);
    
  
    const login = (authType) =>{
        const userInfo = {authtype: authType}
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        setAuth(authType)
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        setAuth(null);
        
    };

    return(
        <AuthContext.Provider value={{ auth,setAuth,login,logout,token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;