import ora from 'ora'
import cliSpinners from 'cli-spinners'

const loading = ora({
  text: 'Loading unicorns',
  spinner: cliSpinners.bouncingBar
}).start();

export default loading
