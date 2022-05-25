function Display() {
  return (
    <div className="h-screen w-screen flex justify-center items-start bg-black bg-opacity-75">
      <button
        onClick={() => window.parent.postMessage('hide', '*')}
        className="p-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg mt-20"
      >
        Hide Iframe
      </button>
    </div>
  );
}

export default Display;
