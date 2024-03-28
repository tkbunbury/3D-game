// FUNCTION THAT COMPARES TWO ARRAYS - HOW WE WILL CHECK CORRECT GUESS      
    
function compareArrays(a, b) {
    return (a.length === b.length) &&  
    a.every((element, index) => element === b[index]);
    }

export default compareArrays