const PageLoader = () => {
  return (
    <div className="absolute top-0 left-0">
      <div className="z-20 relative flex h-screen w-screen">
        <div className="flex flex-col flex-grow bg-black bg-opacity-30 text-white">
          <div className="mx-auto my-auto m-8">
            <div className="flex justify-center">
              <div className="w-4 h-4 mx-2 bg-sky-600 rounded-full transition-all animate-bounce-full"></div>
              <div className="w-4 h-4 mx-2 bg-sky-600 rounded-full transition-all animate-bounce-full [animation-delay:0.2s]"></div>
              <div className="w-4 h-4 mx-2 bg-sky-600 rounded-full transition-all animate-bounce-full [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
