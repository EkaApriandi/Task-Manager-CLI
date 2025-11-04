//Eka Apriandi
//D121231016
const { addTask, listTasks, completeTask, deleteTask } = require('./tasks.js');

const [,, command, ...args] = process.argv;

async function main() {
    switch (command) {
        case 'add':
            const taskName = args.join(' '); 
            if (!taskName) {
                console.error("❌ Error: Nama tugas tidak boleh kosong. Contoh: node index.js add 'Belajar Node.js'");
                break;
            }
            await addTask(taskName);
            break;

        case 'list':
            await listTasks();
            break;

        case 'done':
            const completeId = args[0];
            if (!completeId) {
                console.error("❌ Error: Masukkan ID tugas yang ingin diselesaikan. Contoh: node index.js done 12345");
                break;
            }
            await completeTask(completeId);
            break;

        case 'delete':
            const deleteId = args[0];
            if (!deleteId) {
                console.error("❌ Error: Masukkan ID tugas yang ingin dihapus. Contoh: node index.js delete 12345");
                break;
            }
            await deleteTask(deleteId);
            break;

        default:
            console.log(`
    Aplikasi Task Manager Sederhana 
    
    Perintah yang tersedia:
      
      add     <nama tugas>    - Menambahkan tugas baru
                                (Gunakan tanda kutip jika > 1 kata)
                                Contoh: node index.js add "Bersihkan Kos"
      
      list                    - Menampilkan semua tugas
                                Contoh: node index.js list
      
      done    <id tugas>      - Menandai tugas sebagai selesai
                                Contoh: node index.js done 1
      
      delete  <id tugas>      - Menghapus tugas
                                Contoh: node index.js delete 1
    `);
    }
}

main();