import { useState, FC, ReactNode, createContext, useContext } from 'react';

interface IAuthContext {
   isAuthed: boolean;
   login: (username: string, password: string) => boolean;
   logout: () => void;
};

interface IAuthProvider {
   children: ReactNode;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
   const [isAuthed, setIsAuthed] = useState<boolean>(() => {
      return Boolean(localStorage.getItem('token'));
    });
  
    const login = (username: string, password: string): boolean => {
      if (username === 'admin' && password === '12345') {
        localStorage.setItem('token', 'fake-jwt-token');
        setIsAuthed(true);
        return true;
      }
      return false;
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthed(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthed, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};

const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
     throw new Error('вне контекста :(');
   }
   return context;
};

export { AuthContext, useAuth };