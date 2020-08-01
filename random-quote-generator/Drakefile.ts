import { desc, task, sh, run } from 'https://deno.land/x/drake@v1.2.5/mod.ts'

desc('Run API')
task('start', [], async function () {
  await sh(
    'deno run --allow-env --allow-net --allow-read api/mod.ts --port=${PORT}'
  )
})

desc('Run API via denon for development')
task('denon', [], async function () {
  await sh(
    'deno run --allow-env --allow-net --allow-read api/mod.ts --port=${PORT}'
  )
})

desc('Cache and lock dependencies')
task('cache', [], async function () {
  await sh('deno cache --lock=lock.json --lock-write api/deps.ts')
})

run()
