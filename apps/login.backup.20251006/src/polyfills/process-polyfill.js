// Polyfill for process object to support Node.js globals in browser environment
const process = {
  env: {
    NODE_ENV: 'development',
    ...window.ENV || {}
  },
  argv: [],
  platform: 'browser',
  version: '16.0.0',
  versions: {
    node: '16.0.0',
    v8: '9.0.0'
  },
  nextTick: (callback) => {
    Promise.resolve().then(callback);
  },
  stdout: {
    write: (data) => console.log(data)
  },
  stderr: {
    write: (data) => console.error(data)
  },
  exit: (code) => {
    console.warn(`Process exit called with code: ${code}`);
  },
  cwd: () => '/',
  chdir: () => {},
  umask: () => 0,
  uptime: () => Date.now() / 1000,
  hrtime: () => [Math.floor(Date.now() / 1000), (Date.now() % 1000) * 1000000],
  memoryUsage: () => ({
    rss: 0,
    heapTotal: 0,
    heapUsed: 0,
    external: 0
  }),
  on: () => {},
  once: () => {},
  off: () => {},
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => {},
  listenerCount: () => 0,
  listeners: () => [],
  binding: () => {},
  _events: {},
  _eventsCount: 0,
  _maxListeners: 10,
  domain: null,
  _exiting: false,
  config: {},
  dlopen: () => {},
  uptime: () => 0,
  _kill: () => {},
  _getActiveRequests: () => [],
  _getActiveHandles: () => [],
  reallyExit: () => {},
  abort: () => {},
  kill: () => {},
  pid: 1,
  ppid: 0,
  execPath: '/usr/bin/node',
  debugPort: 5858,
  _debugProcess: () => {},
  _debugPause: () => {},
  _debugEnd: () => {},
  mainModule: null,
  _startProfilerIdleNotifier: () => {},
  _stopProfilerIdleNotifier: () => {},
  allowedNodeEnvironmentFlags: new Set(),
  assert: () => {},
  features: {},
  // Critical: fatalException handler that libraries expect
  fatalException: (error) => {
    console.error('Fatal exception:', error);
    return false;
  },
  _fatalException: (error) => {
    console.error('Fatal exception:', error);
    return false;
  },
  setUncaughtExceptionCaptureCallback: () => {},
  hasUncaughtExceptionCaptureCallback: () => false,
  _rawDebug: () => {},
  moduleLoadList: [],
  binding: () => ({}),
  _linkedBinding: () => ({})
};

window.process = process;
if (typeof global !== 'undefined') {
  global.process = process;
}

export default process;
