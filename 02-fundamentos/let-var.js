/* let nombre = 'Wolverine';

if (true) {
    let nombre = 'Magneto';
}


nombre = 'Wolverine2';
nombre = 'Wolverine3';
nombre = 'Wolverine4';

console.log(nombre); */

let i = 0; // different scope

for (let i = 0; i <= 5; i++) {
    console.log(`i = ${i}`);
}

console.log(i);