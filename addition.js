function addition(a,b) {
    console.log(`Sum: ${a+b}`);
}

// addition(5,7)

//exporting a function use an object to call that object 
// in the rest of your project
module.exports={
    addition
    //mention all the functions you wanna export in 
    //your object
}