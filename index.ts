import * as readline from "readline-sync";

interface Gps {
    x: number;
    y: number;
    compass: Compass;
    direction: Direction;
}

enum Direction {
    N = 0,
    E = 1,
    S = 2,
    W = 3
}

enum Compass {
    P = 1,
    N = -1
}

class MaqeBot {
    private gps: Gps;

    constructor() {
        this.gps = {
            x: 0,
            y: 0,
            compass: Compass.P,
            direction: Direction.N
        };
    }

    private resetGps() {
        this.gps = {
            x: 0,
            y: 0,
            compass: Compass.P,
            direction: Direction.N
        };
    }

    private move(steps: number) {
        const axis = this.gps.direction === Direction.N || this.gps.direction === Direction.S ? 'y' : 'x';
        this.gps[axis] += (this.gps.compass * steps);
    }

    private findSteps(input: string[], startIndex: number): number {
        let steps = '';
        for (let i = startIndex + 1; i < input.length; i++) {
            console.log(parseInt('w'))
            if (parseInt(input[i])) {
                steps += input[i];
            } else {
                break;
            }
        }
        return parseInt(steps);
    }

    private turnRigth(turn: string) {
        const nextDirection = (this.gps.direction + 1) % 4
        this.gps.direction = nextDirection
        nextDirection == 2 || nextDirection == 3 ? this.gps.compass = Compass.N : this.gps.compass = Compass.P
    }

    private turnLeft(turn: string) {
        const nextDirection = (this.gps.direction + 3) % 4
        this.gps.direction = nextDirection
        nextDirection == 2 || nextDirection == 3 ? this.gps.compass = Compass.N : this.gps.compass = Compass.P
    }

    private check(input: string) {
        const commands = input.toUpperCase().split("");
        if (commands.length == 0) return { errorMessage: 'Empty input, Please check your input again' }
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command === "R") {
                this.turnRigth(command);
            } else if (command === "L") {
                this.turnLeft(command)
            }
            else if (command === "W") {
                const steps = this.findSteps(commands, i);
                this.move(steps);
                i += steps.toString().length;
            } else {
                return { errorMessage: 'Invalid input, Please check your input again' }
            }
        }
        return { X: this.gps.x, Y: this.gps.y, Direction: this.gps.direction };
    }

    public execute(input: string) {
        const result = this.check(input);
        this.resetGps();
        return result

    }

    public start() {
        while (true) {
            const input = readline.question('Please enter command: ');
            console.log(this.execute(input))

        }
    }
}

const maqebot = new MaqeBot();
maqebot.start();
