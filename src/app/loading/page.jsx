export default function Loading() {
  return (
    <div className='w-screen h-screen'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='pl'>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='pl__dot'></div>
          <div className='flex-col text-center'>
            <h1 className='pl__text'>LOADING…</h1>
            <h1 className='pl__text'>100%</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
