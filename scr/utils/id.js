const newId = generateFakeId();
console.log(newId); // nuevo UUID v4

export const generateFakeId = () => {
    return uuidv4();
}