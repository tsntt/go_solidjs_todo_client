const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function isLate(datestr:string):boolean {
    const NOW = new Date()
    const itemDate = new Date(Date.parse(datestr))
    return NOW > itemDate
}

export function isSoon(datestr:string):boolean {
    const soon:Date = new Date()
    soon.setDate(soon.getDate() + 2)

    const itemDate:Date = new Date(Date.parse(datestr))
    const dateDiff:number = (soon - itemDate)/_MS_PER_DAY

    return (dateDiff >= 0 && dateDiff < 2)
}

export function inAWeek(datestr:string):boolean {
    const week:Date = new Date()
    week.setDate(week.getDate() + 7)

    const itemDate:Date = new Date(Date.parse(datestr))
    const dateDiff:number = parseInt((week - itemDate)/_MS_PER_DAY)

    return (dateDiff >= 0 && dateDiff <= 5)
}

export function isTomorrow(datestr:string):boolean {
    const tomorrow:Date = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const itemDate:Date = new Date(Date.parse(datestr))
    const dateDiff:number = (itemDate - tomorrow)/_MS_PER_DAY

    return (dateDiff > -1 && dateDiff < 1 && itemDate.getDate() - tomorrow.getDate() === 0)
}

export function isToday(datestr:string):Boolean {
    const today:Date = new Date()
    const itemDate:Date = new Date(Date.parse(datestr))
    const dateDiff:number = (itemDate - today)/_MS_PER_DAY

    return (dateDiff > 0 && dateDiff <= 1 && itemDate.getDate() - today.getDate() === 0)
}