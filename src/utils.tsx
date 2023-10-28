
export function isLate(item:any):boolean {
    const NOW = new Date()
    const itemDate = new Date(Date.parse(item.due))
    return NOW > itemDate
}

export function isSoon(item:any):boolean {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const soon:Date = new Date()
    soon.setDate(soon.getDate() + 2)

    const itemDate:Date = new Date(Date.parse(item.due))
    const dateDiff:number = (soon - itemDate)/_MS_PER_DAY

    return (dateDiff >= 0 && dateDiff < 2)
}

export function inAWeek(item:any):boolean {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const week:Date = new Date()
    week.setDate(week.getDate() + 7)

    const itemDate:Date = new Date(Date.parse(item.due))
    const dateDiff:number = parseInt((week - itemDate)/_MS_PER_DAY)

    return (dateDiff >= 0 && dateDiff <= 5)
}

export function isTomorrow(item:any):boolean {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const tomorrow:Date = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const itemDate:Date = new Date(Date.parse(item.due))
    const dateDiff:number = (itemDate - tomorrow)/_MS_PER_DAY

    return (dateDiff > -1 && dateDiff < 1 && itemDate.getDate() - tomorrow.getDate() === 0)
}

export function isToday(item:any):Boolean {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const today:Date = new Date()
    const itemDate:Date = new Date(Date.parse(item.due))

    const dateDiff:number = (itemDate - today)/_MS_PER_DAY

    return (dateDiff > 0 && dateDiff <= 1 && itemDate.getDate() - today.getDate() === 0)
}

export function count(items:any):object {
    return {
        all: items()?.length,
        closed: items()?.filter( (it:any) => it.status).length,
        open: items()?.filter( (it:any) => !it.status).length,
        late: items()?.filter( (it:any) => isLate(it) && !it.status ).length,
        soon: items()?.filter( (it:any) => isSoon(it) && !it.status ).length,
    }
}