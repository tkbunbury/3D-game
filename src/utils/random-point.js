import { Vector3 } from "three"

function randomPoint(scale){
    return new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
        ).multiply(scale || new Vector3(1, 1, 1));
}

export default randomPoint