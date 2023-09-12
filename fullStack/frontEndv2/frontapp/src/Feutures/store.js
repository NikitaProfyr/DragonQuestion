import { configureStore } from '@reduxjs/toolkit'

export const srote = configureStore({
    reducer: {
        user: 'test',
    },
    devTools: true,
})