import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include'
      })

      if (response.ok) {
        const user = await response.json()
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const user = await response.json()
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error: error.message }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      // Call server logout endpoint to clear server-side session
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear client-side state regardless of server response
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      dispatch({ type: 'LOGOUT' })
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
