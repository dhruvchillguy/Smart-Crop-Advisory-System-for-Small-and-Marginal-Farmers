const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Data storage path helper
function getDataFilePath() {
  return path.join(app.getPath('userData'), 'smart-crop-data.json');
}

// Read stored data
function readData() {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading data file:', err);
  }
  return { profile: null, savedRecommendations: [] };
}

// Write stored data
function writeData(data) {
  try {
    const filePath = getDataFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Smart Crop Advisory System',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const distPath = path.join(__dirname, '..', 'dist', 'index.html');
  const isDevMode = !app.isPackaged && (process.env.NODE_ENV === 'development' || Boolean(process.env.VITE_DEV_SERVER_URL));

  if (isDevMode) {
    const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    // In packaged or production mode, load the bundled HTML directly
    mainWindow.loadFile(distPath);
  }

  mainWindow.setMenuBarVisibility(false);
}

// IPC Handlers for persistent data

ipcMain.handle('data:getProfile', () => {
  const data = readData();
  return data.profile || null;
});

ipcMain.handle('data:saveProfile', (event, profile) => {
  if (!profile || typeof profile !== 'object') {
    return { success: false, error: 'Invalid profile data' };
  }
  const data = readData();
  data.profile = profile;
  const ok = writeData(data);
  return { success: ok };
});

ipcMain.handle('data:getSavedRecommendations', () => {
  const data = readData();
  return data.savedRecommendations || [];
});

ipcMain.handle('data:saveRecommendation', (event, recommendation) => {
  if (!recommendation || typeof recommendation !== 'object') {
    return { success: false, error: 'Invalid recommendation data' };
  }
  const data = readData();
  if (!Array.isArray(data.savedRecommendations)) {
    data.savedRecommendations = [];
  }
  recommendation.id = Date.now().toString();
  recommendation.savedAt = new Date().toISOString();
  data.savedRecommendations.push(recommendation);
  const ok = writeData(data);
  return { success: ok, id: recommendation.id };
});

ipcMain.handle('data:deleteRecommendation', (event, id) => {
  if (!id || typeof id !== 'string') {
    return { success: false, error: 'Invalid recommendation ID' };
  }
  const data = readData();
  if (!Array.isArray(data.savedRecommendations)) {
    return { success: false, error: 'No recommendations found' };
  }
  data.savedRecommendations = data.savedRecommendations.filter(r => r.id !== id);
  const ok = writeData(data);
  return { success: ok };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
