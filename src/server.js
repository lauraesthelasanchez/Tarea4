import app from './app.js';
import { initModel } from './config/database/associations.js';
import { auth, sync } from './config/database/database.js';
import { envs } from './config/environments/environments.js';

async function main() {
  try {
    await auth();
    initModel();
    await sync();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on PORT #${envs.PORT}`);
});
