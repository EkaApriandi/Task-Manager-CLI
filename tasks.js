const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const dbPath = path.join(__dirname, "tasks.json");

async function readTasks() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    console.error(chalk.red("Gagal membaca file tasks.json:", error.message));
    return [];
  }
}

async function writeTasks(tasks) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error(
      chalk.red("Gagal menulis ke file tasks.json:", error.message)
    );
  }
}

async function addTask(taskName) {
  const tasks = await readTasks();

  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  const newId = maxId + 1;

  const newTask = {
    id: newId,
    task: taskName,
    completed: false,
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  console.log(
    chalk.green(`\n[+] Tugas ditambahkan: (ID: ${newId}) "${taskName}"`)
  );
}

async function listTasks() {
  const tasks = await readTasks();

  if (tasks.length === 0) {
    console.log(chalk.yellow("\n✨ Daftar tugas kosong. Saatnya bersantai!"));
    return;
  }

  console.log(chalk.blue.bold("\n📝 Daftar Tugas Anda"));
  tasks.forEach((t) => {
    const idString = t.id.toString().padEnd(3, " ");

    if (t.completed) {
      const status = chalk.green("[x]");
      const text = chalk.gray.strikethrough(t.task);
      console.log(`${status} (ID: ${idString}) - ${text}`);
    } else {
      const status = "[ ]";
      const text = t.task;
      console.log(`${status} (ID: ${idString}) - ${text}`);
    }
  });
}

async function completeTask(taskId) {
  const tasks = await readTasks();
  const taskIdNum = parseInt(taskId, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskIdNum);

  if (taskIndex === -1) {
    console.error(
      chalk.red.bold(`\n❌ Error: Tugas dengan ID "${taskId}" tidak ditemukan.`)
    );
    return;
  }

  if (tasks[taskIndex].completed) {
    console.log(
      chalk.yellow(
        `\n👍 Tugas "${tasks[taskIndex].task}" memang sudah selesai.`
      )
    );
    return;
  }

  tasks[taskIndex].completed = true;
  await writeTasks(tasks);

  console.log(
    chalk.green.bold(
      `\n🎉 Selamat! Tugas "${tasks[taskIndex].task}" telah selesai.`
    )
  );
}

async function deleteTask(taskId) {
  const tasks = await readTasks();
  const taskIdNum = parseInt(taskId, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskIdNum);

  if (taskIndex === -1) {
    console.error(
      chalk.red.bold(`\n❌ Error: Tugas dengan ID "${taskId}" tidak ditemukan.`)
    );
    return;
  }

  const taskName = tasks[taskIndex].task;

  const updatedTasks = tasks.filter((t) => t.id !== taskIdNum);

  await writeTasks(updatedTasks);

  console.log(chalk.red(`\n [-] Tugas "${taskName}" telah dihapus.`));
}

module.exports = {
  addTask,
  listTasks,
  completeTask,
  deleteTask,
};
