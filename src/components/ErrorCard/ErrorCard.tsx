function onClick() {
  window.location.reload();
}

function ErrorCard() {
  return (
    <div className="inline-flex h-full w-full items-center justify-center">
      <div>
        <p>Something went wrong.....</p>
        <button
          type="button"
          onClick={onClick}
          className="mb-16 rounded border border-solid border-gray-800 bg-gray-800 px-9 py-2 text-white"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

export default ErrorCard;
