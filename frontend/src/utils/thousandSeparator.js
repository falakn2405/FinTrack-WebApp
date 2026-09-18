export const addThounandSeparator = (num) => {
    if(num == null || isNaN(num)) return '';

    const numString = num.toString();
    const parts = numString.split('.'); // Split the num into integar & fractional part

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // It handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if(otherNumbers !== '') {
        // Apply comma after every two digits for the 'otherNumbers' part
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!d))/g, ',');
        integerPart = formattedOtherNumbers + ',' + lastThree;
    } else {
        integerPart = lastThree;
    }

    // Combine integer and fractional parts
    return fractionalPart ? '${integerPart}.${fractionalPart}' : integerPart;
};