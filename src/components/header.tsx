function formatedDateString() {
    const date = new Date();
    return `${date.toLocaleDateString('en', { weekday: 'long' })}, ${date.getDate()} ${date.toLocaleDateString('en', { month: 'long' })}`;
}

export function Header(props:any) {
    const { visibility } = props

    return (
        <header class="flex content-center items-center p-4">
          <div class="grow">
            <h1 class="text-5xl mb-2 font-bold text-gray-900 antialiased">Today's Tasks</h1>
            <span class="text-xl text-gray-500 pl-1 antialiased">{formatedDateString()}</span>
          </div>
          <div>
            <button onClick={() => {visibility(true)}} class="py-4 px-8 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl text-xl text-blue-700 font-semibold antialiased leading-6 transition-colors ease-in-out"> 
              New task
            </button>
          </div>
        </header>
    )
}