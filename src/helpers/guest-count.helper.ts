export const adultsInNumber = (number: any) => {
  return number.adults;
};

export const allAdults = (numbers: any) => {
  return numbers.reduce((sum: number, number: any) => {
    return (sum += number.adults);
  }, 0);
};

export const allChilds = (numbers: any) => {
  return numbers.reduce((sum: number, number: any) => {
    return (sum += number.childs);
  }, 0);
};

export const allGuest = (numbers: any) => {
  return allAdults(numbers) + allChilds(numbers);
};
