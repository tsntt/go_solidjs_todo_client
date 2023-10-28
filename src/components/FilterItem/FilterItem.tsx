export function FilterItem(props: any) {
    return (
        <a onClick={() => {props.setFilter(props.category)}} class={'first:pr-2 first:ml-0 px-2 border-r-2 first:border-l-0 border-l-2 last:border-r-0 font-semibold antialiased' + (props.selected ? 'border-l-gray-300 border-r-gray-300 text-blue-600' : 'group border-transparent text-gray-400 hover:text-gray-600 transition-colors ease-in-out')}>
            {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
            <span class={'ml-2 text-white font-semibold rounded-full px-2 leading-normal ' + (props.selected ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-gray-400 transition-colors ease-in-out')}>
                {props.filtersCount()[props.category]}
            </span>
        </a>
    )
}