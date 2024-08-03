"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["E"] = 1] = "E";
    Direction[Direction["S"] = 2] = "S";
    Direction[Direction["W"] = 3] = "W";
})(Direction || (Direction = {}));
var Compass;
(function (Compass) {
    Compass[Compass["P"] = 1] = "P";
    Compass[Compass["N"] = -1] = "N";
})(Compass || (Compass = {}));
class MaqeBot {
    constructor() {
        this.gps = {
            x: 0,
            y: 0,
            compass: Compass.P,
            direction: Direction.N
        };
    }
    resetGps() {
        this.gps = {
            x: 0,
            y: 0,
            compass: Compass.P,
            direction: Direction.N
        };
    }
    move(steps) {
        const axis = this.gps.direction === Direction.N || this.gps.direction === Direction.S ? 'y' : 'x';
        this.gps[axis] += (this.gps.compass * steps);
    }
    findSteps(input, startIndex) {
        let steps = '';
        for (let i = startIndex + 1; i < input.length; i++) {
            if (parseInt(input[i])) {
                steps += input[i];
            }
            else {
                break;
            }
        }
        return parseInt(steps);
    }
    turnRigth(turn) {
        const nextDirection = (this.gps.direction + 1) % 4;
        this.gps.direction = nextDirection;
        nextDirection == 2 || nextDirection == 3 ? this.gps.compass = Compass.N : this.gps.compass = Compass.P;
    }
    turnLeft(turn) {
        const nextDirection = (this.gps.direction + 3) % 4;
        this.gps.direction = nextDirection;
        nextDirection == 2 || nextDirection == 3 ? this.gps.compass = Compass.N : this.gps.compass = Compass.P;
    }
    check(input) {
        const commands = input.toUpperCase().split("");
        if (commands.length == 0)
            return { errorMessage: 'Empty input, Please check your input again' };
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command === "R") {
                this.turnRigth(command);
            }
            else if (command === "L") {
                this.turnLeft(command);
            }
            else if (command === "W") {
                const steps = this.findSteps(commands, i);
                this.move(steps);
                i += steps.toString().length;
            }
            else {
                return { errorMessage: 'Invalid input, Please check your input again' };
            }
        }
        return { X: this.gps.x, Y: this.gps.y, Direction: this.gps.direction };
    }
    execute(input) {
        const result = this.check(input);
        this.resetGps();
        return result;
    }
    start() {
        while (true) {
            const input = readline.question('Please enter command: ');
            console.log(this.execute(input));
        }
    }
}
const maqebot = new MaqeBot();
maqebot.start();
