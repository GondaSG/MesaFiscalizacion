
export const compareDateToDate = (dateString: string) =>{
    const today = new Date();
    const inputDate = new Date(dateString);
    console.log(today)
    console.log(inputDate)
    return inputDate < today;
}
