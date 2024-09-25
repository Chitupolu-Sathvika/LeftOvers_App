export const generateOTP = (): string => {
   return (Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000).toString();
};
