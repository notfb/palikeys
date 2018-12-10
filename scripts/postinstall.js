if (/^darwin/.test(process.platform)) {
  const exec = require('child_process').exec;
  exec('npm install wallaby-webpack fsevents electron --no-save').stderr.pipe(process.stderr);
}
