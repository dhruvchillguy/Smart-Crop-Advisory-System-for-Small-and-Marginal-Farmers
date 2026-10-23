const { contextBridge, ipcRenderer } = require('electron');

// Expose a narrowly scoped API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Profile operations
  getProfile: () => ipcRenderer.invoke('data:getProfile'),
  saveProfile: (profile) => ipcRenderer.invoke('data:saveProfile', profile),

  // Saved recommendations operations
  getSavedRecommendations: () => ipcRenderer.invoke('data:getSavedRecommendations'),
  saveRecommendation: (rec) => ipcRenderer.invoke('data:saveRecommendation', rec),
  deleteRecommendation: (id) => ipcRenderer.invoke('data:deleteRecommendation', id),

  // Platform detection
  isElectron: true,
});
