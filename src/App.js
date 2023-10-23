import Baseball from "./Baseball.js";
import Computer from "./Computer.js";
import User from "./User.js";
import { MESSAGE, INPUT } from "./constant/MESSAGE.js";
import ERROR from "./constant/ERROR.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.computer = new Computer();
    this.user = new User(this.consoleUtils);
    this.game = new Baseball(this.computer, this.user, this.consoleUtils);
    this.isAppRunning = true;
  }

  async play() {
    this.startApp();
    while (this.isAppRunning) {
      const shouldContinue = await this.replayGame();
      if (!shouldContinue) this.isAppRunning = false;
    }
  }

  startApp() {
    Console.print(MESSAGE.START_GAME);
  }

  async replayGame() {
    const isGameFinished = !(await this.game.play());

    if (isGameFinished) {
      return this.askGameRestartOrExit();
    }
  }

  async askGameRestartOrExit() {
    const answer = await Console.readLineAsync(MESSAGE.ASK_GAME_RESTART);

    if (answer === INPUT.FINISH_APP) return false;
    if (answer === INPUT.RESTART_GAME) return true;

    throw new Error(ERROR.VALID_RESTART_INPUT);
  }
}

export default App;
