import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false, // Sidebar is hidden by default
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen // Toggle sidebar state
    },
    closeSidebar: (state) => {
      state.isOpen = false // Close sidebar
    },
  },
})

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
