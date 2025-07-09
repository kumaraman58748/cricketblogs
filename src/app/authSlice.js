import { createSlice } from '@reduxjs/toolkit'
import storage from './storage'
import { act } from 'react'

const initialState = storage.get('auth', {
    status: false,
    userData: null,
    isVerified: false,
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            state.isVerified=action.payload.emailVerification
            storage.set('auth', {
                status: true,
                userData: action.payload,
                isVerified: action.payload.emailVerification
            })
        },
        logout: (state) => {
            state.status = false
            state.userData = null
            state.isVerified = false
            storage.remove('auth')
        },
        updateemailVerification: (state, action) => {
            state.status = true
            state.userData = action.payload
            state.isVerified=action.payload.emailVerification
            storage.set('auth', {
                status: true,
                userData: action.payload,
                isVerified: action.payload.emailVerification
            })
        }
    }
})

export const { login, logout,updateemailVerification } = authSlice.actions
export default authSlice.reducer