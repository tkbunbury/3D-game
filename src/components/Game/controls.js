export let controls = {};

function easeOutQuad(x){
    return 1-(1-x)*(1-x);
}

window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "arrowup":
            controls["up"] = true;
            break;
        case "arrowdown":
            controls["down"] = true;
            break;
        case "arrowleft":
            controls["left"] = true;
            break;
        case "arrowright":
            controls["right"] = true;
            break;
        case "r":
            controls["r"] = true;
            break;
        case "shift":
            controls["shift"] = true;
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
        case "arrowup":
            controls["up"] = false;
            break;
        case "arrowdown":
            controls["down"] = false;
            break;
        case "arrowleft":
            controls["left"] = false;
            break;
        case "arrowright":
            controls["right"] = false;
            break;
        case "r":
            controls["r"] = false;
            break;
        case "shift":
            controls["shift"] = false;
            break;
        default:
            break;
    }
});

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.006;
export let turbo = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera) {

    if(Math.abs(planePosition.x) > 20 || Math.abs(planePosition.y) > 20 || Math.abs(planePosition.z) > 20){
        jawVelocity = 0;
        pitchVelocity = 0;
        turbo = 0;
        x.set( 1, 0, 0);
        y.set( 0, 1, 0);
        z.set( 0, 0, 1);
        planePosition.set( 0, 3, 7);
    }

    jawVelocity *= 0.90;
    pitchVelocity *= 0.90;

    if (Math.abs(jawVelocity) > maxVelocity) {
        jawVelocity = Math.sign(jawVelocity) * maxVelocity
    }

    if (Math.abs(pitchVelocity) > maxVelocity) {
        pitchVelocity = Math.sign(pitchVelocity) * maxVelocity
    }

    if (controls['left']) {
        jawVelocity += 0.015;
    }

    if (controls['right']) {
        jawVelocity -= 0.015;
    }

    if (controls['down']) {
        pitchVelocity += 0.005;
    }

    if (controls['up']) {
        pitchVelocity -= 0.005;
    }

    if (controls['r']){
        jawVelocity = 0;
        pitchVelocity = 0;
        turbo = 0;
        x.set( 1, 0, 0);
        y.set( 0, 1, 0);
        z.set( 0, 0, 1);
        planePosition.set( 0, 3, 7);
    }

x.applyAxisAngle(z, jawVelocity)
y.applyAxisAngle(z, jawVelocity)

y.applyAxisAngle(x, pitchVelocity)
z.applyAxisAngle(x, pitchVelocity)

x.normalize();
y.normalize();
z.normalize();

if (controls.shift){
    turbo += 0.025;
} else {
    turbo *= 0.95;
}
turbo = Math.min(Math.max(turbo, 0), 1);

let turboSpeed = easeOutQuad(turbo) * 0.02;

camera.fov = 45 + turboSpeed * 900;
camera.updateProjectionMatrix();

planePosition.add(z.clone().multiplyScalar(-planeSpeed -turboSpeed))


}