


export const sleep = (seconds: number = 1) => {

    return new Promise(res => {
        setTimeout(() => {
            res(true)
        }, seconds * 1000)
    })
}