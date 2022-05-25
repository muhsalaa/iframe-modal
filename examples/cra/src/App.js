import showFrameModal from 'iframe-modal';

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <button
        onClick={() => showFrameModal('http://127.0.0.1:3000/display')}
        className="p-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg"
      >
        Show Iframe
      </button>
    </div>
  );
}

export default App;
