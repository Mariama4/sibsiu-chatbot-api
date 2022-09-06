import { exec } from 'child_process';

function startPythonFile() {
  exec(
    'source src/services/python_service/env/bin/activate && python3 src/services/python_service/main.py && deactivate',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}

export default startPythonFile;
