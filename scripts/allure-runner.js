const { spawn } = require('node:child_process')
const { existsSync } = require('node:fs')
const path = require('node:path')

const args = process.argv.slice(2)

if (!args.length) {
  console.error('Usage: node scripts/allure-runner.js <allure-command> [args...]')
  process.exit(1)
}

const isWindows = process.platform === 'win32'
const allureDistDir = path.join(__dirname, '..', 'node_modules', 'allure-commandline', 'dist')
const allureExecutable = isWindows
  ? path.join(allureDistDir, 'bin', 'allure.bat')
  : path.join(allureDistDir, 'bin', 'allure')

const runCommand = () => {
  if (existsSync(allureExecutable)) {
    return spawn(allureExecutable, args, {
      stdio: 'inherit',
      shell: isWindows
    })
  }

  const classPathSeparator = isWindows ? ';' : ':'
  const allureClassPath = [
    path.join(allureDistDir, 'lib', '*'),
    path.join(allureDistDir, 'lib', 'config')
  ].join(classPathSeparator)

  return spawn('java', [
    '-classpath',
    allureClassPath,
    'io.qameta.allure.CommandLine',
    ...args
  ], {
    stdio: 'inherit',
    shell: false
  })
}

const child = runCommand()

child.on('exit', (code) => {
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  console.error(`Failed to start Allure: ${error.message}`)
  process.exit(1)
})
