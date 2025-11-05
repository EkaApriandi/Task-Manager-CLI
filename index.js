const { addTask, listTasks, completeTask, deleteTask } = require("./tasks.js");
const chalk = require("chalk");

const [, , command, ...args] = process.argv;

async function main() {
  switch (command) {
    case "add":
      const taskName = args.join(" ");
      if (!taskName) {
        console.error(
          chalk.red(
            "❌ Error: Nama tugas tidak boleh kosong. Contoh: node index.js add 'Belajar Node.js'"
          )
        );
        break;
      }
      await addTask(taskName);
      break;

    case "list":
      await listTasks();
      break;

    case "done":
      const completeId = args[0];
      if (!completeId) {
        console.error(
          chalk.red(
            "❌ Error: Masukkan ID tugas yang ingin diselesaikan. Contoh: node index.js done 1"
          )
        );
        break;
      }
      await completeTask(completeId);
      break;

    case "delete":
      const deleteId = args[0];
      if (!deleteId) {
        console.error(
          chalk.red(
            "❌ Error: Masukkan ID tugas yang ingin dihapus. Contoh: node index.js delete 1"
          )
        );
        break;
      }
      await deleteTask(deleteId);
      break;

    default:
      console.log(
        chalk.blue.bold(`
  Aplikasi Task Manager Sederhana 
`)
      );
      console.log(chalk.yellow(`  Perintah yang tersedia:`));
      console.log(`
    ${chalk.cyan("add")}    <nama tugas>    - Menambahkan tugas baru
                            (Gunakan tanda kutip jika > 1 kata)
                            ${chalk.gray(
                              'Contoh: node index.js add "Bersihkan Kos"'
                            )}
    
    ${chalk.cyan("list")}                    - Menampilkan semua tugas
                            ${chalk.gray("Contoh: node index.js list")}
    
    ${chalk.cyan("done")}    <id tugas>      - Menandai tugas sebagai selesai
                            ${chalk.gray("Contoh: node index.js done 1")}
    
    ${chalk.cyan("delete")}  <id tugas>      - Menghapus tugas
                            ${chalk.gray("Contoh: node index.js delete 1")}
  `);
  }
}

main();
